$('#identifier-search').typeahead({
  source: artists,
  updater: function(selected) {
    document.location = '#/' + selected;
    console.log('Loading person:' + selected);
  }
});

$('form').submit(function(event) {
  event.preventDefault();
});

$(window).on('hashchange', hashUrlHandler);
$(document).ready(hashUrlHandler);

function hashUrlHandler() {
  if (location.hash) {
    var identifier = location.hash.slice(2);
    loadPerson(identifier);
    $('#identifier-search').val(identifier);
    document.title = identifier + ' | Uduvudu Demo';
  } else {

  }
}

