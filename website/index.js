const fs = require('fs');
const plugin = require('./plugin');

const pages = [
  {
    file: './plugins/autopopulate.html',
    template: plugin,
    props: { owner: 'mongodb-js', repo: 'mongoose-autopopulate' }
  }
];

run().catch(error => console.error(error.stack));

async function run() {
  for (const { file, template, props } of pages) {
    const html = await template(props);
    fs.writeFileSync(file, layout(html));
  }
};

const layout = content => `
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>Mongoose Plugins Search</title>
    <link rel="stylesheet" href="/public/style.css">

    <script type="text/javascript">
      !function(name,path,ctx){
        var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
      }('KeenAsync','https://d26b395fwzu5fz.cloudfront.net/keen-tracking-1.1.3.min.js',this);

      KeenAsync.ready(function(){
        var client = new KeenAsync({
          projectId: '5ac79d81c9e77c0001a02e1d',
          writeKey: '3A2D0DE1DA53EAE8EDB843737C817C0285F1D7DECEE598E50D42D2F2D3213484D7A1303570E2F989EE0C3DAE48A5FFD967F70561E9B41B04B011AA5B1D8CA20FA0E0450B16F2DBC6E7C31465DE4C78F606ADAAD6365AC462EA549CF8BE2E7119'
        });

        // Record an event
        client.recordEvent('pageviews', {
          url: window.location.pathname
        });
      });
    </script>
  </head>
  <body>
    <div id="wrap">
      ${content}
    </div>
  </body>
</html>
`;
