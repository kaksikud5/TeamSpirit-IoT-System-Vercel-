// A/B Testing
const AB_TEST_KEY = 'ab_variant';
let abVariant = localStorage.getItem(AB_TEST_KEY);
if (!abVariant) {
    abVariant = Math.random() > 0.5 ? 'A' : 'B';
    localStorage.setItem(AB_TEST_KEY, abVariant);
}

// Complete i18n dictionary
const i18n = {
    zh: {
        title: "智能灰水处理监控平台",
        guide_btn: "向导",
        quality_title: "综合水质评级",
        date_from: "从",
        date_to: "至",
        date_all: "全部",
        date_filter_active: "日期筛选已激活",
        chart_title: "参数变化趋势与监测视图",
        date_from: "从",
        date_to: "至",
        date_all: "全部",
        date_filter_active: "日期筛选已激活",
        card_ph: "PH值",
        card_cond: "电导率（ms/cm）",
        card_level: "液位（%）",
        card_turbidity: "浊度（NTU）",
        card_f1: "入水流量（轻）（L/min）",
        card_f2: "入水流量（重）（L/min）",
        click_detail: "点击查看详情 →",
        quality_click_detail: "查看评级标准 →",
        refresh_data: "更新数据",
        refreshing_data: "更新中...",
        export_data: "导出数据",
        score_formula_label: "评分公式：",
        score_calc_label: "本次得分：",
        score_formula_empty: "等待数据后显示评分公式",
        score_detail_ph: "pH得分",
        score_detail_cond: "电导率得分",
        score_detail_turbidity: "浊度得分",
        trend_overview_desc: "系统评分变化图：每个时间点都按与上方一致的评分规则计算出0-100分，展示历史评分趋势。",
        config_title: "数据源与AI配置",
        config_channel: "ThingSpeak Channel ID",
        config_read_key: "ThingSpeak Read Key",
        config_ai_key: "AI API Key",
        config_save: "保存并应用",
        config_close: "关闭",
        config_open: "打开配置",
        config_saved: "已保存并刷新",
        config_saving: "保存中...",
        config_failed: "保存失败，请重试",
        ai_title: "水质小帮手",
        ai_greeting: "您好！我是水质小帮手。关于水质指标、异常原因等，您可以随时问我。",
        ai_placeholder: "输入问题...",
        ai_send: "发送",
        modal_suggestion: "💡 建议提示：",
        modal_current_val: "当前测得最新数值为",
        modal_ask_ai: "若持续异常，请通过AI助手获取诊断方案。",
        sys_score: "系统评分：",
        thinking: "思考中...",
        net_error: "网络错误，请稍后重试。",
        no_reply: "未收到回复",
        legend_ph: "PH值",
        legend_cond: "电导率",
        legend_level: "液位",
        legend_turbidity: "浊度",
        legend_f1: "入水流量（轻）",
        legend_f2: "入水流量（重）",
        axis_ph: "PH",
        axis_cond: "电导率(ms/cm)",
        axis_turbidity: "浊度(NTU)",
        axis_level: "液位(%)",
        axis_flow: "流量(L/min)",
        axis_normalized: "归一化变化(%)",
        axis_score: "系统评分",
        net_latency: "网络延迟",
        net_strength_green: "信号强",
        net_strength_yellow: "信号中",
        net_strength_red: "信号弱",
        net_status_offline: "离线",
        legend_score: "系统评分",
        trend_all: "系统评分趋势",
        trend_ph: "PH值趋势",
        trend_cond: "电导率趋势",
        trend_turbidity: "浊度趋势",
        trend_level: "液位趋势",
        trend_f1: "入水流量（轻）趋势",
        trend_f2: "入水流量（重）趋势",
        trend_overview_title: "系统评分变化图",
        guide_step1: "这里会实时显示6项关键数据，点开任意卡片都能看到更直观的说明。",
        guide_step2: "系统会把当前数据自动汇总成一个水质评分，方便你快速判断整体状态。",
        guide_step3: "在这里可以查看整体与单项变化趋势，滑动和悬停都能轻松看细节。",
        guide_step4: "有疑问随时问小帮手，我们会尽量用通俗的话帮你分析。",
        guide_step5: "这里可以手动更新数据、导出当前数据，并查看WiFi网络延迟与信号强弱。",
        guide_step6: "这里可以打开配置面板，修改数据源与AI配置。",
        guide_next: "下一步",
        guide_prev: "上一步",
        guide_done: "完成",
        context_prefix: "当前最新水质监测数据如下：",
        context_ph: "PH值",
        context_cond: "电导率（ms/cm）",
        context_turbidity: "浊度（NTU）",
        context_level: "液位（cm）",
        context_f1: "入水流量（轻）（L/min）",
        context_f2: "入水流量（重）（L/min）",
        context_none: "暂无最新监测数据。",
        context_unknown: "未知",
        range_unknown: "区间未知",
        range_ph_green: "6.0 - 9.0",
        range_ph_yellow: "5.5 - 6.0 / 9.0 - 9.5",
        range_ph_red: "< 5.5 或 > 9.5",
        range_cond_green: "≤ 0.5（ms/cm）",
        range_cond_yellow: "0.5（ms/cm） - 1（ms/cm）",
        range_cond_red: "> 1（ms/cm）",
        range_turbidity_green: "≤ 1",
        range_turbidity_yellow: "1 - 5",
        range_turbidity_red: "> 5",
        range_level_green: "5% - 95%",
        range_level_red: "< 5% 或 > 95%",
        range_flow_green: "2.0 - 4.8（L/min）",
        range_flow_yellow: "0-1.1 或 5.2-6.0（L/min）",
        range_flow_red: "1.2 - 1.9（L/min）",
        tip_ph: "水体酸碱度，国标建议范围 6.0 - 9.0",
        tip_cond: "反映水中溶解盐类浓度，通常低于1.0(ms/cm)为佳",
        tip_turbidity: "反映水体浑浊程度，通常越低越好",
        tip_level: "储水池液位百分比 (0-100%)",
        tip_f1: "轻污染入水流量监测",
        tip_f2: "重污染入水流量监测",
        no_data_label: "暂无数据"
    },
    en: {
        title: "Smart Greywater Monitoring",
        guide_btn: "Guide",
        quality_title: "Water Quality Grade",
        date_from: "From",
        date_to: "To",
        date_all: "All",
        date_filter_active: "Date filter active",
        chart_title: "Trend Monitoring & Visualization",
        date_from: "From",
        date_to: "To",
        date_all: "All",
        date_filter_active: "Date filter active",
        card_ph: "PH",
        card_cond: "Conductivity (mS/cm)",
        card_level: "Water Level (%)",
        card_turbidity: "Turbidity (NTU)",
        card_f1: "Inflow Light (L/min)",
        card_f2: "Inflow Heavy (L/min)",
        click_detail: "Click for details →",
        quality_click_detail: "View grading standard →",
        refresh_data: "Refresh Data",
        refreshing_data: "Refreshing...",
        export_data: "Export Data",
        score_formula_label: "Scoring Formula:",
        score_calc_label: "Current Calculation:",
        score_formula_empty: "Scoring formula will appear after data is loaded",
        score_detail_ph: "pH score",
        score_detail_cond: "Conductivity score",
        score_detail_turbidity: "Turbidity score",
        trend_overview_desc: "System Score Trend: each timestamp is scored by the same rule used in the quality card, then plotted from 0 to 100.",
        config_title: "Data & AI Config",
        config_channel: "ThingSpeak Channel ID",
        config_read_key: "ThingSpeak Read Key",
        config_ai_key: "AI API Key",
        config_save: "Save & Apply",
        config_close: "Close",
        config_open: "Open Config",
        config_saved: "Saved and refreshed",
        config_saving: "Saving...",
        config_failed: "Save failed, please retry",
        ai_title: "Water Quality Assistant",
        ai_greeting: "Hello! I'm your Water Quality Assistant. Feel free to ask me anything about quality metrics or anomalies.",
        ai_placeholder: "Type your question...",
        ai_send: "Send",
        modal_suggestion: "💡 Suggestion: ",
        modal_current_val: "The latest measured value is",
        modal_ask_ai: "If anomalies persist, please ask the AI assistant for diagnostic solutions.",
        sys_score: "System Score: ",
        thinking: "Thinking...",
        net_error: "Network error, please try again later.",
        no_reply: "No reply received",
        legend_ph: "PH",
        legend_cond: "Conductivity",
        legend_level: "Water Level",
        legend_turbidity: "Turbidity",
        legend_f1: "Inflow (Light)",
        legend_f2: "Inflow (Heavy)",
        axis_ph: "PH",
        axis_cond: "Conductivity (ms/cm)",
        axis_turbidity: "Turbidity (NTU)",
        axis_level: "Level (%)",
        axis_flow: "Flow (L/min)",
        axis_normalized: "Normalized Change (%)",
        axis_score: "System Score (pts)",
        net_latency: "Latency",
        net_strength_green: "Strong",
        net_strength_yellow: "Medium",
        net_strength_red: "Weak",
        net_status_offline: "Offline",
        legend_score: "System Score",
        trend_all: "System Score Trend",
        trend_ph: "PH Trend",
        trend_cond: "Conductivity Trend",
        trend_turbidity: "Turbidity Trend",
        trend_level: "Water Level Trend",
        trend_f1: "Inflow (Light) Trend",
        trend_f2: "Inflow (Heavy) Trend",
        trend_overview_title: "System Score Trend",
        guide_step1: "These cards show real-time data for 6 channels. Click any card for details. Colored dots indicate status: green=normal, yellow=warning, red=abnormal.",
        guide_step2: "The system automatically evaluates overall water quality grade.",
        guide_step3: "This section includes an overview trend and five single-parameter views with zoom and hover.",
        guide_step4: "Have questions? Ask the AI assistant anytime!",
        guide_step5: "Use these controls to refresh/export data and check WiFi latency and signal strength.",
        guide_step6: "Use this entry to open the config panel for data source and AI settings.",
        guide_next: "Next",
        guide_prev: "Previous",
        guide_done: "Done",
        context_prefix: "Current latest water quality data:",
        context_ph: "PH",
        context_cond: "Conductivity (ms/cm)",
        context_turbidity: "Conductivity",
        context_level: "Water Level",
        context_f1: "Inflow (Light)",
        context_f2: "Inflow (Heavy)",
        context_none: "No monitoring data available.",
        context_unknown: "Unknown",
        range_unknown: "Range unknown",
        range_ph_green: "6.0 - 9.0",
        range_ph_yellow: "5.5 - 6.0 / 9.0 - 9.5",
        range_ph_red: "< 5.5 or > 9.5",
        range_cond_green: "≤ 0.5（ms/cm）",
        range_cond_yellow: "0.5（ms/cm） - 1（ms/cm）",
        range_cond_red: "> 1（ms/cm）",
        range_turbidity_green: "≤ 1",
        range_turbidity_yellow: "1 - 5",
        range_turbidity_red: "> 5",
        range_level_green: "5% - 95%",
        range_level_red: "< 5% or > 95%",
        range_flow_green: "2.0 - 4.8 (L/min)",
        range_flow_yellow: "0-1.1 or 5.2-6.0 (L/min)",
        range_flow_red: "1.2 - 1.9 (L/min)",
        tip_ph: "Water acidity/alkalinity, recommended range 6.0 - 9.0",
        tip_cond: "Dissolved salt concentration, ideally below 1.0 (ms/cm)",
        tip_turbidity: "Represents water cloudiness, lower is better",
        tip_level: "Storage tank level percentage (0-100%)",
        tip_f1: "Light-pollution inflow monitoring",
        tip_f2: "Heavy-pollution inflow monitoring",
        no_data_label: "No data available"
    }
};

