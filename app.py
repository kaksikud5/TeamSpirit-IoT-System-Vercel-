import json
import math
import os
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from flask import Flask, jsonify, render_template, request

app = Flask(__name__, template_folder="templates", static_folder=None)

# -----------------------------
# Runtime config
# -----------------------------
THINGSPEAK_CHANNEL_ID = os.getenv("THINGSPEAK_CHANNEL_ID", "")
THINGSPEAK_WRITE_KEY = os.getenv("THINGSPEAK_WRITE_KEY", "")
THINGSPEAK_READ_KEY = os.getenv("THINGSPEAK_READ_KEY", "")
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY", "")
DASHSCOPE_BASE_URL = os.getenv(
    "DASHSCOPE_BASE_URL",
    "https://dashscope.aliyuncs.com/compatible-mode/v1"
)
DASHSCOPE_MODEL = os.getenv("DASHSCOPE_MODEL", "qwen3-max")

SYSTEM_PROMPTS = {
    "zh": "你是水质小帮手，请回答问题。帮助用户解释水质指标、建议等。请根据用户所提问的语言来选择回答的语言。",
    "en": "You are a water quality assistant. Please answer questions and help users explain water quality indicators and suggestions. Use English for the final response when the user uses English."
}

THINGSPEAK_FIELDS = {
    "inflow_light": 1,
    "conductivity": 2,
    "ph": 3,
    "waterlevel": 4,
    "turbidity": 5,
    "inflow_heavy": 6,
}

# 运行时覆盖（仅当前进程有效）
runtime_overrides = {
    "thingspeak_channel_id": None,
    "thingspeak_read_key": None,
    "ai_api_key": None,
}


# -----------------------------
# Helpers
# -----------------------------
def safe_float(v):
    if v is None:
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def to_ms_cm(conductivity):
    if conductivity is None:
        return None
    return conductivity / 1000 if conductivity > 10 else conductivity


def current_thingspeak_channel_id():
    return runtime_overrides["thingspeak_channel_id"] or THINGSPEAK_CHANNEL_ID


def current_thingspeak_read_key():
    return runtime_overrides["thingspeak_read_key"] or THINGSPEAK_READ_KEY


def current_ai_api_key():
    return runtime_overrides["ai_api_key"] or DASHSCOPE_API_KEY


def mask_key(value: str):
    if not value:
        return ""
    if len(value) <= 8:
        return "*" * len(value)
    return value[:4] + "*" * (len(value) - 8) + value[-4:]


