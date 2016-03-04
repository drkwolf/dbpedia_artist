- predicate matecher pour les requetes :
 - (dbpedia):
  {
    matcherName: "abstract",
    predicate: "http://dbpedia.org/ontology/abstract",
    templateVariable: "abstract",
    abstractTemplate: "abstract",
   },
   {
     matcherName: "abstract",
     predicate: "http://dbpedia.org/ontology/thumbnail",
     templateVariable: "thumbnail",
     abstractTemplate: "thumbnail",
   }

 - releases
    {
       matcherName: "title",
       predicate: "http://purl.org/dc/elements/1.1/title",
       templateVariable: "title",
       abstractTemplate: "title",
     },
     {
        matcherName: "abstract",
        predicate: "http://purl.org/dc/elements/1.1/date",
        templateVariable: "date",
        abstractTemplate: "date",
     }

- recording
{
 matcherName: "title",
 predicate: "http://purl.org/dc/elements/1.1/title",
 templateVariable: "title",
 abstractTemplate: "title",
},
{
  matcherName: "abstract",
  predicate: "http://purl.org/ontology/mo/duration",
  templateVariable: "lenght",
  abstractTemplate: "lenght",
}

- twiter:
{
      matcherName: "url_twiter",
      predicate: "http://xmlns.com/foaf/0.1/account",
      templateVariable: "url",
      abstractTemplate: "url",
},

- see Also
 {
             matcherName: "url_other",
             predicate: "http://www.w3.org/2000/01/rdf-schema#seeAlso",
             templateVariable: "url",
             abstractTemplate: "url",
 },