let currentLang = 'zh';

// Modal configs with full bilingual support
const modalConfigs = {
    ph: {
        title: {zh: "pH值详细说明", en: "pH Detail"},
        desc: {zh: "pH值是衡量水体酸碱度的重要指标。对于灰水处理，pH值直接影响微生物活性及后续处理工艺。", en: "pH is a crucial indicator of water acidity/alkalinity, directly affecting microbial activity in greywater treatment."},
        ranges: [
            {color: "green", condition: {zh: "6.0 - 9.0", en: "6.0 - 9.0"}, desc: {zh: "正常范围，符合国家排放标准。", en: "Normal range, meets discharge standards."}},
            {color: "yellow", condition: {zh: "5.5-6.0 或 9.0-9.5", en: "5.5-6.0 or 9.0-9.5"}, desc: {zh: "轻微偏离，需关注进水水质变化。", en: "Slight deviation, monitor influent quality."}},
            {color: "red", condition: {zh: "< 5.5 或 > 9.5", en: "< 5.5 or > 9.5"}, desc: {zh: "严重异常，可能损害处理设备。", en: "Severe anomaly, may damage equipment."}}
        ]
    },
    cond: {
        title: {zh: "电导率详细说明（ms/cm）", en: "Conductivity Detail (ms/cm)"},
        desc: {zh: "电导率反映水中溶解性总固体的浓度（单位：ms/cm）。过高的电导率可能导致管道结垢。", en: "Conductivity reflects dissolved total solids concentration (unit: ms/cm). High values may cause pipe scaling."},
        ranges: [
            {color: "green", condition: {zh: "≤ 0.5（ms/cm）", en: "≤ 0.5（ms/cm）"}, desc: {zh: "水质良好，溶解盐分低。", en: "Good quality, low dissolved salts."}},
            {color: "yellow", condition: {zh: "0.5（ms/cm） - 1（ms/cm）", en: "0.5（ms/cm） - 1（ms/cm）"}, desc: {zh: "电导率偏高，属正常灰水波动。", en: "Slightly high, within normal fluctuation."}},
            {color: "red", condition: {zh: "> 1（ms/cm）", en: "> 1（ms/cm）"}, desc: {zh: "电导率过高，存在结垢风险。", en: "Too high, risk of scaling."}}
        ]
    },
    level: {
        title: {zh: "液位详细说明", en: "Water Level Detail"},
        desc: {zh: "液位表示储水池当前水量百分比，用于控制水泵启停，防止溢流或空转。", en: "Water level indicates tank percentage, controlling pump start/stop to prevent overflow or dry running."},
        ranges: [
            {color: "red", condition: {zh: "< 5%", en: "< 5%"}, desc: {zh: "液位过低，可能导致水泵空转。", en: "Too low, may cause pump dry running."}},
            {color: "green", condition: {zh: "5% - 95%", en: "5% - 95%"}, desc: {zh: "正常运行水位区间。", en: "Normal operating range."}},
            {color: "red", condition: {zh: "> 95%", en: "> 95%"}, desc: {zh: "液位接近上限，存在溢流风险。", en: "Near upper limit, overflow risk."}}
        ]
    },
    f1: {
        title: {zh: "入水流量（轻污染）详细说明", en: "Inflow (Light Pollution) Detail"},
        desc: {zh: "用于监测轻污染来水瞬时流量（L/min），帮助判断前端来水是否稳定。", en: "Monitors instant inflow of light-pollution stream (L/min) to evaluate influent stability."},
        ranges: [
            {color: "green", condition: {zh: "2.0 - 4.8（L/min）", en: "2.0 - 4.8 (L/min)"}, desc: {zh: "供水稳定，系统负荷匹配。", en: "Stable supply with matched system load."}},
            {color: "yellow", condition: {zh: "0-1.1 或 5.2-6.0（L/min）", en: "0-1.1 or 5.2-6.0 (L/min)"}, desc: {zh: "偏离目标区间，建议检查阀门与来水波动。", en: "Off target range; check valve state and influent fluctuation."}},
            {color: "red", condition: {zh: "1.2 - 1.9（L/min）", en: "1.2 - 1.9 (L/min)"}, desc: {zh: "异常工况区，建议立即排查传感器与管路。", en: "Abnormal operating band; inspect sensor and pipeline immediately."}}
        ]
    },
    turbidity: {
        title: {zh: "浊度详细说明", en: "Turbidity Detail"},
        desc: {zh: "浊度（NTU）用于反映悬浮颗粒与胶体物含量，数值越高表示水体越浑浊。", en: "Turbidity (NTU) indicates suspended particles and colloids; higher values mean cloudier water."},
        ranges: [
            {color: "green", condition: {zh: "≤ 1", en: "≤ 1"}, desc: {zh: "水体清澈，处理效果稳定。", en: "Water is clear and treatment performance is stable."}},
            {color: "yellow", condition: {zh: "1 - 5", en: "1 - 5"}, desc: {zh: "颗粒物增加，建议关注过滤单元状态。", en: "Particle load rises; check filtration unit status."}},
            {color: "red", condition: {zh: "> 5", en: "> 5"}, desc: {zh: "浑浊度偏高，建议执行排查与强化处理。", en: "High turbidity; perform troubleshooting and enhanced treatment."}}
        ]
    },
    f2: {
        title: {zh: "入水流量（重污染）详细说明", en: "Inflow (Heavy Pollution) Detail"},
        desc: {zh: "用于监测重污染来水瞬时流量（L/min），便于及时识别高负荷冲击。", en: "Monitors instant inflow of heavy-pollution stream (L/min) for high-load shock detection."},
        ranges: [
            {color: "green", condition: {zh: "2.0 - 4.8（L/min）", en: "2.0 - 4.8 (L/min)"}, desc: {zh: "运行平稳，可维持既定处理节奏。", en: "Stable operation and controllable treatment rhythm."}},
            {color: "yellow", condition: {zh: "0-1.1 或 5.2-6.0（L/min）", en: "0-1.1 or 5.2-6.0 (L/min)"}, desc: {zh: "负荷出现波动，建议预警并持续观察。", en: "Load fluctuates; trigger warning and continue observation."}},
            {color: "red", condition: {zh: "1.2 - 1.9（L/min）", en: "1.2 - 1.9 (L/min)"}, desc: {zh: "疑似异常流态，建议立即核查提升泵与阀组。", en: "Potential abnormal flow pattern; inspect lift pump and valve group now."}}
        ]
    },
    quality: {
        title: {zh: "综合水质评级标准", en: "Water Quality Grading Standard"},
        desc: {zh: "综合评分 = 电导率×40% + pH×35% + 浊度×25%（分项得分按区间折算后加权，总分取整）。以下为分级用途说明。", en: "Overall score = Conductivity×40% + pH×35% + Turbidity×25% (sub-scores from bands, then weighted; total is floored). Categories below describe intended reuse."},
        ranges: [
            {color: "green", condition: {zh: "90-100：绿化灌溉优质回用水", en: "90-100: Premium greening irrigation reuse"}, desc: {zh: "满足高标准绿化与灌溉用水需求。", en: "Meets high-standard landscaping and irrigation needs."}},
            {color: "green", condition: {zh: "75-89：绿化灌溉回用水", en: "75-89: Greening irrigation reuse"}, desc: {zh: "适用于绿化灌溉与景观补水等非饮用场景。", en: "Suitable for landscaping and scenic replenishment (non-potable)."}},
            {color: "yellow", condition: {zh: "60-74：杂用回用水", en: "60-74: Miscellaneous reuse"}, desc: {zh: "可用于冲厕、道路清洁等非接触杂用。", en: "Toilet flushing, road cleaning, and similar municipal reuse."}},
            {color: "red", condition: {zh: "45-59：受限回用水", en: "45-59: Restricted reuse"}, desc: {zh: "仅建议在受控场景下回用。", en: "Controlled scenarios only."}},
            {color: "red", condition: {zh: "0-44：待处理水", en: "0-44: Pending treatment"}, desc: {zh: "需继续处理后再使用。", en: "Further treatment before use."}}
        ]
    }
};

