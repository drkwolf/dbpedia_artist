var combineMatchers = [{
  matcherName: "releaseInfo",
  templateVariable: "release",
  abstractTemplate: "release",
  combineIds: ["title", "date", "place","link"],
  order: 21000
},{
  matcherName: "membersInfo",
  templateVariable: "artist",
  abstractTemplate: "artist",
  combineIds: ["name", "gender"],
  order: 21000
},{
  matcherName: "tracksInfo",
  templateVariable: "track",
  abstractTemplate: "track",
  combineIds: ["title", "duration"],
  order: 21000
},{
  matcherName: "artistInfo",
  templateVariable: "artistInfo",
  abstractTemplate: "artistInfo",
  combineIds: ["artistType", "gender", "ArtistWiki"],
  order: 82000
},{
  matcherName: "resultsInfo",
  abstractTemplate: "resultsInfo",
  combineIds: ["name"],
  order: 82000
},{
  matcherName: "seeAlsoInfo",
  templateVariable: "seeAlso",
  abstractTemplate: "seeAlso",
  combineIds: ["seeAlso", "comment"],
  order: 82000
}
];

var linkMatchers = [{
  matcherName: "seeAlsoLink",
  predicate: "http://linkedbrainz.org/seeAlso",
  templateVariable: "seeAlsoLink",
  abstractTemplate: "seeAlsoLink",
  order: 22000,
  linkIds: ["seeAlsoInfo"]
}];


var predicateMatchers = [{
  matcherName: "label",
  predicate: "http://www.w3.org/2000/01/rdf-schema#label",
  templateVariable: "label",
  abstractTemplate: "label",
  order: 90003
}, { //q2,
  matcherName: "gender",
  predicate: "http://xmlns.com/foaf/0.1/gender" ,
  templateVariable: "gender",
  abstractTemplate: "gender",
  order: 90000
}, {
  matcherName: "abstract",
  predicate: "http://dbpedia.org/ontology/abstract",
  templateVariable: "abstract",
  abstractTemplate: "abstract",
  order: 90001
}, {
  matcherName: "thumbnail",
  predicate: "http://dbpedia.org/ontology/thumbnail",
  templateVariable: "thumbnail",
  abstractTemplate: "thumbnail",
  order: 90002
}, {
  matcherName: "seeAlso",
  predicate: "http://www.w3.org/2000/01/rdf-schema#seeAlso",
  templateVariable: "seeAlso",
  abstractTemplate: "seeAlso",
  order: 90000
}
// ,{
//   matcherName: "comment",
//   predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
//   templateVariable: "comment",
//   abstractTemplate: "comment",
//   order: 90000
// },

];


