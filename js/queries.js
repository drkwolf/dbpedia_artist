var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#> 
PREFIX lkb: <http://linkedbrainz.org/>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
PREFIX ov: <http://open.vocab.org/terms/>
`;
var query = prefixes +`
construct {
?artist a dbpedia-owl:MusicalArtist;
 dbpedia-owl:abstract ?abstract;
      dbpedia-owl:thumbnail ?thumbnail;
rdfs:comment ?comment.   
}
  WHERE {
    ?artist a dbpedia-owl:MusicalArtist .
    ?artist rdfs:label "{artist}"@en .
    ?artist dbpedia-owl:abstract ?abstract.
Optional{
        ?artist dbpedia-owl:thumbnail ?thumbnail.
        ?artist rdfs:comment ?comment.
    }
   FILTER (langMatches(lang(?abstract),"en"))
} 
`;
var q1 = prefixes +`
construct {
  lkb:_ArtistName a mo:MusicArtist;
      lkb:artistName '{artist}';
      lkb:ArtistType ?type;
      foaf:isPrimaryTopicOf ?url;
      foaf:gender ?gender;
      dbpedia-owl:abstract ?abstract ;
      dbpedia-owl:thumbnail ?thumbnail;
      lkb:members ?members.
     
  ?members a lkb:members;
    foaf:name ?name;
    foaf:gender ?m_gender.
}
where {
  ?artist_gid foaf:name '{artist}';
  rdf:type ?type.
  OPTIONAL {?artist_gid foaf:gender ?gender .}.
  OPTIONAL {
	  ?artist_gid foaf:isPrimaryTopicOf ?url.
  SERVICE <http://dbpedia.org/sparql> {
         ?dbpedia_url foaf:isPrimaryTopicOf  ?url;
         dbpedia-owl:abstract ?abstract ;
        dbpedia-owl:thumbnail ?thumbnail .

   FILTER (langMatches(lang(?abstract),"en"))
  }
}
  OPTIONAL {
  ?members mo:member_of ?artist_gid;
    foaf:name ?name;
    foaf:gender ?m_gender.
  }

 FILTER (?type != <http://purl.org/ontology/mo/MusicArtist>)
}
`;