let latestDataCache = null;
let latestClassification = null;
let chart = null;
let currentTrend = 'overview';
let chartResizeBound = false;
let latestLatencyMs = null;
let latestLatencyStatus = 'gray';

const metricMeta = {
    f1: { field: 'field1', legendKey: 'legend_f1', axis: 'axis_flow', color: '#2563eb' },
    cond: { field: 'field2', legendKey: 'legend_cond', axis: 'axis_cond', color: '#16a34a' },
    ph: { field: 'field3', legendKey: 'legend_ph', axis: 'axis_ph', color: '#4f46e5' },
    level: { field: 'field4', legendKey: 'legend_level', axis: 'axis_level', color: '#0891b2' },
    turbidity: { field: 'field5', legendKey: 'legend_turbidity', axis: 'axis_turbidity', color: '#9333ea' },
    f2: { field: 'field6', legendKey: 'legend_f2', axis: 'axis_flow', color: '#f97316' }
};

function getPhStatus(v) {
    if (v === null) return 'gray';
    if (v >= 6.0 && v <= 9.0) return 'green';
    if ((v >= 5.5 && v < 6.0) || (v > 9.0 && v <= 9.5)) return 'yellow';
    return 'red';
}
function getCondStatus(v) {
    if (v === null) return 'gray';
    if (v <= 0.5) return 'green';
    if (v <= 1) return 'yellow';
    return 'red';
}
function getLevelStatus(v) {
    if (v === null) return 'gray';
    if (v < 5 || v > 95) return 'red';
    return 'green';
}
function getTurbidityStatus(v) {
    if (v === null) return 'gray';
    if (v <= 1) return 'green';
    if (v <= 5) return 'yellow';
    return 'red';
}
function getFlowStatus(v) {
    if (v === null) return 'gray';
    if (v >= 2.0 && v <= 4.8) return 'green';
    if ((v >= 0 && v <= 1.1) || (v >= 5.2 && v <= 6.0)) return 'yellow';
    return 'red';
}

