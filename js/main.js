/**
 * @type {String} : endpoint url
 */
var endPointUrl = 'https://dbpedia.org/sparql';

/**
 * @type {String} :  graph uri
 */
var uri         = 'http://dbpedia.org';

/**
 * helper function :
 * add escape to string, so it can be used in RegExpression
 * @param String str
 * @return String
 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * helper function : 
 * format miliseconds into readbale format h:m:s
 * @param duration :  integer 
 * @return String
 */
function msToTime(duration) {
  var //milliseconds = parseInt((duration%1000)/100),
     seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);

  var time= "";
  if(hours > 9) {
    time = hours + ':';
  } else if (hours > 0) {
    time = "0" + hours +":";
  }

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return time  + minutes + ":" + seconds
}

function getArtistHint2(name, process) {
  query = search_hint.replace(/{artist_reg}/g, name);
  request = get_request(query, false,'application/rdf+json');
  return $.get(request, function( data ) {
    artists = data ["http://linkedbrainz.org/hints"]["http://xmlns.com/foaf/0.1/name"]; 
    arr = $.map(artists, function(value, key){
      return  [value['value']];
    });
    process(arr);
  })
}
var getArtistHint = function(q, syncResults, asyncResults) {
    $.ajax(
      "http://lookup.dbpedia.org/api/search/KeywordSearch?QueryClass=artist&MaxHits=15&QueryString="+q,
      {dataType: "json"}
    ).done(function(data) {
      arr = _.sortBy(
        _.sortBy(data.results, function(b){
          return b.label.length
        }),function(s){
          return -s.label.search(new RegExp('^'+q,'i'));
        });

        asyncResults(arr)
    });
}

/**
 * reset page content
 */
function reset_page() {
      $('#q1').html('');
      $('#q2').html('');
      $('#q5').html('');
      $('[data-tab=q1]').trigger('click')
}

/**
 * load artist from url
 */
function hashUrlHandler() {
  if (location.hash) {
    var identifier =decodeURIComponent( location.hash.slice(2));
      console.log(identifier);
//    loadArtist(identifier, q1, $('#q1'), false);
      //$('#q1').addClass('active').siblings('[data-tab]').removeClass('active');
      //$('[data-tab=q1]').trigger('click')
      reset_page();
    $('#identifier-search').val(identifier);
    document.title = identifier + ' | Uduvudu LinkedBrainz';
  } else {
      console.debug('hashUrlHandler: error');
  }
}


/**
 * generate request url, the url is composed the following query strings :
 *   endpoint : server url
 *    default-graph-uri : (query with Service must not have this string)
 *    query: sparql qurey
 *    format: response format, it depends on the type of query see server *    documentation
 * endpointUrl?default-graph-uri={uri}&query={query}&format={format}
 *
 * @param String query: sparql query
 * @param String [format='text/turtle']: response format 
 * @param Boolean [isUriEnabled=true]: add/remove default-graph-uri
 *
 * @return String
 */
function get_request(query, service, format) {
 if(!service) uri = '';
  var format = format || 'text/turtle';
  //        var format = 'application/rdf+xml';
  //        var format = 'text/n3';
  //        var format = 'application/x-json+ld';

  return endPointUrl+'?default-graph-uri='+encodeURIComponent(uri) +
    '&query='+encodeURIComponent(query) +
    '&format='+encodeURIComponent(format);
}


function loadArtist(name, query, elem, service) {
  if (service === undefined) { service = false; }

    var formated_name = name.replace(/ /g,"_")
  var resource = 'http://dbpedia.org/resource/' + formated_name;

  //create rdf store
  var store = new rdf.LdpStore();
  // format query
  query = query.replace(/{artist}/g, decodeURIComponent(name));
  query = query.replace(/{artist_reg}/g, decodeURIComponent(name));

  // get sparql url request 
  var request = get_request(query, service);

  // load template into the main page
  $('#templates').load('templates.html');

 var promise = new Promise(function(resolve, reject) {
   //execute request and process the result trought the callback
   $('body').addClass('loading')
  store.graph(request, function(graph, error) {

    if (error == null) {
      uduvudu.process(graph, {
        resource: resource
      }, function(out) {
        // write the result of the processing in the main div
        if(graph.length === 0) {
          elem.html('<p> Noting Found </p>')
        } else {
          elem.html(out);
        }
        resolve(true); //free the promise
      });
    } else {
//      $('#main').html('<div class="alert alert-error" role="alert">Error: ' + error + '</div>');
    }
    $('body').removeClass('loading');
  });
});
  return promise;

} //end loadArtist

/**
 * display query3 as modal dialog
 */
function loadQ3(event, ele) {
  var identifier = decodeURIComponent(location.hash.slice(2));
  var link  = $(ele).attr('link');
  var q = q3_track.replace(/{release}/g, link)  ;
//   $('[data-tab=q3]').parent().addClass('active').siblings().removeClass('active')
   p = loadArtist(identifier, q, $('#q3'));
   p.then(function(finished){
   $('#release-modal-title').text($(ele).text());

     $('[role=duration]').each(function () {
       duration =msToTime($(this).text());
       $(this).text(duration);
     });
     $('#release-modal').modal('show');


   });
         console.log($(ele).text());
}

function get_count(query, artist) {

 query = query.replace(/{artist}/g, artist);
 var request = get_request(query, false);
 var store = new rdf.LdpStore();
 var resource = 'http://linkedbrainz.org/_ArtistName';
 var total = 0;

 var promise = new Promise(function(resolve, reject) {
   store.graph(request, function(graph, error) {
     if (error == null) {
       console.debug('successfully loaded ' + graph.toArray().length + ' triples');
       console.log(graph.toArray());
       total = graph.toArray()[3].object.valueOf();
       resolve(total);
     } else {
       //TODO showErro
     }
   });
 });
  return promise;
}