def classify_quality(ph, conductivity, turbidity, lang="zh"):
    if any(x is None for x in [ph, conductivity, turbidity]):
        if lang == "en":
            return {
                "grade": "Unknown",
                "color": "#9ca3af",
                "score": 0,
                "reason": "Incomplete parameters",
                "usage": "Unknown",
                "usage_detail": "More data is required for usage recommendation",
                "score_formula": "Score = Conductivity(40%) + pH(35%) + Turbidity(25%)",
                "score_breakdown": {}
            }
        return {
            "grade": "未知",
            "color": "#9ca3af",
            "score": 0,
            "reason": "参数不完整，无法分类",
            "usage": "未知",
            "usage_detail": "需要更多数据后才能给出用途建议",
            "score_formula": "评分 = 电导率(40%) + pH(35%) + 浊度(25%)",
            "score_breakdown": {}
        }

    weights = {"conductivity": 40, "ph": 35, "turbidity": 25}
    metric_scores = {"conductivity": 100, "ph": 100, "turbidity": 100}
    conductivity_ms = to_ms_cm(conductivity)

    metric_rules_zh = {
        "conductivity": "≤0.5(ms/cm)，绿色分值100；0.5-1.0(ms/cm)，黄色分值60；>1.0(ms/cm)，红色分值30",
        "ph": "6.0-9.0，基础分100",
        "turbidity": "≤1，绿色分值100；1-5，黄色分值60；>5，红色分值30",
    }
    metric_rules_en = {
        "conductivity": "≤0.5(ms/cm) green score 100; 0.5-1.0(ms/cm) yellow score 60; >1.0(ms/cm) red score 30",
        "ph": "6.0-9.0 base score 100",
        "turbidity": "≤1 green score 100; 1-5 yellow score 60; >5 red score 30",
    }

    reasons_zh, reasons_en = [], []

    if 6.0 <= ph <= 9.0:
        pass
    elif 5.5 <= ph < 6.0 or 9.0 < ph <= 9.5:
        metric_scores["ph"] = 60
        metric_rules_zh["ph"] = "5.5-6.0 或 9.0-9.5，黄色分值60"
        metric_rules_en["ph"] = "5.5-6.0 or 9.0-9.5, yellow score 60"
        reasons_zh.append("pH轻微偏离6.0-9.0")
        reasons_en.append("pH slightly deviates from 6.0-9.0")
    else:
        metric_scores["ph"] = 30
        metric_rules_zh["ph"] = "<5.5 或 >9.5，红色分值30"
        metric_rules_en["ph"] = "<5.5 or >9.5, red score 30"
        reasons_zh.append("pH严重异常")
        reasons_en.append("pH severely abnormal")

    if conductivity_ms <= 0.5:
        pass
    elif conductivity_ms <= 1.0:
        metric_scores["conductivity"] = 60
        metric_rules_zh["conductivity"] = "0.5-1.0(ms/cm)，黄色分值60"
        metric_rules_en["conductivity"] = "0.5-1.0(ms/cm), yellow score 60"
        reasons_zh.append("电导率偏高")
        reasons_en.append("Conductivity slightly high")
    else:
        metric_scores["conductivity"] = 30
        metric_rules_zh["conductivity"] = ">1.0(ms/cm)，红色分值30"
        metric_rules_en["conductivity"] = ">1.0(ms/cm), red score 30"
        reasons_zh.append("电导率过高")
        reasons_en.append("Conductivity too high")

    if turbidity <= 1:
        pass
    elif turbidity <= 5:
        metric_scores["turbidity"] = 60
        metric_rules_zh["turbidity"] = "1-5，黄色分值60"
        metric_rules_en["turbidity"] = "1-5, yellow score 60"
        reasons_zh.append("浊度偏高")
        reasons_en.append("Turbidity slightly high")
    else:
        metric_scores["turbidity"] = 30
        metric_rules_zh["turbidity"] = ">5，红色分值30"
        metric_rules_en["turbidity"] = ">5, red score 30"
        reasons_zh.append("浊度过高")
        reasons_en.append("Turbidity too high")

    weighted_cond = metric_scores["conductivity"] * weights["conductivity"] / 100
    weighted_ph = metric_scores["ph"] * weights["ph"] / 100
    weighted_turbidity = metric_scores["turbidity"] * weights["turbidity"] / 100
    raw_total = weighted_cond + weighted_ph + weighted_turbidity
    score = max(0, min(100, int(math.floor(raw_total))))

    grades = [
        (90, "可直接饮用", "Directly Drinkable", "#16a34a", "可作为高质量再生水直接饮用", "Safe for direct drinking after routine safety verification"),
        (75, "绿化灌溉回用水", "Landscape & Irrigation Reuse", "#22c55e", "适用于绿化灌溉与景观补水等非饮用场景", "Suitable for landscaping and irrigation reuse in non-potable scenarios"),
        (60, "杂用回用水", "Municipal Reuse Water", "#eab308", "参考GB/T 18920，可用于冲厕、道路清洁等非接触杂用", "Per GB/T 18920 reference, suitable for toilet flushing and other non-contact municipal reuse"),
        (45, "受限回用水", "Restricted Reuse Water", "#f97316", "仅建议在受控场景下回用", "Only recommended for restricted and controlled reuse"),
        (0, "待处理水", "Further Treatment Required", "#dc2626", "不建议回用，需继续处理后再使用", "Reuse is not recommended before further treatment"),
    ]

    grade_zh, grade_en, color = "待处理水", "Further Treatment Required", "#dc2626"
    usage_zh, usage_en = "不建议回用", "Reuse not recommended"
    usage_detail_zh, usage_detail_en = "需继续处理后再使用", "Further treatment is required before any reuse"

    for threshold, gz, ge, c, uz, ue in grades:
        if score >= threshold:
            grade_zh, grade_en, color = gz, ge, c
            usage_zh, usage_en = gz, ge
            usage_detail_zh, usage_detail_en = uz, ue
            break

    if not reasons_zh:
        reasons_zh.append("各项指标稳定")
        reasons_en.append("All parameters stable")

    reason_text_zh = "；".join(reasons_zh)
    reason_text_en = "; ".join(reasons_en)

    if lang == "en":
        return {
            "grade": grade_en,
            "color": color,
            "score": score,
            "reason": reason_text_en,
            "usage": usage_en,
            "usage_detail": usage_detail_en,
            "score_formula": "Score = Conductivity(40%) + pH(35%) + Turbidity(25%)",
            "score_calc": f"{metric_scores['conductivity']}×{weights['conductivity']}% + {metric_scores['ph']}×{weights['ph']}% + {metric_scores['turbidity']}×{weights['turbidity']}% = {raw_total:.2f} -> floor = {score}",
            "score_breakdown": {
                "conductivity": {
                    "weight": weights["conductivity"],
                    "score": metric_scores["conductivity"],
                    "weighted_score": round(weighted_cond, 2),
                    "rule": metric_rules_en["conductivity"]
                },
                "ph": {
                    "weight": weights["ph"],
                    "score": metric_scores["ph"],
                    "weighted_score": round(weighted_ph, 2),
                    "rule": metric_rules_en["ph"]
                },
                "turbidity": {
                    "weight": weights["turbidity"],
                    "score": metric_scores["turbidity"],
                    "weighted_score": round(weighted_turbidity, 2),
                    "rule": metric_rules_en["turbidity"]
                },
            }
        }

    return {
        "grade": grade_zh,
        "color": color,
        "score": score,
        "reason": reason_text_zh,
        "usage": usage_zh,
        "usage_detail": usage_detail_zh,
        "score_formula": "评分 = 电导率(40%) + pH(35%) + 浊度(25%)",
        "score_calc": f"{metric_scores['conductivity']}×{weights['conductivity']}% + {metric_scores['ph']}×{weights['ph']}% + {metric_scores['turbidity']}×{weights['turbidity']}% = {raw_total:.2f}，向下取整为 {score}",
        "score_breakdown": {
            "conductivity": {
                "weight": weights["conductivity"],
                "score": metric_scores["conductivity"],
                "weighted_score": round(weighted_cond, 2),
                "rule": metric_rules_zh["conductivity"]
            },
            "ph": {
                "weight": weights["ph"],
                "score": metric_scores["ph"],
                "weighted_score": round(weighted_ph, 2),
                "rule": metric_rules_zh["ph"]
            },
            "turbidity": {
                "weight": weights["turbidity"],
                "score": metric_scores["turbidity"],
                "weighted_score": round(weighted_turbidity, 2),
                "rule": metric_rules_zh["turbidity"]
            },
        }
    }


