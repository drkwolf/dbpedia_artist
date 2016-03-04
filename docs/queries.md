1. get artiste info from dbpedia :
<!:-- Queries 1 -->
 PREFIX dbpedia: <http://dbpedia.org/resource/>
 PREFIX Abs: <http://dbpedia.org/ontology/>
 SELECT ?abstract ?thumbnail,
 WHERE {
       dbpedia:"+artistName+" Abs:abstract ?abstract;
       Abs:thumbnail ?thumbnail .
       filter(langMatches(lang(?abstract) "+lang+"))
 }

2. get artiste releases :
<!--
artist_gid : artiste/gid
release : release/gid
-->
select  ?release ?title, date
where {
    ?artist_gid rdfs:label "artiste_name";
    foaf:made ?release.
    ?release dc:title ?title;
    dc:date ?date
}

3. get external url about artiste

select ?url
where {
    ?artist_gid rdfs:label "artiste_name";
    rdfs:seeAlso ?url.
}

4. artiste genre :

select ?gender
where {
    ?artist_gid rdfs:label "artiste_name";
    foaf:gender ?gender.
}

5. artiste twiter :
select ?twiter
where {
    ?artist_gid rdfs:label "artiste_name";
    foaf:account ?twiter.
}

6. artiste album
select  ?title ?lenght
where {
    ?artist_gid rdfs:label "artiste_name";
    foaf:made ?recording_id.
    ?recoding_id dc:title ? title;
    mo:duration ?lenght
}