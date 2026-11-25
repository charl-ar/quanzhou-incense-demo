# 香见泉州 · 以香塑城

**一缕香，见一座城。** 面向创意汇报的泉州文化香雕文创展馆 Demo。

项目目录：`D:\quanzhou-incense-demo`。独立新建，未改动原有香见项目。React + TypeScript + Vite + Tailwind CSS，纯静态前端，无后端、数据库、密钥或运行时付费 API。已按项目所有者确认发布到 GitHub Pages。在线地址：[香见泉州](https://charl-ar.github.io/quanzhou-incense-demo/)；源码仓库：[charl-ar/quanzhou-incense-demo](https://github.com/charl-ar/quanzhou-incense-demo)。

## 启动项目

建议 Node.js 24 LTS（至少 22.12）、npm。Windows PowerShell：

```powershell
cd D:\quanzhou-incense-demo
npm install
npm run dev
```

按终端显示的 Local 地址访问，默认 [http://localhost:5173/](http://localhost:5173/)。端口占用时 Vite 会显示新端口。停止服务按 `Ctrl+C`。

```powershell
npm run dev -- --host 0.0.0.0
npm run typecheck
npm run build
npm run preview
```

正式构建输出 `dist/`，预览默认 [http://localhost:4173/](http://localhost:4173/)。不要直接双击 `dist/index.html`，应使用 HTTP 静态服务器。克隆后想严格使用锁定依赖可运行 `npm ci`。

## 手机通过局域网访问

1. 手机与电脑连接同一个 Wi-Fi，关闭手机 VPN，避免访客网络隔离。
2. 电脑运行 `npm run dev -- --host 0.0.0.0`。
3. 使用终端 Network 中的 **WLAN 地址**，例如本次环境为 `http://192.168.31.151:5173/`。IP 可能变化，以 `ipconfig` 的无线网 IPv4 为准；不要使用 WSL/虚拟网卡 `172.*` 地址。
4. 手机浏览器输入该地址。手机不能使用 `localhost`，那指向手机自身。
5. 如被 Windows 防火墙拦截，仅允许 Node.js 在“专用网络”访问；路由器需允许设备互访。开发服务器只用于可信局域网，展示结束按 `Ctrl+C`。

## 已有页面与交互

- 首页：品牌主视觉、精选作品、项目理念、四步设计流程、工坊入口、滚动入场动画。
- 香雕展馆：六个概念作品，支持全部／建筑／山海／民俗筛选。
- 六个独立详情：文化灵感、造型映射、理念、纹样、场景、拟定材料与打样限制；概念／局部／草图／实景切换、图片放大、下一件作品。
- 灵感溯源：选择六个地标，切换实景、元素提取、造型推演、产品概念；桌面并排对照、手机纵向对照；图片授权来源可展开。
- AI 设计工坊：6 地标 × 3 造型 × 3 材质视觉 × 3 场景 = **162 种参数组合**，组合后展示提案、提示词式设计简报，支持下载 `.txt`、重置、选项修改提示与详情页带入地标。
- 手机独立导航、404 返回入口、减弱动态偏好、键盘焦点样式。

工坊是本地规则与预设素材组合演示，**不实时生成新图**。色调滤镜与取景变化用于表达方向，极简浮雕使用设计草图示意。网页会清楚披露这一点，不承诺 162 张独立生成图。

## 修改作品名称与介绍

编辑 `src/data.ts` 的 `works` 数组：

| 字段 | 用途 |
| --- | --- |
| `id` | 路由与素材文件名的稳定标识，修改时同步重命名素材 |
| `name` / `landmark` | 作品名 / 对应地标 |
| `category` | 建筑、山海、民俗之一，驱动筛选 |
| `intro` / `idea` | 简介 / 设计理念 |
| `elements` | 文化元素与产品造型的对应关系 |
| `pattern` / `scene` / `feasible` | 纹样、场景、实体制作可行性 |

品牌文案与布局在 `src/main.tsx`，视觉样式在 `src/style.css`。不需要配置后台。修改后开发服务器自动更新。

## 替换香雕与实景图片

所有展示图片均在 `public/images/`，无外部图片热链或在线字体依赖。直接替换同名 `.webp` 文件即可：

| 前缀 | 作品 |
| --- | --- |
| `twin-pagodas` | 双塔凝香 |
| `luoyang-bridge` | 海丝遗韵 |
| `qingyuan-mountain` | 山间清韵 |
| `xunpu-flowers` | 花香入梦 |
| `clock-tower` | 古城时光 |
| `chongwu-city` | 山海守望 |

每个前缀对应 `前缀.webp`（概念图）、`前缀-process.webp`（设计草图）、`前缀-real.webp`（文化实景）。细节视图为概念图局部放大，已标注，非独立实体微距照片。建议概念图至少 1200px、主体周围保留留白；实景 1200px 宽即可。当前四款概念来自 512px 单元，高清独立产品图可在后续替换。

`assets/source/` 留存生成原图；`node scripts/prepare-assets.mjs` 可从本地原图重新导出，不调用 API。`scripts/download-photos.py` 是可选的实景溯源下载脚本（Python 3 标准库，需联网）；正常启动与部署不需要运行。更新实景授权时同步修改 `public/images/credits.json` 与 `ASSETS.md`，保留原作者、许可证链接、修改说明。CC BY-SA 图片及其改编遵循原许可，不因此自动改变独立代码许可。

## GitHub Pages 自动部署

当前已部署至 [GitHub Pages](https://charl-ar.github.io/quanzhou-incense-demo/)，仓库为 [charl-ar/quanzhou-incense-demo](https://github.com/charl-ar/quanzhou-incense-demo)。之后在本项目提交修改并推送 main，GitHub Actions 会自动更新网站。以下保留从零部署的操作说明。

1. 在 GitHub 手动创建仓库，例如 `quanzhou-incense-demo`，确认可见性和素材授权。免费账户常使用公开仓库，私有仓库 Pages 能力取决于账户方案。
2. 在项目目录打开 PowerShell，执行（替换 `YOUR_USERNAME`）：

```powershell
git init
git add .
git commit -m "Build Quanzhou incense exhibition demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quanzhou-incense-demo.git
git push -u origin main
```

3. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
4. Actions → `Deploy static demo to GitHub Pages` → Run workflow。之后推送 `main` 自动重新部署。
5. 等待 build 与 deploy 均成功后，访问 `https://YOUR_USERNAME.github.io/quanzhou-incense-demo/`。
6. 可直接打开或刷新 `https://YOUR_USERNAME.github.io/quanzhou-incense-demo/#/works/twin-pagodas`。

工作流 `.github/workflows/deploy.yml` 使用 `actions/configure-pages` 返回的 `base_path` 设置 `VITE_BASE_PATH`，兼容普通项目仓库与用户根站点。路由统一使用 **HashRouter**，刷新时请求仍为部署根目录的 `index.html`；图片通过 `import.meta.env.BASE_URL` 生成路径，无服务器重写要求。

如需本地模拟指定子路径：

```powershell
$env:VITE_BASE_PATH='/quanzhou-incense-demo/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

此时 `dist` 必须挂在 HTTP 服务的 `/quanzhou-incense-demo/` 路径下。日常本地与 Cloudflare/Vercel 使用默认相对 base `./` 即可。

## Cloudflare Pages

经你确认发布后，可选择：

- 连接 Git 仓库：Workers & Pages → Create → Pages → Connect to Git；生产分支 `main`；构建命令 `npm run build`；输出目录 `dist`；Node 版本设为 24（可设置 `NODE_VERSION=24`）。不用设置 `VITE_BASE_PATH`。
- Direct Upload：先本地 `npm run build`，将 `dist` 的静态文件上传到 Pages 项目。上传前确认不含私密资料。

这是静态 Pages 站点，不需要 Worker、数据库、环境密钥或路由重写。

## Vercel

经你确认发布后，Import Git Repository，Framework Preset 选择 Vite，Build Command 为 `npm run build`，Output Directory 为 `dist`，Install Command 为 `npm ci`，Node.js 设为 24。保留默认根路径，清除可能遗留的 `VITE_BASE_PATH`。HashRouter 无需 rewrite 配置。

## 实际验证与截图

详见 `TEST-REPORT.md`。测试脚本留在 `tests/site.spec.ts`，Playwright 配置为 `playwright.config.ts`。

```powershell
# 终端一：启动页面
npm run dev
# 终端二：运行测试（默认使用电脑已有的 Microsoft Edge）
npm run test:e2e
```

若没有 Edge，可安装 Chromium 并使用：

```powershell
npx playwright install chromium
$env:PLAYWRIGHT_CHANNEL='chromium'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_CHANNEL
```

截图：`artifacts/screenshots/`；HTML 报告：`artifacts/playwright-report/index.html`（可用 `npx playwright show-report artifacts/playwright-report` 打开）。视口为 1440×1000、768×1024、390×844。手机测试为浏览器设备模拟，仍建议展示前用真实手机检查局域网和字体。

## 尚需补充

香艺师工艺访谈、配方与香味、真实尺寸、模具分型与强度验证、实际制作过程照片、实体微距细节、文化专业校核和高分辨率单品图。当前 AI 图像含艺术化重组（尤其钟楼顶盖），不能作为建筑复原或生产图纸。没有实体产品测试结果，也没有登录、支付、购物车。

部署参考：[Vite 官方静态部署指南](https://vite.dev/guide/static-deploy.html)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。工作流已使用 upload-pages-artifact@v4。

