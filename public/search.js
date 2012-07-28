window.debug = true

var term = $('#term')
var result = $('#result')

function success (data) {
  debug && console.log(data)

  if (!(data && data.length)) {
    return result.html("<li>no results found<li>")
  }

  result.empty();
  $.each(data, function (index, item) {
    result.append(elem(item))
  })
}

function error () {
  result.html("An error occurred. Please try again later.")
}

/**
 * Return an element representation of `item`.
 */

var props = 'name url description github time'.split(' ')
var url = { url: 1, github: 1 }
var li = $('#litemplate').html()

function elem (item) {
  var li = $('#litemplate li').clone()

  $.each(props, function (i, prop) {
    var elem = li.find('.' + prop)

    if (item[prop]) {
      elem.text(item[prop])
      if (url[prop]) {
        elem.attr('href', item[prop])
      }
    } else {
      elem.remove()
    }
  })

  if (item.github)
    watchers(item.github, li)

  return li
}

// repo watchers
function watchers (repo, li) {

  $.get('/watchers/' + encodeURIComponent(repo), function (data) {
    li.append("<p class='watchers'>watchers: " + data + "</p>");
  });
}

// repo search
$('form').on('submit', function (e) {
  $.ajax({
      url: '/search/' + term.val()
    , dataType: 'json'
    , success: success
    , error: error
  })

  return false
})

term.focus();