function setDot(id, status) {
    const el = document.getElementByById(id);
    if (!el) return;
    el.className = 'status-dot ' + status;
}

function initTooltips() {
    const tips = {
        'tip_ph': i18n[currentLang].tip_ph,
        'tip_cond': i18n[currentLang].tip_cond,
        'tip_level': i18n[currentLang].tip_level,
        'tip_f1': i18n[currentLang].tip_f1,
        'tip_f2': i18n[currentLang].tip_f2
    };
    document.querySelectorAll('.info-icon').forEach(el => {
        const key = el.getAttribute('data-tip-key');
        if (key && tips[key]) {
            el.setAttribute('data-tippy-content', tips[key]);
        }
    });
    tippy('.info-icon', { placement: 'top', animation: 'scale', theme: 'light-border' });
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.ab-btn');
    if (btn && abVariant === 'A') {
        btn.classList.add('from-indigo-500', 'to-indigo-600');
    }

    const savedLang = localStorage.getItem('lang') || '';
    const browserLang = navigator.language && navigator.language.toLowerCase().startsWith('en') ? 'en' : 'zh';
    currentLang = savedLang === 'en' || savedLang === 'zh' ? savedLang : browserLang;
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.value = currentLang;
    }
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

    document.getElementById('lang-switch').addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('lang', currentLang);
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
        updateTranslations();
        if (latestDataCache) {
            updateStatusDots(latestDataCache);
            updateClassification(latestDataCache);
            updateChart();
        }
    });

    document.getElementById('guide-btn').addEventListener('click', startGuide);
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    const cfgSaveBtn = document.getElementById('cfg-save-btn');
    if (cfgSaveBtn) {
        cfgSaveBtn.addEventListener('click', saveRuntimeConfig);
    }
    const cfgCloseBtn = document.getElementById('cfg-close-btn');
    if (cfgCloseBtn) {
        cfgCloseBtn.addEventListener('click', () => setConfigPanelVisible(false));
    }
    const cfgOpenBtn = document.getElementById('cfg-toggle-open');
    if (cfgOpenBtn) {
        cfgOpenBtn.addEventListener('click', () => setConfigPanelVisible(true));
    }

    // Date filter
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const dateClearBtn = document.getElementById('date-clear-btn');
    if (dateFromInput) {
        dateFromInput.addEventListener('change', () => {
            dateFrom = dateFromInput.value ? new Date(dateFromInput.value).getTime() : null;
            updateDateFilterBanner();
            updateChart();
        });
    }
    if (dateToInput) {
        dateToInput.addEventListener('change', () => {
            dateTo = dateToInput.value ? new Date(dateToInput.value).getTime() : null;
            updateDateFilterBanner();
            updateChart();
        });
    }
    if (dateClearBtn) {
        dateClearBtn.addEventListener('click', () => {
            dateFrom = null;
            dateTo = null;
            if (dateFromInput) dateFromInput.value = '';
            if (dateToInput) dateToInput.value = '';
            updateDateFilterBanner();
            updateChart();
        });
    }

    setupTrendTabs();
    initConfigPanelVisibility();
    updateTranslations();
    startGuide();

    initTooltips();
    loadRuntimeConfig();
    fetchData();
});

function T(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

function setupTrendTabs() {
    const tabsContainer = document.getElementById('trend-tabs');
    if (!tabsContainer) return;
    tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-trend]');
        if (!btn) return;
        currentTrend = btn.getAttribute('data-trend');
        updateTrendTabs();
        updateChart();
    });
    updateTrendTabs();
}

function updateTrendTabs() {
    document.querySelectorAll('#trend-tabs [data-trend]').forEach(btn => {
        const active = btn.getAttribute('data-trend') === currentTrend;
        btn.classList.toggle('active', active);
    });
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = T(key);
        const children = Array.from(el.childNodes);
        const firstText = children.find(n => n.nodeType === Node.TEXT_NODE);
        if (firstText) {
            firstText.nodeValue = text + ' ';
        } else {
            el.prepend(document.createTextNode(text + ' '));
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = T(el.getAttribute('data-i18n-placeholder'));
    });

    const greetingEl = document.querySelector('#chat-messages [data-i18n="ai_greeting"]');
    if (greetingEl) greetingEl.textContent = T('ai_greeting');
    updateTrendTabs();
    initTooltips();
    updateLatencyIndicator();
}

