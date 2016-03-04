var t_start, t_loaded, t_end;

var language = 'en';
var rdfstring;

// initialize type ahead
$('#identifier-search').typeahead({
    source: people, // static source
    updater: function (selected) {
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
        loadFromSource('http://dbpedia.org/sparql', identifier);
        $('#identifier-search').val(identifier);
        document.title = identifier + ' | Uduvudu Demo';
    } else {

    }
}


function getQeury(artistName, lang, source) {
    var query = [
    "PREFIX dbpedia: <http://dbpedia.org/resource/>",
    "PREFIX Abs: <http://dbpedia.org/ontology/>",
    "SELECT ?abstract ?thumbnail",
    "WHERE {",
      "dbpedia:"+artistName+" Abs:abstract ?abstract;",
      "Abs:thumbnail ?thumbnail .",
      "filter(langMatches(lang(?abstract),\""+lang+"\"))",
    "}"].join(" ");

    var queryUrl = source+"?query="+ encodeURIComponent(query) +"&format=text/turtle";

    $.ajax({
        // dataType: "jsonp",
        dataType: "text",
        url: queryUrl,
        success: function (_data) {

            rdfstring = _data;

            console.log(rdfstring);
            rdf.parseTurtle(rdfstring, function (graph, error) {
                console.log('parsing');
                if (error == null) {
                    uduvudu.process(
                        graph,
                        {'resource': source, 'language': language},
                        function (out) {
                            $("#main").html(out);
                            t_end = +new Date();
                            $("#footer").html('<p>Loaded in ' + (t_loaded - t_start) + 'ms; Processed in ' + (t_end - t_loaded) + 'ms</p>');
                        }
                    );
                } else {
                    console.log(error, rdfstring);
                };
            });
        }
    });
}

// TODO implement a lookup
var dbpedia = function() {
    return function findMatches(q, cb) {
        $.ajax(
            "http://lookup.uduvudu.org/api/search/PrefixSearch?QueryClass=&MaxHits=15&QueryString="+q,
            {dataType: "json"}
        ).done(function(data) {
                cb(_.sortBy(_.sortBy(data.results, function(b){return b.label.length}),function(s){return -s.label.search(new RegExp('^'+q,'i'))}));
            });
    };
};



//TODO implment
//document.getElementById('language').onchange = function (e) {
//    language = this.options[this.selectedIndex].value;
//    if (uduvudu.options) {
//        t_loaded = t_start =  +new Date();
//        uduvudu.process(undefined, {'language': language});
//    };
//};

// prepare visualizer templates for uduvudu
$("#visualizer").load("visualizer.html");

// helper to decipher the get query
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadFromSource(source, resource) {
    t_start = +new Date();
    $("#main").html('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button> <strong>Loading</strong> ' + source + ' is being loaded ...</div>');

    //ldf.Logger.setLevel('warning');
    //var fragmentsClient = new ldf.FragmentsClient('http://fragments.dbpedia.org/2014/en');
    //var ldfquery = 'CONSTRUCT { <'+source+'> ?p ?o. ?o <http://www.w3.org/2000/01/rdf-schema#label> ?l} WHERE {<'+source+'> ?p ?o. OPTIONAL {?o <http://www.w3.org/2000/01/rdf-schema#label> ?l.}} LIMIT 100000';
    //var ldfquery = 'CONSTRUCT { <'+source+'> ?p ?o.} WHERE {<'+source+'> ?p ?o.} LIMIT 10000';

    t_loaded = +new Date();

    $("#main").html('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button> <strong>Processing</strong> ' + source + ' is being processed ...</div>');
    //defined in rdf-ext
    getQeury(resource, 'en', source);


}

// if uri is specified in title get it
//var uri = getParameterByName('res');
//if (uri != '') {
//    loadFromSource(uri, uri);
//}

//$('#chooser .typeahead').on('typeahead:selected', function (event, d) {
//    var uri = d.uri;
//    loadFromSource(uri, d.uri);
//});

//$('#setSource').on('keyup', function() {
//    loadFromSource(this.value, $('#setResource').val());
//});
//
//$('#setResource').on('keyup', function() {
//    loadFromSource($('#setSource').val(), this.value);
//});

//$('#selectSource').on('change', function(event) {
//    loadFromSource(this.value, event.target.selectedOptions[0].attributes['data-res'].nodeValue);
//
//});