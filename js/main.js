/**
 * @type {String} : endpoint url
 */
var endPointUrl = 'https://dbpedia.org/sparql';

/**
 * @type {String} :  graph uri
 */
var uri         = 'http://dbpedia.org';

var getArtistHint = function(q, syncResults, asyncResults) {
    $.ajax(
      "http://lookup.dbpedia.org/api/search/KeywordSearch?QueryClass=artist&QueryLang=en&MaxHits=15&QueryString="+q,
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
      loadArtist(identifier, query, $('#q1'), false);
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
 * generate request url, which is composed the following query strings :
 *   endpoint : server url
 *   default-graph-uri : (query with Service must not have this string)
 *   query: sparql qurey
 *   format: response format,
 *   endpointUrl?default-graph-uri={uri}&query={query}&format={format}
 *
 * @param String query: sparql query
 * @param String [format='text/turtle']: response format 
 *
 * @return String
 */
function get_request(query, format) {
    var format = format || 'text/turtle'; // 'application/rdf+xml'; // 'text/n3'; // 'application/x-json+ld';
    //noinspection JSAnnotator
    return endPointUrl+'?default-graph-uri='+encodeURIComponent(uri) + '&query='+encodeURIComponent(query) + '&format='+encodeURIComponent(format);
}

/**
 * send request to sparql endpoint and render the result
 * @param name
 * @param query
 * @param elem
 * @returns {Promise}
 */
function loadArtist(name, query, elem) {

    var formated_name = name.replace(/ /g,"_"); // dbpeida need it
    var resource = 'http://dbpedia.org/resource/' + formated_name; // uduvudu need this to match result
    console.log(name)

    var store = new rdf.LdpStore(); //create rdf store
    query = query.replace(/{artist}/g, decodeURIComponent(name)); // format query
    var request = get_request(query); // get sparql url request

    $('#templates').load('templates.html'); // load template

    var promise = new Promise(function(resolve, reject) {
        $('body').addClass('loading')
        store.graph(request, function(graph, error) {
            if (error == null) {
                uduvudu.process(graph, {
                    resource: resource
                }, function(out) { // write the result of the processing in the main div
                    if(graph.length === 0) {
                        elem.html('<p> Noting Found </p>')
                    } else {
                        elem.html(out);
                    }
                    resolve(true); // release the promise
                });
            } else {
                // $('#main').html('<div class="alert alert-error" role="alert">Error: ' + error + '</div>');
            }
            $('body').removeClass('loading');
        });
    });
    return promise;

} //end loadArtist