function startGuide() {
    const steps = [
        { element: '#step-cards', intro: T('guide_step1') },
        { element: '#step-quality', intro: T('guide_step2') },
        { element: '#step-chart', intro: T('guide_step3') }
    ];
    const aiStepElement = document.querySelector('#step-ai');
    if (aiStepElement) {
        steps.push({ element: '#step-ai', intro: T('guide_step4') });
    }
    const actionsStepElement = document.querySelector('#step-actions');
    if (actionsStepElement) {
        steps.push({ element: '#step-actions', intro: T('guide_step5') });
    }
    const configStepSelector = document.querySelector('#cfg-toggle-open:not(.hidden)') ? '#cfg-toggle-open' : '#config-panel';
    const configStepElement = document.querySelector(configStepSelector);
    if (configStepElement) {
        steps.push({ element: configStepSelector, intro: T('guide_step6') });
    }
    introJs().setOptions({
        nextLabel: T('guide_next'),
        prevLabel: T('guide_prev'),
        doneLabel: T('guide_done'),
        steps
    }).start();
}

function safeNum(v) {
    const n = Number(v);
    return isNaN(n) ? null : n;
}

function toMsCm(v) {
    if (v === null) return null;
    return v > 10 ? v / 1000 : v;
}

function formatValue(v, digits = 2) {
    return v === null ? '--' : Number(v).toFixed(digits);
}

function getLatencyStatus(ms) {
    if (ms === null) return 'red';
    if (ms <= 150) return 'green';
    if (ms <= 400) return 'yellow';
    return 'red';
}

function updateLatencyIndicator() {
    const textEl = document.getElementById('net-latency-text');
    if (!textEl) return;
    const dotStatus = latestLatencyStatus || 'gray';
    setDot('net-latency-dot', dotStatus);
    const label = T('net_latency');
    if (latestLatencyMs === null && dotStatus === 'gray') {
        textEl.textContent = `${label}: --`;
        return;
    }
    if (latestLatencyMs === null) {
        textEl.textContent = `${label}: ${T('net_status_offline')}`;
        return;
    }
    const strengthKey = dotStatus === 'green'
        ? 'net_strength_green'
        : dotStatus === 'yellow'
            ? 'net_strength_yellow'
            : 'net_strength_red';
    textEl.textContent = `${label}: ${latestLatencyMs}ms · ${T(strengthKey)}`;
}

async function measureNetworkLatency() {
    const start = performance.now();
    try {
        await fetch(`/api/config?_t=${Date.now()}`, { cache: 'no-store' });
        latestLatencyMs = Math.round(performance.now() - start);
        latestLatencyStatus = getLatencyStatus(latestLatencyMs);
    } catch (e) {
        latestLatencyMs = null;
        latestLatencyStatus = 'red';
    }
    updateLatencyIndicator();
}

