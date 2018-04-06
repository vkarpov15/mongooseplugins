'use strict';

const get = require('lodash.get');
const superagent = require('superagent');

function renderPackage(pkg) {
  const date = new Date(pkg.date);
  const year = date.getFullYear();
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
  const dayOfMonth = (date.getDate() < 10 ? '0' : '') + date.getDate();
  return `
    <li>
      <h3>
        <a href="http://www.npmjs.com/package/${pkg.name}">
          ${pkg.name}
        </a>
      </h3>
      <p class="description">
        ${pkg.description}
      </p>
      <p class="updated">
        Latest Version: v${pkg.version}
      </p>
      <p class="updated">
        Updated At: ${year}-${month}-${dayOfMonth}
      </p>
    </li>
  `;
}

function render(pkgs) {
  if (pkgs.length === 0) {
    return `
      <h2>No Results</h2>
    `;
  }

  return pkgs.map(renderPackage).join('\n\n');
}

function init(searchBox, resultsList, render) {
  let lastEvent = 0;
  let timeout = setTimeout(() => {});
  let inFlight = false;
  searchBox.addEventListener('keydown', () => {
    lastEvent = Date.now();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (Date.now() - lastEvent >= 300) {
        lastEvent = Date.now();
        search();
      }
    }, 350);
  });

  function search() {
    if (inFlight) {
      return;
    }
    const str = searchBox.value;
    if (!str) {
      return;
    }

    inFlight = true;
    const toSearch = encodeURIComponent(`mongoose ${str}`)
    superagent.
      get(`https://registry.npmjs.org/-/v1/search?text=${toSearch}&size=25`).
      end(function(error, res) {
        inFlight = false;
        if (error) {
          return;
        }
        const results = get(res, 'body.objects', []).map(v => v.package);
        console.log(results)
        resultsList.innerHTML = render(results);
      });
  }
}

console.log('Before init')
init(document.querySelector('#term'), document.querySelector('#result'), render);
