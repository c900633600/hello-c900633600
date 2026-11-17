(() => {
  'use strict';
  const article = document.getElementById('article-content');
  const toc = document.getElementById('article-toc');
  if (!article || !toc) return;
  const escape = value => value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  async function readArticle() {
    try {
      const response = await fetch(new URL(article.dataset.source, location.href));
      if (!response.ok) throw new Error(`Article request failed: ${response.status}`);
      const markdown = await response.text();
      if (!window.marked || !window.DOMPurify || !window.mermaid) {
        throw new Error('Article rendering libraries failed to load');
      }
      const headings = [];
      let headingIndex = 0;
      let diagramIndex = 0;
      const parser = new marked.Marked();
      parser.use({ renderer: {
        heading(token) {
          const id = `section-${++headingIndex}`;
          headings.push({ id, depth: token.depth });
          return `<h${token.depth} id="${id}">${this.parser.parseInline(token.tokens)}<a class="anchor" href="#${id}" aria-label="链接到此节">#</a></h${token.depth}>\n`;
        },
        code(token) {
          if ((token.lang || '').trim().split(/\s+/)[0] === 'mermaid') {
            return `<figure class="diagram"><div class="diagram-scroll" tabindex="0" role="region" aria-label="Mermaid 示意图，可横向滚动"><pre class="mermaid" id="diagram-${++diagramIndex}">${escape(token.text)}</pre></div><figcaption>窄屏可在图表区域横向滚动。</figcaption></figure>`;
          }
          return `<pre><code>${escape(token.text)}</code></pre>\n`;
        }
      } });
      // 为原文列表末尾补足段落分隔，仅影响显示，不更改 Markdown 文件。
      const normalized = markdown.replace(/(- `shard`\r?\n)(学习)/, '$1\n$2');
      article.innerHTML = DOMPurify.sanitize(parser.parse(normalized));
      toc.replaceChildren();
      for (const heading of headings) {
        const node = document.getElementById(heading.id);
        const item = document.createElement('li');
        item.className = `depth-${heading.depth}`;
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        const label = node.cloneNode(true);
        label.querySelector('.anchor')?.remove();
        link.textContent = label.textContent;
        item.append(link);
        toc.append(item);
      }
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        themeVariables: {
          fontFamily: '"Segoe UI", "Microsoft YaHei", sans-serif',
          fontSize: '16px',
          primaryColor: '#e3eefa', primaryTextColor: '#16304b',
          primaryBorderColor: '#8299b7', lineColor: '#7191b4',
          clusterBkg: '#eef4fb', clusterBorder: '#94a9c1'
        },
        flowchart: {useMaxWidth: false, htmlLabels: true, curve: 'basis', padding: 20, nodeSpacing: 30, rankSpacing: 45}
      });
      for (const diagram of article.querySelectorAll('.mermaid')) {
        const source = diagram.textContent;
        try {
          await mermaid.run({nodes: [diagram]});
        } catch (error) {
          console.error('Mermaid diagram could not be rendered:', error);
          const message = document.createElement('p');
          message.className = 'diagram-error';
          message.textContent = '这张图暂时无法显示，以下为原始图表代码。';
          diagram.before(message);
          diagram.className = 'diagram-source';
          diagram.textContent = source;
        }
      }
      const end = document.createElement('div');
      end.className = 'article-end';
      end.innerHTML = '<span>— 全文完 —</span><a href="index.html">返回全部文章 →</a>';
      article.append(end);
      // 直接访问带章节锚点的链接时，等正文与图表完成布局后再定位。
      if (location.hash) {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior: 'instant'});
      }
    } catch (error) {
      console.error('Article could not be loaded:', error);
      const message = document.createElement('p');
      message.className = 'article-state';
      message.setAttribute('role', 'alert');
      message.textContent = location.protocol === 'file:'
        ? '请通过本地预览服务打开此页面，以加载文章与图表。'
        : '文章暂时无法加载，请刷新页面重试。';
      article.replaceChildren(message);
    } finally {
      article.setAttribute('aria-busy', 'false');
    }
  }
  readArticle();
})();