def thingspeak_read(results=20, retries=3):
    channel_id = current_thingspeak_channel_id()
    read_key = current_thingspeak_read_key()

    if not channel_id or not read_key:
        return {"feeds": [], "error": "ThingSpeak channel id or read key is missing"}

    qs = urlencode({"api_key": read_key, "results": results})
    url = f"https://api.thingspeak.com/channels/{channel_id}/feeds.json?{qs}"
    req = Request(url, method="GET")

    last_err = None
    for _ in range(retries):
        try:
            with urlopen(req, timeout=15) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            last_err = e
            time.sleep(1)

    return {"feeds": [], "error": str(last_err)}


def with_scores(read_data, lang="zh"):
    feeds = read_data.get("feeds", [])
    scored = []
    for item in feeds:
        inflow_light = safe_float(item.get("field1"))
        conductivity = safe_float(item.get("field2"))
        ph = safe_float(item.get("field3"))
        waterlevel = safe_float(item.get("field4"))
        turbidity = safe_float(item.get("field5"))
        inflow_heavy = safe_float(item.get("field6"))

        c = classify_quality(ph, conductivity, turbidity, lang=lang)

        enriched = dict(item)
        enriched["inflow_light"] = inflow_light
        enriched["conductivity"] = conductivity
        enriched["ph"] = ph
        enriched["waterlevel"] = waterlevel
        enriched["turbidity"] = turbidity
        enriched["inflow_heavy"] = inflow_heavy
        enriched["score"] = c.get("score", 0)
        enriched["grade"] = c.get("grade", "")
        enriched["grade_color"] = c.get("color", "#9ca3af")
        scored.append(enriched)

    result = dict(read_data)
    result["feeds"] = scored
    return result


def get_runtime_config():
    api_key = current_ai_api_key()
    return {
        "thingspeak_channel_id": current_thingspeak_channel_id(),
        "thingspeak_read_key": current_thingspeak_read_key(),
        "ai_api_key_masked": mask_key(api_key),
        "ai_api_key_configured": bool(api_key),
        "warning": "运行时修改仅在当前进程有效；Vercel 无状态环境下不会长期持久化。"
    }


def apply_runtime_config(payload):
    channel_id = str(payload.get("thingspeak_channel_id", "")).strip()
    read_key = str(payload.get("thingspeak_read_key", "")).strip()
    ai_api_key = str(payload.get("ai_api_key", "")).strip()

    if channel_id:
        runtime_overrides["thingspeak_channel_id"] = channel_id
    if read_key:
        runtime_overrides["thingspeak_read_key"] = read_key
    if ai_api_key:
        runtime_overrides["ai_api_key"] = ai_api_key

    return get_runtime_config()


