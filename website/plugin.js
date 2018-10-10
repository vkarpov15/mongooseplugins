const highlight = require('highlight.js');
const marked = require('marked');
const pages = require('./pages');
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
  console.log('Get readme');
  const paragraphs = await superagent.
    get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`).
    then(res => {
      const txt = res.text.split('\n').slice(1).join('\n');
      allMd += txt;
      return txt;
    }).
    then(res => splitIntoParagraphs(res)).
    then(paragraphs => paragraphs.map(p => marked(p)));

  console.log('Get examples');
  const examples = await superagent.
    get(`https://raw.githubusercontent.com/${owner}/${repo}/master/examples.md`).
    then(res => {
      const txt = res.text.split('\n').slice().join('\n');
      allMd += txt;
      return txt;
    }).
    then(res => splitIntoParagraphs(res)).
    then(examples => examples.map(p => marked(p)));

  let changelog = null;
  for (const file of ['History.md', 'CHANGELOG.md']) {
    changelog = await superagent.
      get(`https://raw.githubusercontent.com/${owner}/${repo}/master/${file}`).
      then(res => {
        const text = `# Changelog\n${res.text.replace(/^=+$/mg, '-------')}`;
        allMd += '\n\n' + text;
        return text;
      }).
      then(txt => marked(txt)).
      catch(error => {
        if (error.status === 404) {
          return null;
        }
        throw error;
      });
    if (changelog != null) {
      break;
    }
  }
  if (changelog == null) {
    throw new Error('changelog not found');
  }

  const _toc = toc(allMd);

  return `
    <script type="text/javascript" src="/public/native.js"></script>
    <link rel="stylesheet" href="/public/inlinecpc.css">
    <link rel="stylesheet" href="/public/highlight.css">
    <link rel="stylesheet" href="/public/plugin.css">
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

    <div class="content">
      <div class="toc">
        <h2><a href="/">Mongoose Plugins</a></h2>
        <div>
          ${select(props)}
        </div>
        ${marked(_toc.content)}
        <div id="carbonads-wrapper">
          <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CK7DT537&placement=mongoosejsio" id="_carbonads_js"></script>
        </div>
      </div>
      <h1>${repo}</h1>
      <div class="native-inline">
        <a href="#native_link#"><span class="sponsor">Sponsor</span> #native_company# — #native_desc#</a>
      </div>
      ${paragraphs.slice(1).join('\n\n')}

      ${examples.join('\n\n')}

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

function select(props) {
  return '<div id="select-plugin">' +
    `<a class="select-plugin-this-repo" href="./${props.path}">${props.repo}</a> <span class="right-arrow"></span>` +
    '<div id="select-plugin-hidden">' +
    pages.filter(p => p.props.repo !== props.repo).map(p => {
      return `<a href="./${p.props.path}">${p.props.repo}</a>`;
    }).join('\n') +
    '</div>' +
    '</div>';
}
