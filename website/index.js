const fs = require('fs');
const pages = require('./pages');
const plugin = require('./plugin');

run().catch(error => console.error(error.stack));

async function run() {
  for (const { file, props } of pages) {
    console.log(`Generate ${file}`);
    const html = await plugin(props);
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
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://g0a3nbw0xa.execute-api.us-east-1.amazonaws.com/prod/track', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {};
      xhr.send(JSON.stringify({
        path: window.location.pathname,
        hostname: window.location.hostname,
        hash: window.location.hash
      }));
    </script>
  </head>
  <body>
    <div id="wrap">
      ${content}
    </div>
  </body>
</html>
`;
