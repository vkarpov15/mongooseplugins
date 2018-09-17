const highlight = require('highlight.js');
const marked = require('marked');
const superagent = require('superagent');

marked.setOptions({
  highlight: function(code) {
    return highlight.highlight('JavaScript', code).value;
  }
});

module.exports = async (props) => {
  const { owner, repo } = props;

  const paragraphs = await superagent.
    get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`).
    then(res => res.text).
    then(res => splitIntoParagraphs(res)).
    then(paragraphs => paragraphs.map(p => marked(p)));

  return `
    <script type="text/javascript" src="/public/native.js"></script>
    <link rel="stylesheet" href="/public/inlinecpc.css">
    <link rel="stylesheet" href="/public/highlight.css">

    <script>
      _native.init("CK7DT53Y",{
        targetClass: 'native-inline'
      });
    </script>

    <div>
      ${paragraphs[0]}
      <div class="native-inline">
        <a href="#native_link#"><span class="sponsor">Sponsor</span> #native_company# — #native_desc#</a>
      </div>
      ${paragraphs.slice(1).join('\n\n')}
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
