var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
`;
var query = prefixes +`
construct {
?artist a dbpedia-owl:Artist;
 dbpedia-owl:abstract ?abstract;
      dbpedia-owl:thumbnail ?thumbnail;
rdfs:comment ?comment.   
}
  WHERE {
    ?artist a dbpedia-owl:Artist .
    ?artist rdfs:label "{artist}"@en .
    ?artist dbpedia-owl:abstract ?abstract.
Optional{
        ?artist dbpedia-owl:thumbnail ?thumbnail.
        ?artist rdfs:comment ?comment.
    }
   FILTER (langMatches(lang(?abstract),"en"))
} Limit 1

`;
