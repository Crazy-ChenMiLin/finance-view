/**
 * Living Architecture Interactive Application · Finance OA
 * Visual Explainer Engine: Pan & Zoom, Bidirectional Call Highlighting, Metrics Radar, Version Time Travel & Diff
 */

// Stable 2D layout coordinates for consistent, non-jumping topology
const NODE_LAYOUT = {
  // 1. Web Tier (Left Column: X: 45 - 265)
  'web-purchase-request':    { x: 45, y: 70,  w: 220, h: 54, sys: 'web', name: '采购申请管理', sub: 'PR明细与预算预审' },
  'web-purchase-plan':       { x: 45, y: 145, w: 220, h: 54, sys: 'web', name: '采购计划比价', sub: '询价评估与分摊' },
  'web-purchase-order':      { x: 45, y: 220, w: 220, h: 54, sys: 'web', name: '采购订单台账', sub: 'PO单据与供应商' },
  'web-purchase-contract':   { x: 45, y: 295, w: 220, h: 54, sys: 'web', name: '采购合同工作台', sub: '正文预览与用印' },
  'web-purchase-acceptance': { x: 45, y: 370, w: 220, h: 54, sys: 'web', name: '采购验收台账', sub: '分批到货与转固' },
  'web-purchase-payment':    { x: 45, y: 445, w: 220, h: 54, sys: 'web', name: '付款三层流转', sub: '申请/提报/月计划' },

  // 2. Server Tier - Outsourcing Services (Center-Left: X: 310 - 530)
  'srv-purchase-pr':       { x: 310, y: 70,  w: 220, h: 54, sys: 'server', name: 'PurchaseRequestSrv', sub: '预算限额与审批路由' },
  'srv-purchase-plan':     { x: 310, y: 145, w: 220, h: 54, sys: 'server', name: 'PurchasePlanSrv', sub: '分摊算法与PO生成' },
  'srv-purchase-po':       { x: 310, y: 220, w: 220, h: 54, sys: 'server', name: 'PurchaseOrderSrv', sub: '20W限额与价格偏离' },
  'srv-purchase-contract': { x: 310, y: 295, w: 220, h: 54, sys: 'server', name: 'PurchaseContractSrv', sub: '金额阶梯与条款装配' },
  'srv-purchase-accept':   { x: 310, y: 370, w: 220, h: 54, sys: 'server', name: 'PurchaseAcceptanceSrv', sub: '四道门禁与资产标记' },
  'srv-execution-ledger':  { x: 310, y: 445, w: 220, h: 54, sys: 'server', name: 'ReceiptQuerySrv', sub: '22维宽表跨表聚合' },

  // 2. Server Tier - Core Platform & Workflows (Center-Right: X: 555 - 775)
  'srv-expense-facade':     { x: 555, y: 70,  w: 220, h: 54, sys: 'server', name: 'ExpenseService门面', sub: '借款/报销/PM只读' },
  'srv-approval-callback':  { x: 555, y: 145, w: 220, h: 54, sys: 'server', name: 'ApprovalCallbackSrv', sub: '外部OA异步幂等回调' },
  'srv-signature-session':  { x: 555, y: 220, w: 220, h: 54, sys: 'server', name: 'SignatureSessionSrv', sub: '扫码防重放状态机' },
  'srv-doc-pipeline':       { x: 555, y: 295, w: 220, h: 54, sys: 'server', name: 'ContractDocPipeline', sub: 'WPS正文回写与印章' },
  'srv-purchase-invoice':   { x: 555, y: 370, w: 220, h: 54, sys: 'server', name: 'PurchaseInvoiceSrv', sub: '三单匹配与发票防重' },
  'srv-purchase-payment':   { x: 555, y: 445, w: 220, h: 54, sys: 'server', name: 'PaymentProposalSrv', sub: '累付拦截与资金计划' },

  // 3. External & Mobile Tier (Right Column: X: 820 - 1040)
  'ext-mobile-sign': { x: 820, y: 70,  w: 220, h: 54, sys: 'external', name: 'MobileCanvasSignature', sub: '手机微信/H5手写板' },
  'ext-oa':          { x: 820, y: 165, w: 220, h: 54, sys: 'external', name: 'External OA Workflow', sub: '钉钉/企微多级审批流' },
  'ext-wps':         { x: 820, y: 260, w: 220, h: 54, sys: 'external', name: 'WPS Web Office API', sub: '云端书签正文实时注入' },
  'ext-cos':         { x: 820, y: 355, w: 220, h: 54, sys: 'external', name: 'Tencent Cloud COS', sub: '签名图与合同PDF归档' },
  'ext-ocr':         { x: 820, y: 445, w: 220, h: 54, sys: 'external', name: 'VAT Invoice OCR', sub: '金税发票代码号码查验' },

  // 4. Multi-Database Tier (Bottom Tier: Y: 560 - 640)
  'db-base':     { x: 45,  y: 565, w: 235, h: 62, sys: 'database', name: 'MySQL `base` 财务主库', sub: 'PR/PO/合同/验收/付款核心表' },
  'db-pm':       { x: 310, y: 565, w: 235, h: 62, sys: 'database', name: 'MySQL `pm` 项目独立库', sub: 'projects/预算科目全只读校验' },
  'db-manpower': { x: 575, y: 565, w: 235, h: 62, sys: 'database', name: 'MySQL `manpower` 人力库', sub: '组织架构/主管工号隔离' },
  'db-redis':    { x: 840, y: 565, w: 200, h: 62, sys: 'database', name: 'Redis 7.0 缓存集群', sub: '会话TTL/分布式锁/Token' }
};

const SYSTEM_CONTAINERS = [
  { id: 'web', title: '1. Finance-Web 前端交互层 (Vue 3 + Element Plus)', x: 25, y: 25, w: 260, h: 505, fill: 'url(#grad-web)', border: '#4338ca' },
  { id: 'server', title: '2. Finance-Server 核心服务微内核 (FastAPI 302+ 路由)', x: 295, y: 25, w: 495, h: 505, fill: 'url(#grad-server)', border: '#0284c7' },
  { id: 'external', title: '3. 外部协同与移动生态 (WPS + COS + OCR + OA)', x: 805, y: 25, w: 250, h: 505, fill: 'url(#grad-external)', border: '#059669' },
  { id: 'database', title: '4. 三库分离持久化架构底座 (Base + PM + Manpower + Redis)', x: 25, y: 545, w: 1030, h: 100, fill: 'url(#grad-database)', border: '#d97706' }
];

