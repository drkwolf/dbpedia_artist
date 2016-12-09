/**
 * sparql prefixes
 * @type {string}
 */
var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbo: <http://dbpedia.org/ontology/>
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
    rdfs:comment ?comment.   
}
  WHERE {
    ?artist a dbo:Artist .
    ?artist rdfs:label "{artist}"@en .
    ?artist dbo:abstract ?abstract.
Optional{
        ?artist dbo:thumbnail ?thumbnail.
    }
    Optional{
        ?artist rdfs:comment ?comment.
    }
Optional {
        ?artist dbo:album ?album.
        ?artist  dbo:musicalBand ?band.
}
Optional {
        ?artist  dbo:musicalBand ?band.
}
   FILTER (langMatches(lang(?abstract),"en"))
} Limit 1
`;
