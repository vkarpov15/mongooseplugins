'use strict';

const cycle = require('@cycle/core');
const dom = require('@cycle/dom');
const h = require('virtual-dom/h');
const http = require('@cycle/http');
const moment = require('moment');

const Observable = require('rx').Observable;
const R = require('ramda');

const Header = sources => {
  const component =
    h('div', [
      h('div#header', [
        h('h1', [
          h('a', { href: 'http://mongoose.com' }, [
            h('span.mongoose', ['mongoose'])
          ])
        ])
      ]),
      h('h2', ['plugins search'])
    ]);
  const component$ = Observable.just(component);

  return { component$ };
};

const SearchBox = sources => {
  const component =
    h('div', [
      h('input', { id: 'term', placeholder: 'Search' })
    ]);
  const component$ = Observable.just(component);
  const input$ = sources.DOM.select('input').events('change');

  return { component$, input$ };
};

const SearchResults = sources => {
  const time = R.lensPath(['time', 'modified']);
  const readableTime = d => moment(d).format('YYYY-MM-DD');

  const renderPackage = pkg =>
    h('li', [
      h('h3', [
        h('a', { href: `http://npmjs.org/package/${pkg.name} `}, [
          pkg.name
        ])
      ]),
      h('p', { 'class': 'description' }, [pkg.description]),
      h('p', { 'class': 'updated' }, [
        'Updated At: ',
        readableTime(R.view(time, pkg))
      ])
    ]);

  const component$ = sources.results$.map(packages =>
    h('ul', { id: 'result' }, R.map(renderPackage, packages)));

  return { component$ };
};

const main = sources => {
  const results$ = sources.HTTP.mergeAll().
    map(res => res.body.packages).
    startWith([]);

  sources.results$ = results$;
  sources.results$.subscribe();

  const search = SearchBox(sources);
  const components = [
    Header(sources).component$,
    search.component$,
    SearchResults(sources).component$
  ];

  return {
    DOM: Observable.combineLatest(components, (header, search, results) => {
      return h('div', [header, search, results]);
    }),
    HTTP: search.input$.
      map(ev => ev.target.value).
      filter(ev => ev && ev.length > 2).
      throttle(250).
      map(v => {
        return { url: `/search/${encodeURIComponent(v)}`, method: 'GET' };
      })
  };
};

cycle.run(main, {
  DOM: dom.makeDOMDriver('#wrap'),
  HTTP: http.makeHTTPDriver()
});
