const highlight = require('highlight.js');
const marked = require('marked');
const superagent = require('superagent');
const toc = require('markdown-toc');

marked.setOptions({
  highlight: function(code) {
    return highlight.highlight('JavaScript', code).value;
  }
});

module.exports = async (props) => {
  const { owner, repo } = props;

  let allMd = '';
  const paragraphs = await superagent.
    get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`).
    then(res => {
      const txt = res.text.split('\n').slice(1).join('\n');
      allMd += txt;
      return txt;
    }).
    then(res => splitIntoParagraphs(res)).
    then(paragraphs => paragraphs.map(p => marked(p)));

  const changelog = await superagent.
    get(`https://raw.githubusercontent.com/${owner}/${repo}/master/History.md`).
    then(res => {
      const text = `# Changelog\n${res.text.replace(/^=+$/mg, '-------')}`;
      allMd += '\n\n' + text;
      return text;
    }).
    then(txt => marked(txt));

  const contents = toc(allMd);

  return `
    <script type="text/javascript" src="/public/native.js"></script>
    <link rel="stylesheet" href="/public/inlinecpc.css">
    <link rel="stylesheet" href="/public/highlight.css">
    <style>
      a, a:visited {
        color: #0366d6;
      }
    </style>

    <script>
      _native.init("CK7DT53Y",{
        targetClass: 'native-inline'
      });
    </script>

    <div>
      <h1>${repo}</h1>
      <div class="native-inline">
        <a href="#native_link#"><span class="sponsor">Sponsor</span> #native_company# — #native_desc#</a>
      </div>
      ${paragraphs[0]}
      ${marked(contents.content)}
      ${paragraphs.slice(1).join('\n\n')}

      ${changelog}
    </div>
  `;
};

function splitIntoParagraphs(md) {
  const lines = md.split('\n');

  const paragraphs = [];

  for (const line of lines) {
    if (line.startsWith('#')) {
      paragraphs.push([]);
    }
    if (paragraphs.length === 0) {
      paragraphs.push([]);
    }
    paragraphs[paragraphs.length - 1].push(line);
  }

  return paragraphs.map(p => p.join('\n'));
}