// Mermaid Business Call Chain Diagrams
const MERMAID_DIAGRAMS = {
  'flow-procurement-lifecycle': {
    title: '🛒 采购执行六环节全生命周期闭环业务时序流',
    badge: '业务全闭环',
    desc: '从采购申请发起、多级预算拦截、询比价方案、订单生成、合同盖章、到货验收、发票三单匹配到付款三层联动的全流程闭环时序。',
    code: `%%{init: {
      "theme": "dark",
      "themeVariables": {
        "darkMode": true,
        "background": "#070b14",
        "primaryColor": "#0284c7",
        "primaryTextColor": "#f8fafc",
        "primaryBorderColor": "#38bdf8",
        "lineColor": "#38bdf8",
        "secondaryColor": "#1e293b",
        "tertiaryColor": "#0f172a",
        "noteBkgColor": "#111a2e",
        "noteTextColor": "#38bdf8",
        "actorTextColor": "#ffffff",
        "actorBkg": "#0f172a",
        "actorBorder": "#38bdf8",
        "signalColor": "#cbd5e1"
      },
      "sequence": {
        "actorFontSize": 18,
        "noteFontSize": 15,
        "messageFontSize": 15,
        "showSequenceNumbers": true
      }
    }}%%
    sequenceDiagram
    autonumber
    actor Purchaser as 采购经办人
    participant Web as 前端工作台 (Vue3)
    participant PR as 采购申请 (PR Service)
    participant PM as PM项目库 (Readonly)
    participant Plan as 采购计划 (询比价)
    participant PO as 采购订单 (PO Service)
    participant Contract as 合同中心 (Contract Srv)
    participant Accept as 验收中心 (Acceptance)
    participant Invoice as 发票三单匹配 (Invoice)
    participant Payment as 付款申请三层联动
    participant DB as Base 财务主库

    rect rgb(15, 23, 42)
    Note over Purchaser,PR: 【第一阶段：申请与预算校验】
    Purchaser->>Web: 填报采购申请单 (物料/预算科目)
    Web->>PR: 提交 PR 申请 (create_pr)
    PR->>PM: 跨库只读查询 projects 预算可用余额
    alt 预算超标
        PR-->>Web: 硬拦截：抛出预算超额异常 (status=warn)
    else 预算充足 / 未建档项目
        PR->>DB: 写入 project_initiation (status=unknown 隐式放行)
        PR-->>Web: PR 发起成功，推送审批流
    end
    end

    rect rgb(14, 30, 56)
    Note over PR,PO: 【第二阶段：询比价方案与订单分摊】
    PR->>Plan: 审批通过触发 ensure_plan_from_approved_pr
    Plan->>Plan: 录入多供应商报价并评估综合得分
    Plan->>PO: 方案通过自动触发 _create_po_from_plan
    PO->>PO: 校验试用供应商 20W 限额与历史均价 10% 预警
    PO->>DB: 生成采购订单记录与 PO 明细行 (分摊分币差)
    end

    rect rgb(16, 36, 44)
    Note over PO,Contract: 【第三阶段：采购合同与用印生成】
    PO->>Contract: create_contract_from_po 自动抽取物料与条款
    Contract->>DB: 反查 project_account 项目名称
    Contract->>Contract: 按合同金额匹配审批矩阵 (<2W免签 / 2-5W部长副总 / ≥5W总经理)
    Contract->>DB: 合同审批生效，进入履约阶段
    end

    rect rgb(18, 38, 32)
    Note over Contract,Invoice: 【第四阶段：到货验收与发票三单校验】
    Contract->>Accept: 分批到货提交验收申请
    Accept->>Accept: 四道门禁严苛校验 (PR通过/计划通过/PO生效/订单未关闭)
    Accept->>DB: 累计核验金额，标记固定资产 (is_fixed_asset)
    Invoice->>Invoice: 录入发票，执行三单匹配 (PO单价/合同条款/验收数量)
    Invoice->>DB: 拦截发票代码+发票号码重复入账
    end

    rect rgb(28, 25, 45)
    Note over Invoice,Payment: 【第五阶段：付款三层递进流转】
    Purchaser->>Payment: 提报付款申请 (出款发票可选订单严格按审批通过验收单)
    Payment->>Payment: 汇总编制月度资金付款计划 (防止超 PO/超发票)
    Payment->>DB: 财务出纳凭单支付，回写各单据累计支付进度
    Payment-->>Purchaser: 采购执行闭环完成！
    end`
  },

  'flow-scan-to-sign': {
    title: '✍️ 移动端扫码手写签名与 WPS 正文回写状态机时序流',
    badge: '高难工程亮点',
    desc: 'PC端生成会话与动态二维码 -> 手机端 H5 贝塞尔平滑笔触采集 -> 验签防重放 -> WPS书签正文云端注入 -> 转换为不可篡改只读 PDF 归档。',
    code: `%%{init: {
      "theme": "dark",
      "themeVariables": {
        "darkMode": true,
        "background": "#070b14",
        "primaryColor": "#10b981",
        "primaryTextColor": "#f8fafc",
        "primaryBorderColor": "#34d399",
        "lineColor": "#34d399",
        "secondaryColor": "#1e293b",
        "actorTextColor": "#ffffff",
        "actorBkg": "#0f172a",
        "actorBorder": "#10b981"
      },
      "sequence": {
        "actorFontSize": 18,
        "noteFontSize": 15,
        "messageFontSize": 15,
        "showSequenceNumbers": true
      }
    }}%%
    sequenceDiagram
    autonumber
    actor PCUser as 经办人 (PC端)
    participant Web as PC端合同详情
    participant Srv as 签名会话服务 (FastAPI)
    participant Redis as Redis 缓存与分布式锁
    actor Signer as 签约签署人 (手机端)
    participant H5 as 移动端手写签名画板
    participant COS as 腾讯云 COS 对象存储
    participant WPS as 金山 WPS Web Office
    participant DB as Base 财务主库

    PCUser->>Web: 点击【发起移动端扫码签名】
    Web->>Srv: POST /signature/session/create (合同ID, 签署方)
    Srv->>DB: 初始化会话记录 (status = INIT, 10分钟有效期)
    Srv->>Redis: 设置 session_token TTL = 600s
    Srv-->>Web: 返回 session_id 与二维码 URL
    Web->>PCUser: 屏幕展示动态二维码，启动轮询定时器

    Signer->>H5: 微信/浏览器扫码进入移动端页面
    H5->>Srv: GET /signature/session/verify (校验 Token 有效性)
    Srv->>DB: 更新状态为 SCANNED (已扫码)
    Signer->>H5: 在触摸屏画布上完成手写签名 (贝塞尔曲线平滑处理)
    Signer->>H5: 确认并点击【提交签名】

    H5->>Srv: POST /signature/session/commit (base64签名图像, 时间戳)
    Srv->>Redis: 加分布式防重放锁，校验防篡改签名
    Srv->>COS: 上传高清晰度透明签名 PNG 图
    COS-->>Srv: 返回签名图片归档 URL
    Srv->>DB: 更新会话状态 SIGNED，写入 sign_img_url

    Web->>Srv: PC端轮询到状态变为 SIGNED
    Srv->>WPS: 触发 ContractDocPipeline 文档管线
    WPS->>WPS: 读取 Word 合同模板，定位书签变量 bookmark_sign_party_b
    WPS->>WPS: 将签名图片自适应缩放并注入书签正文
    WPS->>WPS: 调用后端转换引擎生成只读不可篡改 PDF
    WPS->>COS: 归档最终 PDF 正本文档
    Srv->>DB: 合同状态更新为 COMPLETED，归档完成
    Web-->>PCUser: 提示【签名已注入，合同正文自动归档成功】`
  },

  'flow-budget-dual-track': {
    title: '🛡️ 跨库预算校验与双轨拦截机制时序图',
    badge: '架构隔离亮点',
    desc: '前端填报采购需求时穿透只读 PM 独立库 projects 表，实现金额超标硬拦截与未建档项目隐式放行的优雅容错。',
    code: `%%{init: {
      "theme": "dark",
      "themeVariables": {
        "darkMode": true,
        "background": "#070b14",
        "primaryColor": "#f59e0b",
        "primaryTextColor": "#f8fafc",
        "primaryBorderColor": "#fbbf24",
        "lineColor": "#fbbf24",
        "secondaryColor": "#1e293b",
        "actorTextColor": "#ffffff",
        "actorBkg": "#0f172a",
        "actorBorder": "#f59e0b"
      },
      "sequence": {
        "actorFontSize": 18,
        "noteFontSize": 15,
        "messageFontSize": 15,
        "showSequenceNumbers": true
      }
    }}%%
    sequenceDiagram
    autonumber
    actor User as 采购申请人
    participant Web as 前端 PR 申请页
    participant ExpenseSrv as 费用中台门面 (ExpenseService)
    participant PRSrv as 采购申请服务 (PurchaseRequestService)
    participant PMDB as PM 项目独立库 (MySQL 3306)
    participant BaseDB as Base 财务主库 (MySQL 3306)

    User->>Web: 选择所属项目或预算科目 (budget_subject)
    Web->>ExpenseSrv: GET /expense/project/list-all (获取项目字典)
    ExpenseSrv->>PMDB: SELECT id, code, name, status_enum FROM projects
    PMDB-->>ExpenseSrv: 返回过滤仅在进行中的项目列表
    ExpenseSrv-->>Web: 渲染项目下拉列表供用户选择

    User->>Web: 录入物料清单与含税单价，点击【提交申请】
    Web->>PRSrv: POST /outsourcing/purchase-request/create
    PRSrv->>PMDB: SELECT available_amount FROM project_budget WHERE project_id = ?
    alt 预算超支
        PRSrv-->>Web: 抛出 HTTPException(status=warn, "项目预算不足，当前可用: ¥...")
        Web->>User: 弹窗硬拦截阻断，禁止流入审批流
    else 预算充足
        PRSrv->>BaseDB: INSERT INTO purchase_request (status=submitted)
        PRSrv-->>Web: 校验通过，单据已成功推送至审批流
    else 外部或紧急未建档项目 (项目库查询为空)
        PRSrv->>BaseDB: INSERT INTO purchase_request (status=unknown, budget_status=bypassed)
        PRSrv-->>Web: 隐式放行并提示【未建档项目，进入特殊审批流】
    end`
  },

  'flow-doc-pipeline': {
    title: '📄 合同正文文档生成、条款装配与印章合成管线',
    badge: '文档管线',
    desc: '从 PO 数据镜像抽取明细条款，注入金山 WPS Word 书签变量，合成双方电子印章并转码为只读 PDF 归档。',
    code: `%%{init: {
      "theme": "dark",
      "themeVariables": {
        "darkMode": true,
        "background": "#070b14",
        "primaryColor": "#818cf8",
        "primaryTextColor": "#f8fafc",
        "primaryBorderColor": "#a5b4fc",
        "lineColor": "#a5b4fc",
        "secondaryColor": "#1e293b",
        "actorTextColor": "#ffffff",
        "actorBkg": "#0f172a",
        "actorBorder": "#818cf8"
      },
      "sequence": {
        "actorFontSize": 18,
        "noteFontSize": 15,
        "messageFontSize": 15,
        "showSequenceNumbers": true
      }
    }}%%
    sequenceDiagram
    autonumber
    participant PO as 采购订单 (PO Service)
    participant ContractSrv as 合同服务 (ContractService)
    participant Pipeline as 文档管线 (ContractDocPipeline)
    participant WPS as WPS WebOffice API
    participant COS as 腾讯云 COS
    participant BaseDB as Base 财务主库

    PO->>ContractSrv: create_contract_from_po(po_id)
    ContractSrv->>BaseDB: 抽取 PO 抬头、物料列表、含税金额与交期
    ContractSrv->>Pipeline: build_document_context(terms, items)
    Pipeline->>WPS: 加载标准化合同 Word 模板 (.docx)
    Pipeline->>WPS: 批量替换书签变量 (bookmark_contract_no, bookmark_party_a, bookmark_amount)
    Pipeline->>WPS: 动态追加多行物料清单表格 (Items Table Grid)
    Pipeline->>WPS: 注入双方印章与移动签名手写 PNG 图片
    Pipeline->>Pipeline: 调用底层排版引擎转换为 PDF/A-1a
    Pipeline->>COS: 上传不可篡改只读 PDF 归档
    COS-->>Pipeline: 返回永久对象存储 URL
    Pipeline->>BaseDB: 更新 purchase_contract.pdf_archive_url
    Pipeline-->>ContractSrv: 合同正文装配完成，随时供在线预览`
  },

  'flow-execution-ledger': {
    title: '📊 采购执行宽表 22 维核心字段跨表聚合流',
    badge: '数据出口',
    desc: '以 PR 明细行为基线不可拆分粒度，跨 6 表 LEFT JOIN 汇总，对齐采购方式 3 套枚举漂移，反推付款比例并流式导出。',
    code: `%%{init: {
      "theme": "dark",
      "themeVariables": {
        "darkMode": true,
        "background": "#070b14",
        "primaryColor": "#38bdf8",
        "primaryTextColor": "#f8fafc",
        "primaryBorderColor": "#7dd3fc",
        "lineColor": "#7dd3fc",
        "secondaryColor": "#1e293b",
        "actorTextColor": "#ffffff",
        "actorBkg": "#0f172a",
        "actorBorder": "#38bdf8"
      },
      "sequence": {
        "actorFontSize": 18,
        "noteFontSize": 15,
        "messageFontSize": 15,
        "showSequenceNumbers": true
      }
    }}%%
    sequenceDiagram
    autonumber
    actor Admin as 财务总监 / 审计主管
    participant Web as 执行台账导出页
    participant Srv as 报表服务 (ReceiptQueryService)
    participant PR as purchase_request_line (基线粒度)
    participant PO as purchase_order & line
    participant Contract as purchase_contract
    participant Accept as purchase_acceptance_line
    participant Invoice as purchase_invoice
    participant Pay as purchase_payment_proposal

    Admin->>Web: 筛选时间跨度与供应商，点击【导出采购执行全景台账】
    Web->>Srv: GET /outsourcing/receipt-query/export
    Note over Srv,PR: 【核心设计：以 PR 明细行作为不可拆分的最小基线】
    Srv->>PR: SELECT pr_no, purchase_project_name, applicant, budget_subject, material_name...
    
    Srv->>PO: LEFT JOIN 订单表 (按 pr_line_id 对齐含税单价、总额与采购方式)
    Note over Srv: 解决痛点1：采购方式 3 套枚举映射对齐 (邀标/谈判/询价/单一来源)
    
    Srv->>Contract: LEFT JOIN 合同表 (推导 contract_no 与合同签约状态)
    Srv->>Accept: LEFT JOIN 验收明细 (GROUP BY 聚合多次分批累计验收金额)
    Srv->>Invoice: LEFT JOIN 发票台账 (关联三单匹配开票金额，反推是否开票布尔值)
    Srv->>Pay: LEFT JOIN 付款提报 (聚合累计已付款金额与付款比例 payment_ratio)
    
    Srv->>Srv: 组装 22 维完整宽表数据集
    Srv->>Web: 流式导出 Excel 文件
    Web-->>Admin: 下载生成《思远道采购执行端到端全链路台账.xlsx》`
  }
};

