# Finance · 企业财务与采购数智化运营平台 Living Architecture

> 🚀 **跨端多系统全景架构可视化与 GitHub Pages 自动化发布平台**  
> 核心引擎：**静态 AST 知识图谱扫描 + 业务时序 Mermaid 交互式看板 + 版本演化 Diff 比对 + 安全脱敏审计**  
> 部署平台：**GitHub Pages (GitHub Actions 自动化 CI/CD)**

---

## 🌐 在线访问与仓库托管

- **架构站点主页**：[https://crazy-chenmilin.github.io/finance-view/](https://crazy-chenmilin.github.io/finance-view/)
- **源码托管与隔离规范**：
  - **架构数据与 CI/CD**：独立托管于当前个人开源 GitHub 仓库（`Crazy-ChenMiLin/finance-view`）
  - **核心业务源码**：留存于公司内部 Git 平台（只读关联，绝对不产生任何脏提交或流水线污染）

---

## 🌟 核心能力与系统全景

本平台为思远道企业财务/采购 OA 运营平台（对标「用友-好业财」）的实时动态架构看板，涵盖前端工程 `finance-frontend` 与后端微内核 `sydo_oa_finance` 的全景调用关系与业务核心：

1. **四层物理隔离系统拓扑 (2D Interactive Topology)**：
   - **Finance-Web 前端交互层**（Vue 3 + Vite + Element Plus + Pinia + TailwindCSS）
   - **Finance-Server 核心服务中枢**（FastAPI 302+ 路由 + Tortoise ORM + Pydantic）
   - **三库分离持久化集群**（`base` 财务业务库 + `pm` 项目独立库 + `manpower` 人力库 + Redis 7.0 缓存）
   - **外部协同与移动生态**（WPS Web Office 云端正文回写 + 腾讯云 COS + 金税 OCR + 钉钉/企微审批流）

2. **五大业务核心时序流（交互式 Mermaid 渲染）**：
   - **采购执行全周期闭环**：`PR 申请 -> 询比价方案 -> PO 订单 -> 采购合同 -> 验收单 -> 发票三单匹配 -> 付款三层联动`
   - **移动端扫码手写签名状态机**：`PC 生成二维码 -> 手机扫码授权 -> 移动端画布触控签名 -> 验签防重放 -> WPS 书签正文回写 -> PDF 归档`
   - **跨库预算校验与双轨拦截**：`穿透查询 PM 独立库 projects 表 -> 金额超标硬拦截 (status=warn) vs 未建档项目隐式放行 (status=unknown)`
   - **合同正文生成与条款装配管线**：`PO 衍生合同 -> 变量书签注入 -> 双方签章合成 -> 导出不可篡改只读 PDF`
   - **采购执行宽表 22 维跨表聚合流**：`以 PR 明细行为最小粒度 -> 跨 6 表 LEFT JOIN 汇总 -> 抹平 3 套枚举漂移与付款比例反推`

3. **版本演进与跨 Commit 架构 Diff**：
   - 提取真实 Git 历史 Commit 对应版本的源码结构与变更清单。
   - 绿色高亮 `+新增` 模块、蓝色高亮 `~演进` 模块、红色高亮 `-移除` 模块。
   - 实时计算修改源文件对上下游业务链路的影响范围。

4. **绝对安全脱敏与合规审计**：
   - 内置 `security-sanitizer.js`，严格拦截私钥、内部 IP（`47.108.83.49` 等）、数据库明文密码与内部 Token，确保 100% 安全合规后方可发布到 Pages。

---

## ⚙️ 自动化流水线 (GitHub Actions)

仓库内置 `.github/workflows/living-architecture.yml`，具备定时检测与手动重建能力：

```mermaid
flowchart LR
    A[上游公司 Git 仓库<br/>只读探测最新 Commit] -->|定时轮询或 Push| B(GitHub Actions CI/CD)
    B -->|构建静态知识图谱| C[生成版本快照与 Diff]
    C --> D[执行安全脱敏审计]
    D --> E[自动化发布至 GitHub Pages]
```

- **配置权限**：利用 GitHub 内置 `GITHUB_TOKEN` 自动授权 Pages 部署。
- **页面设置**：在仓库设置中开启：`Settings` -> `Pages` -> `Build and deployment` -> `Source` 选择 **`GitHub Actions`**。

---

## 🛠️ 本地运行与实时预览

```bash
# 1. 构建全量静态产物
npm run build

# 2. 执行安全脱敏审计
npm run audit

# 3. 启动本地预览服务（默认端口 8088）
npm run serve
# 访问：http://localhost:8088
```

---

## 📄 目录规范

```
finance-view/
├── .github/
│   └── workflows/
│       └── living-architecture.yml  # GitHub Actions 自动化部署管道
├── dist/                            # 静态发布产物目录
├── package.json                     # 项目元信息与 CLI 命令
├── README.md                        # 架构设计与部署说明
├── scripts/
│   ├── analyzer.js                  # AST 知识图谱与元数据抽取器
│   ├── build-site.js                # 静态站点全量构建流水线
│   ├── dev-server.js                # 零依赖本地轻量预览服务器
│   ├── diff-calculator.js           # 跨版本架构差异比对算法
│   ├── history-scanner.js           # Git 历史扫描与版本快照生成器
│   ├── security-sanitizer.js        # 安全合规扫描与敏感信息脱敏器
│   └── sync-upstream.js             # 上游增量提交探测器
└── src/
    ├── app.js                       # 交互式 Visual Explainer 核心引擎
    ├── index.html                   # 架构看板页面模板
    └── style.css                    # 现代科技感暗黑玻璃拟态主题样式
```
