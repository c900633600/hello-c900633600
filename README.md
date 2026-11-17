# Hello Universe

80,000 粒子主页与技术文章栏目，纯静态部署，无需后端或构建。

## 本地预览

文章由浏览器通过 HTTP 读取 Markdown；请使用本地静态预览服务，不要直接双击 HTML 阅读文章。

- VS Code：使用 Live Server，打开 index.html。
- 已安装 Python 时：在此目录运行 python -m http.server 8080，然后访问 http://localhost:8080/ 。

## 文章更新

直接修改 articles/ddp-concepts.md 并刷新浏览器。Markdown 正文和 Mermaid 代码块均由浏览器实时解析，无需导出 SVG 或同步生成正文 HTML。文章标题、摘要和列表卡片在各自 HTML 中维护。

assets/vendor 包含 Marked、DOMPurify、Mermaid 的浏览器版本及许可证，不依赖外部 CDN。Mermaid 在阅读页运行时生成图形，不替换原始 Markdown，也不读取预生成图表文件。

## EdgeOne

将整个项目连同 articles、assets 及 assets/vendor 一并提交到 GitHub。

- 框架预设：Other
- 根目录：./
- 构建命令：留空
- 输出目录：./

阅读页采用真实 HTML 路径，可直接打开、刷新和分享。部署后使用相对地址读取随项目上传的 Markdown，不访问本地 Obsidian 路径。

## GitHub Pages

在仓库 Settings → Pages 中，Source 选择 Deploy from a branch，分支选择 main，目录选择 / (root)。项目使用相对资源路径，可以部署在 /hello-edgeone/ 子路径下。.nojekyll 文件让 Pages 直接发布静态文件。

预计站点地址：https://c900633600.github.io/hello-edgeone/ 。GitHub Free 需要使用公开仓库；私有仓库需要支持 Pages 的付费方案。提交代码本身不会自动更改仓库可见性或开启 Pages。
