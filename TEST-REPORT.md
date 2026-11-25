# 实际验收记录

日期：2026-11-25（Asia/Shanghai）。测试环境：Windows、Node 24.19.0、npm 11.17.0；Playwright 调用电脑已有的 Microsoft Edge（真实无头浏览器）。未以源码审查代替浏览器验证。

| 检查 | 结果与范围 |
| --- | --- |
| TypeScript | `npm run typecheck` 通过；`npm run build` 再次包含完整类型检查 |
| 正式构建 | `npm run build` 通过，输出 `dist/`；JS 约 291KB，gzip 约 95KB |
| 桌面、平板、手机 | 1440×1000、768×1024、390×844；三种尺寸自动检查无横向溢出、图片全部加载成功 |
| 路由与交互 | 首页、展馆、6 个独立详情、溯源、工坊、未知路由返回；主题筛选结果为建筑 3、山海 2、民俗 1 |
| 图片交互 | 每件作品的概念、局部、草图、实景切换、放大与关闭；六地标 × 四阶段溯源切换 |
| 手机导航 | 打开、关闭、再次打开后跳转，菜单跳转后关闭 |
| 工坊穷举 | 桌面逐一执行 6×3×3×3 = 162 种组合，验证结果造型、材质、场景文字及图像对应地标；全部通过 |
| 工坊导出与重置 | 三尺寸均验证文件下载与重置；最终生产回归额外读取下载文本确认待验证说明与预设素材披露 |
| 完整开发测试 | Playwright 6/6 通过，约 4.1 分钟，包含 162 组合穷举 |
| 最终生产包回归 | 指向 `http://localhost:4173`，三尺寸共 6/6 通过，约 1.3 分钟；参数组合使用冒烟范围，未重复穷举不变的组合逻辑 |
| 静态子路径 | 将生产包真实挂载到 `/quanzhou-incense-demo/`；10 个页面 × 3 尺寸 = 30 次访问与刷新通过，0 损坏资源、0 页面异常 |
| 资源路径 | Vite 默认相对 base；GitHub Actions 使用 configure-pages 的 base_path；静态图片使用 BASE_URL；HashRouter 无需重写 |
| npm audit | 完整依赖审计与生产依赖审计均 0 vulnerabilities，JSON 在 artifacts/npm-audit.json |

最终截图在 `artifacts/screenshots/`，包括首页、展馆、详情、溯源、工坊各三种尺寸共 15 张长截图，另附电脑与手机首页首屏截图。HTML 报告在 `artifacts/playwright-report/`，导出简报样本在 `artifacts/*-brief.txt`，子路径验证结果在 `artifacts/deployment-check.json`。

## 复测

启动 `npm run dev` 后，另一终端执行 `npm run test:e2e`，默认桌面穷举全部组合。Edge 缺失时按 README 安装浏览器并设置对应 channel。

针对已有生产预览，只做页面与代表组合回归：

```powershell
$env:TEST_BASE_URL='http://localhost:4173'
$env:STUDIO_SMOKE='1'
npm run test:e2e
Remove-Item Env:TEST_BASE_URL
Remove-Item Env:STUDIO_SMOKE
```

子路径复测：

```powershell
$env:VITE_BASE_PATH='/quanzhou-incense-demo/'
npx vite build --outDir artifacts/subpath-build
Remove-Item Env:VITE_BASE_PATH
node scripts/check-deployment.mjs
```

## 验证边界

- 未创建远程仓库，未实际运行 GitHub Actions 云端作业，未上传或发布互联网。工作流和子路径已在本地检查，云端仍取决于账户权限与平台状态。
- 手机为 Edge 设备模拟，未使用实体 iPhone/Android，也未验证其他设备到电脑的路由器和防火墙链路。
- 工坊是本地预设概念图、滤镜和文本规则组合，不是实时 AI 生图。162 种参数组合并不等于 162 张独立图像。
- 局部细节来自概念图放大；四款初版概念图来自 512px 单元，后续可换高清单品图。钟楼等建筑细部存在艺术化偏差，页面已标注。
- 尚无实体、真实制作过程照片、香味配方、尺寸、模具、燃烧及强度试验结果；均需后续打样与专业文化校核。