def thingspeak_write(payload, retries=3):
    if not THINGSPEAK_WRITE_KEY:
        raise Exception("THINGSPEAK_WRITE_KEY is missing")

    data = {"api_key": THINGSPEAK_WRITE_KEY}
    normalized_payload = dict(payload)

    if normalized_payload.get("inflow_light") is None and normalized_payload.get("flow1") is not None:
        normalized_payload["inflow_light"] = normalized_payload.get("flow1")
    if normalized_payload.get("inflow_heavy") is None and normalized_payload.get("flow2") is not None:
        normalized_payload["inflow_heavy"] = normalized_payload.get("flow2")

    for key, idx in THINGSPEAK_FIELDS.items():
        if normalized_payload.get(key) is not None:
            data[f"field{idx}"] = normalized_payload.get(key)

    body = urlencode(data).encode("utf-8")
    req = Request("https://api.thingspeak.com/update", data=body, method="POST")

    last_err = None
    for _ in range(retries):
        try:
            with urlopen(req, timeout=15) as resp:
                return {"entry_id": resp.read().decode("utf-8").strip()}
        except Exception as e:
            last_err = e
            time.sleep(1)

    raise Exception(f"Write failed: {last_err}")


def ask_llm(question, context_str="", lang="zh", retries=3):
    api_key = current_ai_api_key()
    if not api_key:
        return "AI API Key 未配置，当前无法使用智能问答。" if lang != "en" else "AI API key is not configured."

    system_prompt = SYSTEM_PROMPTS.get(lang, SYSTEM_PROMPTS["zh"])
    if context_str:
        system_prompt += f"\n\n{context_str}"

    url = f"{DASHSCOPE_BASE_URL.rstrip('/')}/chat/completions"
    payload = {
        "model": DASHSCOPE_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question},
        ],
        "stream": False,
        "extra_body": {"enable_thinking": True},
    }

    req = Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )

    last_err = None
    for _ in range(retries):
        try:
            with urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            return data["choices"][0]["message"]["content"]
        except Exception as e:
            last_err = e
            time.sleep(2)

    if lang == "en":
        return f"Sorry, AI service is temporarily unavailable. Details: {last_err}"
    return f"抱歉，AI服务暂时不可用，请稍后重试。详细原因：{last_err}"


# -----------------------------
# Routes
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return jsonify({"ok": True})


@app.route("/api/read")
def api_read():
    results = request.args.get("results", default=20, type=int)
    lang = request.args.get("lang", default="zh", type=str)
    data = thingspeak_read(results=max(1, min(2000, results)))
    return jsonify(with_scores(data, lang=lang))


@app.route("/api/config", methods=["GET"])
def api_get_config():
    return jsonify(get_runtime_config())


@app.route("/api/config", methods=["POST"])
def api_set_config():
    payload = request.get_json(silent=True) or {}
    return jsonify(apply_runtime_config(payload))


@app.route("/api/classify", methods=["POST"])
def api_classify():
    payload = request.get_json(silent=True) or {}

    ph = safe_float(payload.get("ph"))
    conductivity = safe_float(payload.get("conductivity"))
    turbidity = safe_float(payload.get("turbidity"))

    if ph is None:
        ph = safe_float(payload.get("field3"))
    if conductivity is None:
        conductivity = safe_float(payload.get("field2"))
    if turbidity is None:
        turbidity = safe_float(payload.get("field5"))

    return jsonify(classify_quality(
        ph, conductivity, turbidity, lang=payload.get("lang", "zh")
    ))


@app.route("/api/write", methods=["POST"])
def api_write():
    payload = request.get_json(silent=True) or {}
    values = {k: safe_float(payload.get(k)) for k in THINGSPEAK_FIELDS.keys()}

    if values.get("inflow_light") is None:
        values["inflow_light"] = safe_float(payload.get("flow1"))
    if values.get("inflow_heavy") is None:
        values["inflow_heavy"] = safe_float(payload.get("flow2"))

    if all(v is None for v in values.values()):
        return jsonify({"error": "no values"}), 400

    try:
        return jsonify(thingspeak_write(values))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/ask", methods=["POST"])
def api_ask():
    payload = request.get_json(silent=True) or {}
    question = str(payload.get("question", "")).strip()
    if not question:
        return jsonify({"error": "empty question"}), 400

    answer = ask_llm(
        question=question,
        context_str=str(payload.get("context", "")),
        lang=payload.get("lang", "zh")
    )
    return jsonify({"answer": answer})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
