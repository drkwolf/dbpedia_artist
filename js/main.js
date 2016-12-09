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
    document.title = identifier + ' | DBpeida  Search';
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
function get_request(query format) {
  var format = format || 'text/turtle';
  //        var format = 'application/rdf+xml';
  //        var format = 'text/n3';
  //        var format = 'application/x-json+ld';

  return endPointUrl+'?default-graph-uri='+encodeURIComponent(uri) +
    '&query='+encodeURIComponent(query) +
    '&format='+encodeURIComponent(format);
}


function loadArtist(name, query, elem) {

    var formated_name = name.replace(/ /g,"_"); // dbpeida need it
    var resource = 'http://dbpedia.org/resource/' + formated_name; // uduvudu need this to match result

    var store = new rdf.LdpStore(); //create rdf store
    query = query.replace(/{artist}/g, decodeURIComponent(name)); // format query
    var request = get_request(query); // get sparql url request

    $('#templates').load('templates.html'); // load template

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
                // $('#main').html('<div class="alert alert-error" role="alert">Error: ' + error + '</div>');
            }
            $('body').removeClass('loading');
        });
    });
    return promise;

} //end loadArtist