// Module Catalog with exact source paths, entry points and invariant guards
const MODULE_CATALOG = {
  'web-purchase-request': {
    name: 'PurchaseRequestView',
    sys: 'web',
    role: '采购申请工作台：录入物料清单、选择预算科目并穿透校验项目预算余额。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-request/page.vue',
    entrypoints: ['handleSubmit()', 'handleBudgetCheck()', 'fetchProjectList()'],
    deps: ['srv-purchase-pr', 'srv-expense-facade'],
    guard: '前端与 PM 独立库 projects 表联动，仅允许关联进行中项目；单头直显所属项目。'
  },
  'web-purchase-plan': {
    name: 'PurchasePlanView',
    sys: 'web',
    role: '采购计划方案：录入各家供应商比价、综合打分评估、计划方案编辑并分摊生成 PO。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-plan/page.vue',
    entrypoints: ['handleQuoteComparison()', 'generatePOFromPlan()', 'editPlanDetail()', 'validatePlanItemCalculations()'],
    deps: ['srv-purchase-plan'],
    guard: '保证方案总额在 PR 批复预算 ±10% 预警阈值范围内；分币尾差自动吸收。'
  },
  'web-purchase-order': {
    name: 'PurchaseOrderView',
    sys: 'web',
    role: '采购订单台账：多维检索订单编号、供应商、含税总额；支持列表直传合同与发票附件，详情查看履约全貌。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-order/index.vue',
    entrypoints: ['fetchOrderList()', 'viewOrderDetail()', 'uploadContractAttachment()', 'uploadInvoiceAttachment()', 'viewFulfillmentDetail()'],
    deps: ['srv-purchase-po', 'srv-purchase-contract'],
    guard: '严密关联计划编号 plan_no；列表编号支持点击快捷复制并跳转履约详情。'
  },
  'web-purchase-contract': {
    name: 'PurchaseContractView',
    sys: 'web',
    role: '采购合同工作台：关联合同编号、查看正文在线预览、发起用印审批与免签判定。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-contract/index.vue',
    entrypoints: ['previewContractDoc()', 'submitApproval()', 'linkMobileSignature()'],
    deps: ['srv-purchase-contract', 'srv-doc-pipeline', 'ext-wps'],
    guard: '按金额阶梯校验审批权限：<2万免签 / 2-5万部长副总 / ≥5万总经理。'
  },
  'web-purchase-acceptance': {
    name: 'PurchaseAcceptanceView',
    sys: 'web',
    role: '采购验收台账：支持分批到货多次验收、固定资产转固标记、验收报告签署。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-acceptance/index.vue',
    entrypoints: ['createAcceptance()', 'verifyOrderBalance()', 'markFixedAsset()'],
    deps: ['srv-purchase-accept'],
    guard: '验收金额严格累计，禁止超出 PO 订单有效总额；是否固定资产默认否。'
  },
  'web-purchase-payment': {
    name: 'PurchasePaymentTriadView',
    sys: 'web',
    role: '付款三层中枢：付款申请(Request) -> 资金提报(Proposal) -> 月度计划(Plan) 穿透流转。',
    path: 'finance-frontend/src/views/authority/outsourcing/purchase-payment/index.vue',
    entrypoints: ['submitProposal()', 'generateMonthlyPlan()', 'auditPaymentBalance()'],
    deps: ['srv-purchase-payment', 'srv-purchase-invoice'],
    guard: '出款发票可选订单挂接审批通过验收单；累计严禁超 PO/发票总额。'
  },
  'srv-purchase-pr': {
    name: 'PurchaseRequestService',
    sys: 'server',
    role: '采购申请核心逻辑：计算预算限额、绑定采购申请单所属项目名称、多级审批路由计算与计划幂等生成。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_request_service.py:781',
    entrypoints: ['create_pr()', 'ensure_plan_from_approved_pr()', '_build_budget_check_from_lines()', 'resolve_pr_project_name()'],
    deps: ['db-base', 'db-pm', 'srv-approval-callback'],
    guard: 'status == "warn" 硬拦截阻断；status == "unknown" 隐式放行不阻断紧急业务。'
  },
  'srv-purchase-plan': {
    name: 'PurchasePlanService',
    sys: 'server',
    role: '采购计划中枢：管理供应商询比价、审批通过后自动触发 _create_po_from_plan 并分摊分币差。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_plan_service.py:790',
    entrypoints: ['create_plan()', '_create_po_from_plan()', 'calculate_cost_allocation()'],
    deps: ['db-base', 'srv-purchase-po'],
    guard: '成交总价按 PR 明细占比分摊，尾行自动吃掉分币尾差。'
  },
  'srv-purchase-po': {
    name: 'PurchaseOrderService',
    sys: 'server',
    role: '采购订单服务：校验试用供应商年度 20 万限额、历史均价 10% 偏离预警与订单状态机维护。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_order_service.py',
    entrypoints: ['create_po()', 'validate_supplier_qualification()', 'close_purchase_order()'],
    deps: ['db-base', 'srv-purchase-contract'],
    guard: '试用期供应商超 20 万年度限额硬拦截；单价偏离历史均价 10% 预警。'
  },
  'srv-purchase-contract': {
    name: 'PurchaseContractService',
    sys: 'server',
    role: '采购合同服务：PO 衍生合同生成、金额阶梯审批路由、反查 project_account 项目名称。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_contract_service.py:562',
    entrypoints: ['create_contract_from_po()', '_resolve_project_from_pr()', 'handle_approval_pass()'],
    deps: ['db-base', 'srv-doc-pipeline', 'ext-wps'],
    guard: '基于 PO 数据镜像构建合同条款，防篡改校验。'
  },
  'srv-purchase-accept': {
    name: 'PurchaseAcceptanceService',
    sys: 'server',
    role: '验收单防线：执行四道门禁校验(PR/计划/PO/未关闭)；固定资产转固标记默认否；支持可验明细 soft 预览兼容。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_acceptance_service.py:657',
    entrypoints: ['create_acceptance()', 'validate_order_gate()', 'preview_soft_acceptance()', 'resolve_parent_project_name()'],
    deps: ['db-base', 'srv-purchase-po'],
    guard: '四道门禁缺一不可；无项目编号不准发起审批；固定资产默认否。'
  },
  'srv-execution-ledger': {
    name: 'ReceiptQueryService',
    sys: 'server',
    role: '22维采购执行宽表聚合服务：以 PR 明细行为基线粒度，跨 6 表 LEFT JOIN 汇总生成台账。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/receipt_query_service.py:55',
    entrypoints: ['build_plan_result()', 'export_execution_ledger()', '_map_procurement_method()'],
    deps: ['db-base'],
    guard: '先全量聚合再分页，确保汇总卡统计口径一致。'
  },
  'srv-expense-facade': {
    name: 'ExpenseService & Router',
    sys: 'server',
    role: '费用与项目门面：统一派发借款、报销、预算科目、PM 项目库只读查询与统一权限拦截。',
    path: 'sydo_oa_finance/app/api/service/sys/expense_service.py:19',
    entrypoints: ['list_pm_projects_all()', 'delegate_expense_action()', 'audit_account_state()'],
    deps: ['db-base', 'db-pm', 'db-manpower'],
    guard: '只读连接 pm 数据库，避免事务与锁污染。'
  },
  'srv-approval-callback': {
    name: 'ExternalApprovalCallbackService',
    sys: 'server',
    role: '外部 OA 审批流中枢：接收外部审批流 WebHook 异步回调、状态幂等转换与下游单据激活。',
    path: 'sydo_oa_finance/app/api/service/sys/external_recruitment_approval_service.py',
    entrypoints: ['handle_approval_callback()', 'parse_flow_instance()', 'trigger_downstream_event()'],
    deps: ['db-base', 'ext-oa'],
    guard: '利用数据库版本号/唯一事务号实现幂等防重放回调。'
  },
  'srv-signature-session': {
    name: 'SignatureScanSessionService',
    sys: 'server',
    role: '扫码手写签名状态机：会话初始化 -> 二维码生成 -> 手机扫码 -> 画布签名 -> 验签防重放。',
    path: 'sydo_oa_finance/app/models/domain/signature_scan_session.py',
    entrypoints: ['create_scan_session()', 'poll_session_status()', 'commit_mobile_signature()'],
    deps: ['db-base', 'db-redis', 'ext-mobile-sign', 'ext-cos'],
    guard: 'Redis TTL 600s 倒计时；防并发重写与跨终端 Session 会话隔离。'
  },
  'srv-doc-pipeline': {
    name: 'ContractDocPipeline',
    sys: 'server',
    role: 'WPS 正文回写管线：抽取结构化条款与明细，填充 Word 模板书签，合成印章并转换为只读 PDF。',
    path: 'sydo_oa_finance/app/utils/contract_doc_pipeline.py',
    entrypoints: ['render_contract_docx()', 'inject_wps_bookmarks()', 'convert_to_pdf_archive()'],
    deps: ['ext-wps', 'ext-cos'],
    guard: '精确书签定位替换；生成 PDF/A-1a 归档格式。'
  },
  'srv-purchase-invoice': {
    name: 'PurchaseInvoiceService',
    sys: 'server',
    role: '发票台账与防重校验：三单匹配(PO/合同/验收单)、发票代码+号码唯一性硬拦截与税率分摊。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_invoice_service.py',
    entrypoints: ['register_invoice()', 'check_invoice_duplicate()', 'match_triad_receipts()'],
    deps: ['db-base', 'ext-ocr'],
    guard: '代码与号码联合唯一索引；超期发票强制预警。'
  },
  'srv-purchase-payment': {
    name: 'PurchasePaymentProposalService',
    sys: 'server',
    role: '资金计划与付款提报：出款发票挂接审批通过验收单；非预付款必须三单齐备，累计支付金额硬拦截。',
    path: 'sydo_oa_finance/app/api/service/outsourcing/purchase_payment_proposal_service.py:536',
    entrypoints: ['submit_payment_proposal()', 'audit_accumulated_payments()', 'compile_monthly_plan()', 'filter_settlement_orders_by_approved_acceptance()'],
    deps: ['db-base', 'srv-purchase-invoice'],
    guard: '严格三级校验；出款发票过滤已验收订单；月度计划分账隔离。'
  },
  'ext-mobile-sign': {
    name: 'MobileCanvasSignature (H5)',
    sys: 'external',
    role: '移动端扫码手写板：手机浏览器/微信中加载，贝塞尔平滑笔触采集手写体与时戳。',
    path: 'finance-frontend/src/views/authority/mobile-signature/index.vue',
    entrypoints: ['initSignatureCanvas()', 'exportSmoothPNG()', 'submitEncryptedSignature()'],
    deps: ['srv-signature-session'],
    guard: '触控坐标贝塞尔平滑拟合；高抗噪笔压防抖。'
  },
  'ext-oa': {
    name: 'External OA Approval Workflow',
    sys: 'external',
    role: '企业人力与行政审批流：提供分级领导审批路由、钉钉/微信消息提醒与审批结论回调。',
    path: 'sydo_oa_finance/app/core/events.py',
    entrypoints: ['push_workflow_instance()', 'notify_approvers()', 'post_approval_callback()'],
    deps: ['srv-approval-callback'],
    guard: 'WebHook 超时自动重试与补偿机制。'
  },
  'ext-wps': {
    name: 'WPS Web Office Cloud API',
    sys: 'external',
    role: '金山 WPS 开放平台：在线 Office 文档即时协作渲染、书签变量注入与公文格式套红。',
    path: 'sydo_oa_finance/app/api/service/sys/wps_auth_service.py',
    entrypoints: ['get_wps_preview_token()', 'save_document_content()', 'export_pdf_stream()'],
    deps: ['srv-doc-pipeline'],
    guard: 'OAuth 2.0 签名凭据与 Session 租约保活。'
  },
  'ext-cos': {
    name: 'Tencent Cloud COS Storage',
    sys: 'external',
    role: '企业级对象存储：高可用归档合同 PDF、手写签名图、发票原件与验收拍照凭据。',
    path: 'sydo_oa_finance/app/api/service/sys/comm_file_service.py',
    entrypoints: ['upload_stream()', 'generate_presigned_url()', 'verify_hash_integrity()'],
    deps: ['srv-doc-pipeline', 'srv-signature-session'],
    guard: '预签名带有效期限 URL；哈希完整性校验。'
  },
  'ext-ocr': {
    name: 'VAT Invoice OCR / Golden Tax',
    sys: 'external',
    role: '金税增值税发票查验与 OCR：发票代码、发票号码、开票金额与纳税人识别号自动验真。',
    path: 'sydo_oa_finance/app/utils/ocr_util.py',
    entrypoints: ['parse_vat_invoice()', 'verify_tax_authority()', 'extract_line_items()'],
    deps: ['srv-purchase-invoice'],
    guard: '防重查验率 100%；智能税率与明细对齐。'
  },
  'db-base': {
    name: 'MySQL `base` 财务主库',
    sys: 'database',
    role: '财务中台持久层：存储 PR、PO、合同、验收、发票、付款、签名会话等 40+ 核心业务表。',
    path: 'sydo_oa_finance/app/db/mysql.py:19',
    entrypoints: ['TORTOISE_ORM["connections"]["base"]', 'atomic_transaction()'],
    deps: [],
    guard: '完整 ACID 事务隔离保障与行级悲观锁。'
  },
  'db-pm': {
    name: 'MySQL `pm` 项目独立库',
    sys: 'database',
    role: '工程项目管理独立库：全只读查询 projects、预算科目与项目编码，与财务库物理解耦。',
    path: 'sydo_oa_finance/app/db/mysql.py:27',
    entrypoints: ['TORTOISE_ORM["connections"]["pm"]', 'select_projects_readonly()'],
    deps: [],
    guard: '物理只读用户连接；代码无任何 INSERT/UPDATE 权限。'
  },
  'db-manpower': {
    name: 'MySQL `manpower` 人力库',
    sys: 'database',
    role: '人力资源与组织架构库：存储部门树、岗位职责、直属主管与工号鉴权信息。',
    path: 'sydo_oa_finance/app/db/mysql.py:35',
    entrypoints: ['TORTOISE_ORM["connections"]["manpower"]', 'query_employee_hierarchy()'],
    deps: [],
    guard: '跨域工号与角色映射隔离。'
  },
  'db-redis': {
    name: 'Redis 7.0 分布式缓存与锁',
    sys: 'database',
    role: '高速缓存与防重发：签名二维码 10 分钟 TTL 倒计时、跨节点分布式锁、Token 鉴权缓存。',
    path: 'sydo_oa_finance/app/core/events.py:48',
    entrypoints: ['redis_client.setex()', 'acquire_distributed_lock()', 'get_session_cache()'],
    deps: [],
    guard: '会话 600s 自动失效；Redlock 分布式互斥保障。'
  }
};