function openModal(type) {
    const config = modalConfigs[type];
    if (!config) return;
    document.getElementById('modal-title').textContent = config.title[currentLang];
    const modalDesc = document.getElementById('modal-desc');
    modalDesc.textContent = type === 'quality' ? buildQualityModalDesc(config.desc[currentLang]) : config.desc[currentLang];

    const rangesContainer = document.getElementById('modal-ranges');
    rangesContainer.innerHTML = '';
    config.ranges.forEach(r => {
        const bg = r.color === 'green' ? 'bg-green-50 border-green-200' :
                   r.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
        const dot = r.color === 'green' ? 'green' : r.color === 'yellow' ? 'yellow' : 'red';
        const tc = r.color === 'green' ? 'text-green-700' :
                   r.color === 'yellow' ? 'text-yellow-700' : 'text-red-700';
        rangesContainer.innerHTML += `
            <div class="flex items-center gap-3 p-3 rounded-xl border ${bg}">
                <span class="status-dot ${dot}"></span>
                <div><span class="font-bold ${tc}">${r.condition[currentLang]}</span> <span class="text-sm text-gray-600">${r.desc[currentLang]}</span></div>
            </div>`;
    });
    const scoreDetailsEl = document.getElementById('modal-score-details');
    if (scoreDetailsEl) {
        if (type === 'quality' && latestClassification) {
            scoreDetailsEl.classList.remove('hidden');
            scoreDetailsEl.innerHTML = buildScoreDetailsHtml(latestClassification);
        } else {
            scoreDetailsEl.classList.add('hidden');
            scoreDetailsEl.innerHTML = '';
        }
    }

    const valMap = { ph: 'val-ph', cond: 'val-cond', level: 'val-level', turbidity: 'val-turbidity', f1: 'val-f1', f2: 'val-f2' };
    const valueText = type === 'quality'
        ? (latestClassification ? String(latestClassification.score) : '--')
        : (document.getElementById(valMap[type]) ? document.getElementById(valMap[type]).textContent : '--');
    document.getElementById('modal-val').textContent = valueText;
    document.getElementById('detail-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

let allFeeds = [];
let dateFrom = null;
let dateTo = null;

function updateDateFilterBanner() {
    const banner = document.getElementById('date-filter-banner');
    const rangeEl = document.getElementById('date-filter-range');
    if (!banner) return;
    const hasFilter = dateFrom || dateTo;
    banner.classList.toggle('hidden', !hasFilter);
    if (hasFilter && rangeEl) {
        const fmt = (ts) => {
            const d = new Date(ts);
            return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        };
        const fromText = dateFrom ? fmt(dateFrom) : '--';
        const toText = dateTo ? fmt(dateTo) : '--';
        rangeEl.textContent = `${T('date_from')}: ${fromText}  ${T('date_to')}: ${toText}`;
    }
}

async function fetchData() {
    try {
        const res = await fetch(`/api/read?results=2000&lang=${currentLang}`);
        const data = await res.json();
        if (data.feeds && data.feeds.length > 0) {
            allFeeds = data.feeds.filter(f => (
                f.score !== undefined && f.score !== null
            ) || f.field1 || f.field2 || f.field3 || f.field4 || f.field5 || f.field6);
            if (allFeeds.length > 0) {
                const latest = allFeeds[allFeeds.length - 1];
                latestDataCache = latest;
                updateCards(latest);
                updateStatusDots(latest);
                updateClassification(latest);
            }
        } else {
            allFeeds = [];
        }
    } catch (e) {
        console.error("Data load failed", e);
    } finally {
        updateChart();
        await measureNetworkLatency();
    }
}

async function refreshData() {
    const btn = document.getElementById('refresh-btn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = T('refreshing_data');
    }
    await fetchData();
    if (btn) {
        btn.disabled = false;
        btn.textContent = T('refresh_data');
    }
}

function exportData() {
    if (!allFeeds.length) return;
    const header = ['created_at', 'inflow_light', 'conductivity', 'ph', 'waterlevel', 'turbidity', 'inflow_heavy', 'system_score'];
    const rows = allFeeds.map(f => [
        f.created_at || '',
        f.field1 ?? '',
        f.field2 ?? '',
        f.field3 ?? '',
        f.field4 ?? '',
        f.field5 ?? '',
        f.field6 ?? '',
        f.score ?? ''
    ]);
    const csv = [header.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.download = `water_quality_${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

async function loadRuntimeConfig() {
    try {
        const res = await fetch('/api/config');
        const cfg = await res.json();
        const channelEl = document.getElementById('cfg-channel-id');
        const readKeyEl = document.getElementById('cfg-read-key');
        const aiKeyEl = document.getElementById('cfg-ai-key');
        if (channelEl) channelEl.value = cfg.thingspeak_channel_id || '';
        if (readKeyEl) readKeyEl.value = cfg.thingspeak_read_key || '';
        if (aiKeyEl) aiKeyEl.value = cfg.ai_api_key || '';
    } catch (e) {
        console.error(e);
    }
}

async function saveRuntimeConfig() {
    const btn = document.getElementById('cfg-save-btn');
    const statusEl = document.getElementById('cfg-status');
    const payload = {
        thingspeak_channel_id: (document.getElementById('cfg-channel-id')?.value || '').trim(),
        thingspeak_read_key: (document.getElementById('cfg-read-key')?.value || '').trim(),
        ai_api_key: (document.getElementById('cfg-ai-key')?.value || '').trim()
    };
    if (btn) {
        btn.disabled = true;
        btn.textContent = T('config_saving');
    }
    try {
        const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        await res.json();
        if (statusEl) statusEl.textContent = T('config_saved');
        await refreshData();
    } catch (e) {
        if (statusEl) statusEl.textContent = T('config_failed');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = T('config_save');
        }
    }
}

function initConfigPanelVisibility() {
    const saved = localStorage.getItem('config_panel_visible');
    setConfigPanelVisible(saved === '1', false);
}

function setConfigPanelVisible(visible, persist = true) {
    const panel = document.getElementById('config-panel');
    const openBtn = document.getElementById('cfg-toggle-open');
    if (panel) panel.classList.toggle('hidden', !visible);
    if (openBtn) openBtn.classList.toggle('hidden', visible);
    if (persist) {
        localStorage.setItem('config_panel_visible', visible ? '1' : '0');
    }
}

function updateCards(latest) {
    const map = {
        'val-f1': latest.field1,
        'val-cond': toMsCm(safeNum(latest.field2)),
        'val-ph': latest.field3,
        'val-level': latest.field4,
        'val-turbidity': latest.field5,
        'val-f2': latest.field6
    };
    for (let id in map) {
        const el = document.getElementById(id);
        el.classList.remove('skeleton');
        el.textContent = formatValue(safeNum(map[id]), 2);
    }
}

function updateStatusDots(latest) {
    const f1 = safeNum(latest.field1);
    const cond = toMsCm(safeNum(latest.field2));
    const ph = safeNum(latest.field3);
    const level = safeNum(latest.field4);
    const turbidity = safeNum(latest.field5);
    const f2 = safeNum(latest.field6);

    setDot('range-dot-cond', getCondStatus(cond));
    setDot('range-dot-ph', getPhStatus(ph));
    setDot('range-dot-level', getLevelStatus(level));
    setDot('range-dot-turbidity', getTurbidityStatus(turbidity));
    setDot('range-dot-f1', getFlowStatus(f1));
    setDot('range-dot-f2', getFlowStatus(f2));

    const condStatus = getCondStatus(cond);
    const phStatus = getPhStatus(ph);
    const levelStatus = getLevelStatus(level);
    const turbidityStatus = getTurbidityStatus(turbidity);
    const flow1Status = getFlowStatus(f1);
    const flow2Status = getFlowStatus(f2);

    document.getElementById('range-cond').textContent = condStatus === 'green' ? T('range_cond_green') : condStatus === 'yellow' ? T('range_cond_yellow') : condStatus === 'red' ? T('range_cond_red') : T('range_unknown');
    document.getElementById('range-ph').textContent = phStatus === 'green' ? T('range_ph_green') : phStatus === 'yellow' ? T('range_ph_yellow') : phStatus === 'red' ? T('range_ph_red') : T('range_unknown');
    document.getElementById('range-level').textContent = levelStatus === 'green' ? T('range_level_green') : levelStatus === 'red' ? T('range_level_red') : T('range_unknown');
    document.getElementById('range-turbidity').textContent = turbidityStatus === 'green' ? T('range_turbidity_green') : turbidityStatus === 'yellow' ? T('range_turbidity_yellow') : turbidityStatus === 'red' ? T('range_turbidity_red') : T('range_unknown');
    document.getElementById('range-f1').textContent = flow1Status === 'green' ? T('range_flow_green') : flow1Status === 'yellow' ? T('range_flow_yellow') : flow1Status === 'red' ? T('range_flow_red') : T('range_unknown');
    document.getElementById('range-f2').textContent = flow2Status === 'green' ? T('range_flow_green') : flow2Status === 'yellow' ? T('range_flow_yellow') : flow2Status === 'red' ? T('range_flow_red') : T('range_unknown');
}

async function updateClassification(latest) {
    const payload = {
        ph: safeNum(latest.field3),
        conductivity: toMsCm(safeNum(latest.field2)),
        turbidity: safeNum(latest.field5),
        lang: currentLang
    };
    try {
        const res = await fetch('/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const c = await res.json();
        latestClassification = c;

        const gradeEl = document.getElementById('quality-grade');
        gradeEl.classList.remove('skeleton');
        gradeEl.textContent = c.grade;
        gradeEl.style.backgroundColor = c.color;

        const scoreEl = document.getElementById('quality-score');
        scoreEl.classList.remove('skeleton', 'w-40', 'h-6');
        scoreEl.textContent = `${T('sys_score')}${c.score}`;

        const usageDetailEl = document.getElementById('quality-usage-detail');
        if (usageDetailEl) {
            usageDetailEl.textContent = c.usage_detail || '';
        }

        const reasonEl = document.getElementById('quality-reason');
        reasonEl.classList.remove('skeleton', 'min-h-[1.25rem]');
        reasonEl.textContent = buildExtendedReason(latest, c.reason || '');
    } catch (e) {
        console.error(e);
    }
}

function buildExtendedReason(latest, baseReason) {
    if (!baseReason) return '';
    const isZh = currentLang === 'zh';
    const phSevere = isZh ? baseReason.includes('pH严重异常') : baseReason.toLowerCase().includes('ph severely abnormal');
    if (!phSevere) return baseReason;
    const cond = toMsCm(safeNum(latest.field2));
    const turbidity = safeNum(latest.field5);
    const level = safeNum(latest.field4);
    const f1 = safeNum(latest.field1);
    const f2 = safeNum(latest.field6);
    const condStatus = getCondStatus(cond);
    const turbidityStatus = getTurbidityStatus(turbidity);
    const levelStatus = getLevelStatus(level);
    const f1Status = getFlowStatus(f1);
    const f2Status = getFlowStatus(f2);
    const issueTexts = [];
    if (isZh) {
        if (condStatus === 'yellow') issueTexts.push('电导率偏高');
        if (condStatus === 'red') issueTexts.push('电导率过高');
        if (turbidityStatus === 'yellow') issueTexts.push('浊度偏高');
        if (turbidityStatus === 'red') issueTexts.push('浊度过高');
        if (levelStatus === 'red') issueTexts.push('液位异常');
        if (f1Status === 'yellow') issueTexts.push('入水流量（轻）波动');
        if (f1Status === 'red') issueTexts.push('入水流量（轻）异常');
        if (f2Status === 'yellow') issueTexts.push('入水流量（重）波动');
        if (f2Status === 'red') issueTexts.push('入水流量（重）异常');
        const extra = issueTexts.filter(text => !baseReason.includes(text));
        return extra.length ? `${baseReason}；${extra.join('、')}` : baseReason;
    }
    if (condStatus === 'yellow') issueTexts.push('Conductivity slightly high');
    if (condStatus === 'red') issueTexts.push('Conductivity too high');
    if (turbidityStatus === 'yellow') issueTexts.push('Turbidity slightly high');
    if (turbidityStatus === 'red') issueTexts.push('Turbidity too high');
    if (levelStatus === 'red') issueTexts.push('Water level abnormal');
    if (f1Status === 'yellow') issueTexts.push('Inflow (Light) fluctuating');
    if (f1Status === 'red') issueTexts.push('Inflow (Light) abnormal');
    if (f2Status === 'yellow') issueTexts.push('Inflow (Heavy) fluctuating');
    if (f2Status === 'red') issueTexts.push('Inflow (Heavy) abnormal');
    const extra = issueTexts.filter(text => !baseReason.includes(text));
    return extra.length ? `${baseReason}; ${extra.join(', ')}` : baseReason;
}

function buildScoreDetailsHtml(c) {
    if (!c || !c.score_formula || !c.score_breakdown || !c.score_calc) {
        return `${T('score_formula_label')} ${T('score_formula_empty')}`;
    }
    const breakdown = c.score_breakdown;
    return `
        <div>${T('score_formula_label')} ${c.score_formula}</div>
        <div>${T('score_calc_label')} ${c.score_calc}</div>
        <div>${T('score_detail_cond')}：${breakdown.conductivity?.score ?? '--'}×${breakdown.conductivity?.weight ?? '--'}% = ${breakdown.conductivity?.weighted_score ?? '--'}（${breakdown.conductivity?.rule ?? '--'}）</div>
        <div>${T('score_detail_ph')}：${breakdown.ph?.score ?? '--'}×${breakdown.ph?.weight ?? '--'}% = ${breakdown.ph?.weighted_score ?? '--'}（${breakdown.ph?.rule ?? '--'}）</div>
        <div>${T('score_detail_turbidity')}：${breakdown.turbidity?.score ?? '--'}×${breakdown.turbidity?.weight ?? '--'}% = ${breakdown.turbidity?.weighted_score ?? '--'}（${breakdown.turbidity?.rule ?? '--'}）</div>
    `;
}

function buildQualityModalDesc(baseDesc) {
    if (!latestClassification || !latestClassification.score_formula) return baseDesc;
    return `${baseDesc} ${latestClassification.score_formula}`;
}

function getFilteredFeeds() {
    if (!dateFrom && !dateTo) return allFeeds;
    return allFeeds.filter(f => {
        const d = new Date(f.created_at);
        if (isNaN(d)) return false;
        const ts = d.getTime();
        if (dateFrom && ts < dateFrom) return false;
        if (dateTo) {
            const endOfDay = new Date(dateTo);
            endOfDay.setHours(23, 59, 59, 999);
            if (ts > endOfDay.getTime()) return false;
        }
        return true;
    });
}

function updateChart() {
    const el = document.getElementById('main-chart');
    if (!el) return;

    if (!chart) {
        chart = echarts.init(el);
        if (!chartResizeBound) {
            window.addEventListener('resize', () => chart && chart.resize());
            chartResizeBound = true;
        }
    }

    el.classList.remove('skeleton');

    const filtered = getFilteredFeeds();

    if (filtered.length === 0) {
        chart.clear();
        chart.setOption({
            title: {
                text: T('no_data_label'),
                left: 'center', top: 'middle',
                textStyle: { fontSize: 16, color: '#94a3b8', fontWeight: 400 }
            },
            xAxis: { show: false },
            yAxis: { show: false },
            series: []
        }, true);
        return;
    }

    let option;
    try {
        option = currentTrend === 'overview'
            ? buildOverviewOption(filtered)
            : buildSingleOption(currentTrend, filtered);
    } catch (e) {
        console.error('Build chart option failed', e);
        return;
    }

    chart.clear();
    chart.setOption(option, true);
}

function getTimeLabels(feeds) {
    return feeds.map(f => {
        const d = new Date(f.created_at);
        return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    });
}

function getSeriesValues(key, feeds) {
    const meta = metricMeta[key];
    if (!meta) return [];
    return feeds.map(f => {
        const value = safeNum(f[meta.field]);
        return key === 'cond' ? toMsCm(value) : value;
    });
}

function getSingleAxisRange(key, values) {
    if (key === 'ph') return { min: 0, max: 14 };
    if (key === 'turbidity') {
        const valid = values.filter(v => v !== null);
        const maxVal = valid.length ? Math.max(...valid) : 5;
        return { min: 0, max: Math.max(6, Math.ceil(maxVal * 1.2)) };
    }
    if (key === 'level') return { min: 0, max: 100 };
    if (key === 'cond') return { min: 0, max: 20 };
    return { min: 0, max: 6 };
}

function calcQualityScoreFromFeed(feed) {
    const ph = safeNum(feed.field3);
    const conductivity = toMsCm(safeNum(feed.field2));
    const turbidity = safeNum(feed.field5);
    if ([ph, conductivity, turbidity].some(v => v === null)) return null;
    let phScore = 100;
    let condScore = 100;
    let turbidityScore = 100;
    if (ph < 6.0 || ph > 9.0) {
        if ((ph >= 5.5 && ph < 6.0) || (ph > 9.0 && ph <= 9.5)) phScore = 60;
        else phScore = 30;
    }
    if (conductivity > 0.5 && conductivity <= 1.0) condScore = 60;
    else if (conductivity > 1.0) condScore = 30;
    if (turbidity > 1 && turbidity <= 5) turbidityScore = 60;
    else if (turbidity > 5) turbidityScore = 30;
    return Math.max(0, Math.min(100, Math.floor(condScore * 0.4 + phScore * 0.35 + turbidityScore * 0.25)));
}

function getScoreSeries(feeds) {
    return feeds.map(f => calcQualityScoreFromFeed(f));
}

function buildOverviewOption(feeds) {
    const times = getTimeLabels(feeds);
    const scoreValues = getScoreSeries(feeds);
    return {
        title: { text: T('trend_overview_title'), left: 'center', textStyle: { fontSize: 16, fontWeight: 600, color: '#334155' } },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const p = Array.isArray(params) ? params[0] : params;
                const idx = p && typeof p.dataIndex === 'number' ? p.dataIndex : -1;
                const feed = idx >= 0 ? feeds[idx] : null;
                const score = p && p.data != null ? p.data : '--';
                const f1 = feed && feed.field1 != null ? Number(feed.field1).toFixed(2) : '--';
                const cond = feed && feed.field2 != null ? formatValue(toMsCm(safeNum(feed.field2)), 2) : '--';
                const ph = feed && feed.field3 != null ? Number(feed.field3).toFixed(2) : '--';
                const level = feed && feed.field4 != null ? Number(feed.field4).toFixed(2) : '--';
                const turbidity = feed && feed.field5 != null ? Number(feed.field5).toFixed(2) : '--';
                const f2 = feed && feed.field6 != null ? Number(feed.field6).toFixed(2) : '--';
                const timeText = idx >= 0 && times[idx] ? times[idx] : '';
                return [
                    `${timeText}`,
                    `${T('legend_score')}: ${score}`,
                    `${T('legend_f1')}: ${f1}`,
                    `${T('legend_cond')}: ${cond}`,
                    `${T('legend_ph')}: ${ph}`,
                    `${T('legend_level')}: ${level}`,
                    `${T('legend_turbidity')}: ${turbidity}`,
                    `${T('legend_f2')}: ${f2}`
                ].join('<br/>');
            }
        },
        legend: { data: [T('legend_score')], bottom: 0, icon: 'roundRect', textStyle: { fontSize: 13, color: '#475569' } },
        dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            { start: 0, end: 100, height: 18, bottom: 32 }
        ],
        grid: { left: '9%', right: '5%', top: 58, bottom: 78, containLabel: true },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times,
            axisLabel: { fontSize: 12, color: '#64748b' }
        },
        yAxis: [{
            type: 'value',
            name: T('axis_score'),
            min: 0,
            max: 100,
            nameTextStyle: { fontSize: 12, color: '#64748b' },
            axisLabel: { fontSize: 12, color: '#64748b' }
        }],
        series: [{
            name: T('legend_score'),
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: scoreValues,
            itemStyle: { color: '#0ea5e9' },
            lineStyle: { width: 3 },
            areaStyle: {
                opacity: 0.16,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#0ea5e980' },
                    { offset: 1, color: '#0ea5e910' }
                ])
            }
        }]
    };
}

function buildSingleOption(key, feeds) {
    const meta = metricMeta[key] || metricMeta.ph;
    const times = getTimeLabels(feeds);
    const data = getSeriesValues(key, feeds);
    const axisRange = getSingleAxisRange(key, data);
    const label = T(meta.legendKey);
    return {
        title: { text: label, left: 'center', textStyle: { fontSize: 16, fontWeight: 600, color: '#334155' } },
        tooltip: { trigger: 'axis' },
        legend: { data: [label], bottom: 0, icon: 'roundRect', textStyle: { fontSize: 13, color: '#475569' } },
        dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            { start: 0, end: 100, height: 18, bottom: 32 }
        ],
        grid: { left: '9%', right: '5%', top: 58, bottom: 78, containLabel: true },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times,
            axisLabel: { fontSize: 12, color: '#64748b' }
        },
        yAxis: [{
            type: 'value',
            name: T(meta.axis),
            min: axisRange.min,
            max: axisRange.max,
            nameTextStyle: { fontSize: 12, color: '#64748b' },
            axisLabel: { fontSize: 12, color: '#64748b' }
        }],
        series: [{
            name: label,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data,
            itemStyle: { color: meta.color },
            lineStyle: { width: 3 },
            areaStyle: {
                opacity: 0.18,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: `${meta.color}99` },
                    { offset: 1, color: `${meta.color}10` }
                ])
            }
        }]
    };
}

const chatBox = document.getElementById('chat-messages');
const aiInput = document.getElementById('ai-input');
const aiSendBtn = document.getElementById('ai-send');

function appendChat(role, text) {
    if (!chatBox) return;
    const wrapper = document.createElement('div');
    const isUser = role === 'user';
    wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

    const bubble = document.createElement('div');
    bubble.className = isUser
        ? 'max-w-[80%] p-3 rounded-2xl rounded-tr-sm text-base leading-relaxed bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
        : 'max-w-[80%] p-3 rounded-2xl rounded-tl-sm text-base leading-relaxed bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-100/50 shadow-md';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function buildContext() {
    if (!latestDataCache) return T('context_none');
    const unk = T('context_unknown');
    const condValue = toMsCm(safeNum(latestDataCache.field2));
    const condText = condValue === null ? unk : formatValue(condValue, 2);
    return `${T('context_prefix')}\n- ${T('context_f1')}: ${latestDataCache.field1 || unk}\n- ${T('context_cond')}: ${condText}\n- ${T('context_ph')}: ${latestDataCache.field3 || unk}\n- ${T('context_level')}: ${latestDataCache.field4 || unk}\n- ${T('context_turbidity')}: ${latestDataCache.field5 || unk}\n- ${T('context_f2')}: ${latestDataCache.field6 || unk}`;
}

if (aiSendBtn && aiInput && chatBox) {
    aiSendBtn.addEventListener('click', async () => {
        const q = aiInput.value.trim();
        if (!q) return;

        appendChat('user', q);
        aiInput.value = '';

        const loadingId = 'loading-' + Date.now();
        const wrapper = document.createElement('div');
        wrapper.id = loadingId;
        wrapper.className = 'flex justify-start';
        wrapper.innerHTML = `<div class="max-w-[80%] p-3 rounded-2xl rounded-tl-sm text-base leading-relaxed bg-white/80 backdrop-blur-sm text-gray-500 border border-gray-100/50 shadow-md flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ${T('thinking')}
        </div>`;
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: q, context: buildContext(), lang: currentLang })
            });
            const data = await res.json();
            document.getElementById(loadingId).remove();
            appendChat('ai', data.answer || data.error || T('no_reply'));
        } catch (e) {
            document.getElementById(loadingId).remove();
            appendChat('ai', T('net_error'));
        }
    });

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') aiSendBtn.click();
    });
}
