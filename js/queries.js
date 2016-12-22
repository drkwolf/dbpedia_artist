/**
 * sparql prefixes
 * @type {string}
 */
var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbp: <http://dbpedia.org/property/>
`;

/**
 * query for
 * @type {string}
 */
var query = prefixes +`
construct {
?artist a dbo:Artist;
  dbo:abstract ?abstract;
  dbo:thumbnail ?thumbnail;
  dbo:album ?album;
  dbo:musicalBand ?band;
  dbp:birthDate ?bdate;
  foaf:homepage ?hpage;
  dbo:album ?album;
  dbo:album ?band;
  rdfs:comment ?comment;
  foaf:homepage ?hpage.
}
  WHERE {
    ?artist a dbo:Artist .
    ?artist rdfs:label "{artist}"@en .
    ?artist dbo:abstract ?abstract.

Optional{ ?artist dbo:thumbnail ?thumbnail. }
Optional{ ?artist dbp:birthDate ?bdate.}
Optional{ ?artist rdfs:comment ?comment. }
Optional { ?artist foaf:homepage ?hpage. }
Optional { ?artist  dbo:musicalBand ?band.  }

FILTER (langMatches(lang(?abstract),"en"))

} Limit 1
`;