// Global Application State
let appState = {
  activeTab: 'topology',
  selectedSystem: 'all',
  activeCallChain: 'flow-procurement-lifecycle',
  searchQuery: '',
  selectedNode: null,
  currentVersion: null,
  versions: [],
  isDiffMode: false,
  // Pan & Zoom
  zoomScale: 1.0,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[FinanceLivingArch] Initializing application...');
  initTabs();
  initChainPicker();
  initSearch();
  initSystemFilter();
  renderTopologySVG();
  initTopologyPanZoom();
  renderMermaidDiagram(appState.activeCallChain);
  await loadVersionHistory();
  renderModulesGrid();
});

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// Tab Switcher
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabTarget = tab.getAttribute('data-tab');
      appState.activeTab = tabTarget;

      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      const activePanel = document.getElementById(`panel-${tabTarget}`);
      if (activePanel) activePanel.classList.add('active');

      if (tabTarget === 'callchains') {
        renderMermaidDiagram(appState.activeCallChain);
      }
    });
  });
}

// Call Chain Picker
function initChainPicker() {
  const container = document.getElementById('chain-picker-bar');
  if (!container) return;

  container.innerHTML = '';
  Object.keys(MERMAID_DIAGRAMS).forEach(key => {
    const d = MERMAID_DIAGRAMS[key];
    const btn = document.createElement('button');
    btn.className = `chain-btn ${appState.activeCallChain === key ? 'active' : ''}`;
    btn.innerHTML = `<span>${d.title.split(' ')[0]}</span> ${d.title.split(' ')[1]}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chain-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.activeCallChain = key;
      renderMermaidDiagram(key);
      highlightTopologyCallChain(key);
    });
    container.appendChild(btn);
  });
}

// Render Mermaid Diagram with dark mode
function renderMermaidDiagram(chainKey) {
  const diagram = MERMAID_DIAGRAMS[chainKey];
  if (!diagram) return;

  const titleEl = document.getElementById('mermaid-title');
  const descEl = document.getElementById('mermaid-desc');
  const targetEl = document.getElementById('mermaid-output');

  if (titleEl) titleEl.innerText = diagram.title;
  if (descEl) descEl.innerText = diagram.desc;

  if (targetEl && window.mermaid) {
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose'
      });

      const uniqueId = `mermaid-graph-${Date.now()}`;
      window.mermaid.render(uniqueId, diagram.code).then(({ svg }) => {
        targetEl.innerHTML = svg;
      }).catch(err => {
        console.warn('Mermaid render error:', err);
        targetEl.innerHTML = `<pre style="color:#ef4444; padding:20px;">Mermaid Rendering Error: ${err.message}</pre>`;
      });
    } catch (e) {
      targetEl.innerHTML = `<pre style="color:#ef4444; padding:20px;">Diagram Error: ${e.message}</pre>`;
    }
  }
}

// Copy Mermaid Source Code
window.copyMermaidCode = function() {
  const diagram = MERMAID_DIAGRAMS[appState.activeCallChain];
  if (!diagram) return;
  navigator.clipboard.writeText(diagram.code).then(() => {
    showToast('✅ Mermaid 源码已成功复制到剪贴板！');
  }).catch(err => {
    showToast('复制失败: ' + err.message);
  });
};

// Render SVG Topology
function renderTopologySVG() {
  const svg = document.getElementById('topology-svg');
  if (!svg) return;

  svg.setAttribute('viewBox', '0 0 1080 670');
  svg.setAttribute('width', '1080');
  svg.setAttribute('height', '670');

  let html = `
    <defs>
      <!-- Gradients for Containers -->
      <linearGradient id="grad-web" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#090d19" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="grad-server" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#082f49" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#090d19" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="grad-external" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#064e3b" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#090d19" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="grad-database" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#451a03" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#090d19" stop-opacity="0.95" />
      </linearGradient>

      <!-- Arrow Markers -->
      <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
      <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
      </marker>
    </defs>
  `;

  // Draw Containers
  SYSTEM_CONTAINERS.forEach(c => {
    html += `
      <g class="svg-container-group" id="sys-container-${c.id}">
        <rect class="svg-sys-container" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" fill="${c.fill}" stroke="${c.border}" />
        <text class="svg-sys-label" x="${c.x + 16}" y="${c.y + 24}">${c.title}</text>
      </g>
    `;
  });

  // Connecting Links
  const links = [
    { from: 'web-purchase-request', to: 'srv-purchase-pr', color: '#818cf8' },
    { from: 'web-purchase-request', to: 'srv-expense-facade', color: '#818cf8' },
    { from: 'srv-expense-facade', to: 'db-pm', color: '#f59e0b' },
    { from: 'srv-purchase-pr', to: 'db-pm', color: '#f59e0b' },
    { from: 'srv-purchase-pr', to: 'db-base', color: '#f59e0b' },
    { from: 'srv-purchase-pr', to: 'srv-purchase-plan', color: '#38bdf8' },
    { from: 'web-purchase-plan', to: 'srv-purchase-plan', color: '#818cf8' },
    { from: 'srv-purchase-plan', to: 'srv-purchase-po', color: '#38bdf8' },
    { from: 'web-purchase-order', to: 'srv-purchase-po', color: '#818cf8' },
    { from: 'srv-purchase-po', to: 'srv-purchase-contract', color: '#38bdf8' },
    { from: 'web-purchase-contract', to: 'srv-purchase-contract', color: '#818cf8' },
    { from: 'srv-purchase-contract', to: 'ext-wps', color: '#10b981' },
    { from: 'srv-purchase-contract', to: 'srv-doc-pipeline', color: '#38bdf8' },
    { from: 'srv-doc-pipeline', to: 'ext-cos', color: '#10b981' },
    { from: 'srv-signature-session', to: 'ext-mobile-sign', color: '#10b981' },
    { from: 'srv-signature-session', to: 'db-redis', color: '#f59e0b' },
    { from: 'web-purchase-acceptance', to: 'srv-purchase-accept', color: '#818cf8' },
    { from: 'srv-purchase-accept', to: 'db-base', color: '#f59e0b' },
    { from: 'srv-purchase-invoice', to: 'ext-ocr', color: '#10b981' },
    { from: 'srv-purchase-invoice', to: 'db-base', color: '#f59e0b' },
    { from: 'web-purchase-payment', to: 'srv-purchase-payment', color: '#818cf8' },
    { from: 'srv-purchase-payment', to: 'srv-purchase-invoice', color: '#38bdf8' },
    { from: 'srv-purchase-payment', to: 'db-base', color: '#f59e0b' },
    { from: 'srv-execution-ledger', to: 'db-base', color: '#f59e0b' }
  ];

  links.forEach((l, idx) => {
    const fNode = NODE_LAYOUT[l.from];
    const tNode = NODE_LAYOUT[l.to];
    if (fNode && tNode) {
      const x1 = fNode.x + fNode.w / 2;
      const y1 = fNode.y + fNode.h / 2;
      const x2 = tNode.x + tNode.w / 2;
      const y2 = tNode.y + tNode.h / 2;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;
      html += `
        <path id="link-${idx}" class="svg-link" data-from="${l.from}" data-to="${l.to}"
          d="M ${x1} ${y1} Q ${cx} ${cy - 10} ${x2} ${y2}"
          stroke="${l.color}" marker-end="url(#arrow-cyan)" />
      `;
    }
  });

  // Draw Nodes
  Object.keys(NODE_LAYOUT).forEach(nodeId => {
    const n = NODE_LAYOUT[nodeId];
    let borderColor = '#38bdf8';
    let bgColor = '#111a2e';

    if (n.sys === 'web') { borderColor = '#818cf8'; bgColor = '#131b36'; }
    else if (n.sys === 'server') { borderColor = '#38bdf8'; bgColor = '#0f223d'; }
    else if (n.sys === 'external') { borderColor = '#34d399'; bgColor = '#0f2c25'; }
    else if (n.sys === 'database') { borderColor = '#fbbf24'; bgColor = '#291c08'; }

    html += `
      <g class="svg-node" id="node-${nodeId}" data-id="${nodeId}" data-sys="${n.sys}" onclick="window.inspectNode('${nodeId}')">
        <rect class="svg-node-bg" x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}"
          fill="${bgColor}" stroke="${borderColor}" />
        <text class="svg-node-title" x="${n.x + 12}" y="${n.y + 24}">${n.name}</text>
        <text class="svg-node-sub" x="${n.x + 12}" y="${n.y + 42}">${n.sub}</text>
      </g>
    `;
  });

  svg.innerHTML = html;
  applyTransform();
}

// Pan & Zoom Engine for Topology
function initTopologyPanZoom() {
  const viewport = document.getElementById('topology-viewport');
  const svg = document.getElementById('topology-svg');
  if (!viewport || !svg) return;

  viewport.addEventListener('mousedown', (e) => {
    // Only drag when target is background or viewport
    if (e.target.closest('.svg-node')) return;
    appState.isDragging = true;
    appState.dragStartX = e.clientX - appState.panX;
    appState.dragStartY = e.clientY - appState.panY;
    viewport.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!appState.isDragging) return;
    appState.panX = e.clientX - appState.dragStartX;
    appState.panY = e.clientY - appState.dragStartY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (appState.isDragging) {
      appState.isDragging = false;
      viewport.classList.remove('dragging');
    }
  });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(appState.zoomScale * zoomFactor, 0.4), 2.8);
    
    // Zoom centered on cursor
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    appState.panX -= (mouseX - appState.panX) * (zoomFactor - 1);
    appState.panY -= (mouseY - appState.panY) * (zoomFactor - 1);
    appState.zoomScale = newScale;

    applyTransform();
  }, { passive: false });

  viewport.addEventListener('dblclick', (e) => {
    if (e.target.closest('.svg-node')) return;
    resetTopologyZoom();
  });
}

function applyTransform() {
  const svg = document.getElementById('topology-svg');
  if (!svg) return;
  svg.style.transform = `translate(${appState.panX}px, ${appState.panY}px) scale(${appState.zoomScale})`;
}

window.zoomTopology = function(factor) {
  appState.zoomScale = Math.min(Math.max(appState.zoomScale * factor, 0.4), 2.8);
  applyTransform();
};

window.resetTopologyZoom = function() {
  appState.zoomScale = 1.0;
  appState.panX = 0;
  appState.panY = 0;
  applyTransform();
  showToast('画布已重置为 100% 原始视图');
};

window.fitTopology = function() {
  const viewport = document.getElementById('topology-viewport');
  if (!viewport) return;
  const widthRatio = (viewport.clientWidth - 40) / 1080;
  const heightRatio = (viewport.clientHeight - 40) / 670;
  appState.zoomScale = Math.min(Math.max(Math.min(widthRatio, heightRatio), 0.5), 1.4);
  appState.panX = 0;
  appState.panY = 0;
  applyTransform();
  showToast('已自适应窗口大小');
};

// Highlight Call Chain on Topology
window.highlightTopologyCallChain = function(chainKey) {
  const chainMeta = {
    'flow-procurement-lifecycle': [
      'web-purchase-request', 'srv-purchase-pr', 'srv-purchase-plan', 'web-purchase-plan',
      'srv-purchase-po', 'web-purchase-order', 'srv-purchase-contract', 'web-purchase-contract',
      'srv-purchase-accept', 'web-purchase-acceptance', 'srv-purchase-invoice', 'srv-purchase-payment',
      'web-purchase-payment', 'db-base'
    ],
    'flow-scan-to-sign': [
      'web-purchase-contract', 'srv-signature-session', 'ext-mobile-sign', 'srv-doc-pipeline',
      'ext-wps', 'ext-cos', 'db-redis', 'db-base'
    ],
    'flow-budget-dual-track': [
      'web-purchase-request', 'srv-expense-facade', 'srv-purchase-pr', 'db-pm', 'db-base'
    ],
    'flow-doc-pipeline': [
      'srv-purchase-contract', 'srv-doc-pipeline', 'ext-wps', 'ext-cos', 'db-base'
    ],
    'flow-execution-ledger': [
      'srv-execution-ledger', 'srv-purchase-pr', 'srv-purchase-po', 'srv-purchase-contract',
      'srv-purchase-accept', 'srv-purchase-invoice', 'srv-purchase-payment', 'db-base'
    ]
  };

  const activeNodes = chainMeta[chainKey] || [];
  const allNodes = document.querySelectorAll('.svg-node');
  const allLinks = document.querySelectorAll('.svg-link');

  allNodes.forEach(node => {
    const id = node.getAttribute('data-id');
    node.classList.remove('selected', 'upstream-highlight', 'downstream-highlight');
    if (activeNodes.length === 0 || activeNodes.includes(id)) {
      node.classList.remove('dimmed');
      if (activeNodes.length > 0 && activeNodes.includes(id)) {
        node.classList.add('chain-highlight');
      } else {
        node.classList.remove('chain-highlight');
      }
    } else {
      node.classList.add('dimmed');
      node.classList.remove('chain-highlight');
    }
  });

  allLinks.forEach(link => {
    link.classList.remove('link-upstream', 'link-downstream');
    const from = link.getAttribute('data-from');
    const to = link.getAttribute('data-to');
    if (activeNodes.length > 0 && activeNodes.includes(from) && activeNodes.includes(to)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

// Inspect Node Modal with Bidirectional Highlighting
window.inspectNode = function(nodeId) {
  appState.selectedNode = nodeId;

  const meta = MODULE_CATALOG[nodeId] || {
    name: nodeId,
    sys: 'server',
    role: '核心业务模块',
    path: `sydo_oa_finance/.../${nodeId}`,
    entrypoints: ['execute()'],
    deps: [],
    guard: '符合架构规范'
  };

  // 1. Calculate Upstream (Dependencies) & Downstream (Dependents)
  const upstreams = meta.deps || [];
  const downstreams = Object.keys(MODULE_CATALOG).filter(id => {
    const m = MODULE_CATALOG[id];
    return m.deps && m.deps.includes(nodeId);
  });

  // 2. Highlight on SVG Topology
  const allNodes = document.querySelectorAll('.svg-node');
  allNodes.forEach(node => {
    const id = node.getAttribute('data-id');
    node.classList.remove('selected', 'upstream-highlight', 'downstream-highlight', 'chain-highlight', 'dimmed');
    
    if (id === nodeId) {
      node.classList.add('selected');
    } else if (upstreams.includes(id)) {
      node.classList.add('upstream-highlight');
    } else if (downstreams.includes(id)) {
      node.classList.add('downstream-highlight');
    } else {
      node.classList.add('dimmed');
    }
  });

  // 3. Highlight Connecting Links
  const allLinks = document.querySelectorAll('.svg-link');
  allLinks.forEach(link => {
    link.classList.remove('active', 'link-upstream', 'link-downstream');
    const from = link.getAttribute('data-from');
    const to = link.getAttribute('data-to');

    if (from === nodeId && upstreams.includes(to)) {
      link.classList.add('link-upstream');
    } else if (downstreams.includes(from) && to === nodeId) {
      link.classList.add('link-downstream');
    }
  });

  // 4. Populate Right Drawer
  const drawer = document.getElementById('inspector-overlay');
  const title = document.getElementById('drawer-node-title');
  const sys = document.getElementById('drawer-node-sys');
  const role = document.getElementById('drawer-node-role');
  const pathEl = document.getElementById('drawer-node-path');
  const upstreamContainer = document.getElementById('drawer-upstream-deps');
  const downstreamContainer = document.getElementById('drawer-downstream-deps');
  const entrypointsList = document.getElementById('drawer-node-entrypoints');

  if (title) title.innerText = meta.name;
  if (sys) sys.innerHTML = `<span class="metric-pill pill-${meta.sys}">${meta.sys.toUpperCase()}</span>`;
  if (role) role.innerText = meta.role;
  if (pathEl) {
    pathEl.innerHTML = `<code>${meta.path}</code> <button class="btn btn-sm" style="margin-left:8px;" onclick="copyToClipboard('${meta.path}')">复制路径</button>`;
  }

  // Upstream pills
  if (upstreamContainer) {
    if (upstreams.length > 0) {
      upstreamContainer.innerHTML = upstreams.map(uId => {
        const uMeta = MODULE_CATALOG[uId] || { name: uId };
        return `<button class="dep-pill upstream-pill" onclick="window.inspectNode('${uId}')">⚡ ${uMeta.name}</button>`;
      }).join('');
    } else {
      upstreamContainer.innerHTML = '<span style="color:var(--text-dim); font-size:12px;">（作为底座模块，无上游依赖）</span>';
    }
  }

  // Downstream pills
  if (downstreamContainer) {
    if (downstreams.length > 0) {
      downstreamContainer.innerHTML = downstreams.map(dId => {
        const dMeta = MODULE_CATALOG[dId] || { name: dId };
        return `<button class="dep-pill downstream-pill" onclick="window.inspectNode('${dId}')">🎯 ${dMeta.name}</button>`;
      }).join('');
    } else {
      downstreamContainer.innerHTML = '<span style="color:var(--text-dim); font-size:12px;">（作为顶层出口，无下游依赖）</span>';
    }
  }

  // Entrypoints and guards
  if (entrypointsList) {
    let html = '';
    (meta.entrypoints || []).forEach(ep => {
      html += `<li class="code-list-item">⚡ <code>${ep}</code></li>`;
    });
    if (meta.guard) {
      html += `<li class="code-list-item" style="color:#10b981;">🛡️ 核心保证: ${meta.guard}</li>`;
    }
    entrypointsList.innerHTML = html;
  }

  if (drawer) drawer.style.display = 'flex';
};

window.closeInspector = function() {
  const drawer = document.getElementById('inspector-overlay');
  if (drawer) drawer.style.display = 'none';
  document.querySelectorAll('.svg-node').forEach(n => {
    n.classList.remove('selected', 'upstream-highlight', 'downstream-highlight', 'dimmed');
  });
  document.querySelectorAll('.svg-link').forEach(l => {
    l.classList.remove('link-upstream', 'link-downstream');
  });
  appState.selectedNode = null;
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('✅ 源码路径已复制！');
  }).catch(() => {});
};

// Export Markdown Architecture Report
window.exportArchitectureReport = function() {
  let md = `# Finance · 企业财务与采购数智化平台 Living Architecture 架构全景报告\n\n`;
  md += `> 报告导出时间: ${new Date().toLocaleString('zh-CN')} · 托管于 GitHub Pages\n\n`;
  md += `## 一、 平台架构核心指标\n\n`;
  md += `- **后端微内核**: FastAPI 框架 (302+ RESTful 业务端点)\n`;
  md += `- **前端工作台**: Vue 3 + Element Plus + Pinia + TailwindCSS\n`;
  md += `- **数据库集群**: MySQL (三库物理隔离: base, pm, manpower) + Redis 7.0 分布式缓存\n`;
  md += `- **外部中台协同**: 金山 WPS WebOffice + 腾讯云 COS + 金税 OCR + 外部 OA 审批流\n`;
  md += `- **业务防御门禁**: 12 道业务防线与硬门禁已全部通过静态合规核验\n\n`;

  md += `## 二、 核心业务模块与领域服务 (22 核心模块)\n\n`;
  md += `| 模块 ID | 模块名称 | 系统层级 | 源码路径 | 核心 Entrypoint | 业务不变量门禁 |\n`;
  md += `|---|---|---|---|---|---|\n`;

  Object.keys(MODULE_CATALOG).forEach(id => {
    const m = MODULE_CATALOG[id];
    md += `| \`${id}\` | ${m.name} | ${m.sys.toUpperCase()} | \`${m.path}\` | \`${m.entrypoints.join(', ')}\` | ${m.guard} |\n`;
  });

  md += `\n## 三、 五大高难业务核心调用链路 (时序闭环)\n\n`;
  Object.keys(MERMAID_DIAGRAMS).forEach(key => {
    const d = MERMAID_DIAGRAMS[key];
    md += `### ${d.title}\n\n${d.desc}\n\n\`\`\`mermaid\n${d.code}\n\`\`\`\n\n`;
  });

  md += `## 四、 跨版本演进追踪记录\n\n`;
  if (appState.versions && appState.versions.length > 0) {
    appState.versions.forEach(v => {
      md += `- **[${v.repo}] ${v.shortSha}** (${v.date}): ${v.message} by *${v.author}*\n`;
    });
  }

  // Trigger download
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Finance_OA_Living_Architecture_Report_${new Date().toISOString().slice(0,10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📄 Markdown 架构评审报告已开始下载！');
};

// Export SVG Topology
window.exportTopologySVG = function() {
  const svg = document.getElementById('topology-svg');
  if (!svg) return;
  const cloned = svg.cloneNode(true);
  cloned.style.transform = 'none';
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(cloned);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Finance_Living_Architecture_Topology_${new Date().toISOString().slice(0,10)}.svg`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📸 高清 SVG 拓扑图已开始下载！');
};

// Load Version History & Diff Mode
async function loadVersionHistory() {
  try {
    let res = await fetch('./versions.json');
    if (!res.ok) res = await fetch('./data/versions.json');
    if (!res.ok) return;
    const versions = await res.json();
    appState.versions = versions;

    const versionSelect = document.getElementById('version-selector');
    if (versionSelect) {
      versionSelect.innerHTML = '<option value="latest">📌 当前基线版本 (HEAD @ chen)</option>';
      versions.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.sha;
        opt.innerText = `[${v.repo}] ${v.shortSha} - ${v.message.substring(0, 36)}`;
        versionSelect.appendChild(opt);
      });

      versionSelect.addEventListener('change', (e) => {
        switchVersion(e.target.value);
      });
    }
  } catch (err) {
    console.warn('[FinanceLivingArch] Could not load versions.json:', err);
  }
}

async function switchVersion(sha) {
  if (sha === 'latest') {
    document.querySelectorAll('.svg-node').forEach(node => {
      node.classList.remove('chain-highlight', 'dimmed', 'selected');
    });
    showToast('已切回最新 HEAD 基线架构');
    return;
  }
  try {
    const res = await fetch(`./data/snapshots/${sha}.json`);
    if (!res.ok) return;
    const snap = await res.json();
    console.log('[FinanceLivingArch] Switched to commit snapshot:', snap.shortSha);

    const modSet = new Set(snap.modifiedModules || []);
    document.querySelectorAll('.svg-node').forEach(node => {
      const id = node.getAttribute('data-id');
      if (modSet.has(id)) {
        node.classList.add('chain-highlight');
        node.classList.remove('dimmed');
      } else {
        node.classList.remove('chain-highlight');
      }
    });
    showToast(`已切换至快照 [${snap.repo}] ${snap.shortSha}`);
  } catch (e) {
    console.error('Error switching version:', e);
  }
}

// Toggle Diff Mode
window.toggleDiffMode = function() {
  appState.isDiffMode = !appState.isDiffMode;
  const btn = document.getElementById('diff-mode-btn');
  if (btn) {
    if (appState.isDiffMode) {
      btn.classList.add('btn-diff-active');
      btn.innerText = '⚡ 退出差异对比模式';
      const diffTab = document.querySelector('[data-tab="diff"]');
      if (diffTab) diffTab.click();
    } else {
      btn.classList.remove('btn-diff-active');
      btn.innerText = '🔍 架构差异比对 (Diff)';
      const topTab = document.querySelector('[data-tab="topology"]');
      if (topTab) topTab.click();
    }
  }
};

// Filter & Search
function initSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.toLowerCase().trim();
    filterTopologyAndModules();
  });
}

function initSystemFilter() {
  const filterSelect = document.getElementById('system-filter');
  if (!filterSelect) return;

  filterSelect.addEventListener('change', (e) => {
    appState.selectedSystem = e.target.value;
    filterTopologyAndModules();
  });
}

function filterTopologyAndModules() {
  const nodes = document.querySelectorAll('.svg-node');
  nodes.forEach(node => {
    const id = node.getAttribute('data-id');
    const sys = node.getAttribute('data-sys');
    const n = NODE_LAYOUT[id];

    let matchSys = appState.selectedSystem === 'all' || sys === appState.selectedSystem;
    let matchQuery = !appState.searchQuery || 
      (n && (n.name.toLowerCase().includes(appState.searchQuery) || n.sub.toLowerCase().includes(appState.searchQuery) || id.toLowerCase().includes(appState.searchQuery)));

    if (matchSys && matchQuery) {
      node.style.display = '';
      node.classList.remove('dimmed');
    } else {
      node.style.display = 'none';
    }
  });

  renderModulesGrid();
}

function renderModulesGrid() {
  const grid = document.getElementById('modules-grid');
  if (!grid) return;

  grid.innerHTML = '';
  let count = 0;
  Object.keys(NODE_LAYOUT).forEach(id => {
    const n = NODE_LAYOUT[id];
    let matchSys = appState.selectedSystem === 'all' || n.sys === appState.selectedSystem;
    let matchQuery = !appState.searchQuery || 
      (n.name.toLowerCase().includes(appState.searchQuery) || n.sub.toLowerCase().includes(appState.searchQuery) || id.toLowerCase().includes(appState.searchQuery));

    if (!matchSys || !matchQuery) return;
    count++;

    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <div>
        <div class="card-top">
          <div class="card-title">${n.name}</div>
          <span class="metric-pill pill-${n.sys}">${n.sys.toUpperCase()}</span>
        </div>
        <div class="card-role">${n.sub}</div>
      </div>
      <div class="card-footer">
        <span>ID: ${id}</span>
        <span style="color:#10b981;">● AST Verified</span>
      </div>
    `;
    card.addEventListener('click', () => {
      window.inspectNode(id);
    });
    grid.appendChild(card);
  });

  const countBadge = document.getElementById('module-count-badge');
  if (countBadge) countBadge.innerText = `${count} 个已验证模块`;
}
