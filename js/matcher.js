var combineMatchers = [{
  matcherName: "artistRelease",
  abstractTemplate: "artistRelease",
  combineIds: ["artistName", "releaseTitle", "releaseDate", "releasePlace"],
  order: 21000
}];

var linkMatchers = [{
  matcherName: "projectLink",
  predicate: "http://xmlns.com/foaf/0.1/currentProject",
  templateVariable: "projectLink",
  abstractTemplate: "projectLink",
  order: 20000,
  linkIds: ["projectCombine"]
}];

var predicateMatchers = [{
  matcherName: "releaseDate",
  predicate: "http://purl.org/dc/elements/1.1/date",
  templateVariable: "date",
  abstractTemplate: "void",
  order: 1100000
},{
  matcherName: "name",
  predicate: "http://xmlns.com/foaf/0.1/name",
  templateVariable: "artist_name",
  abstractTemplate: "name",
  order: 90000
}, {
  matcherName: "releaseTitle",
  predicate: "http://xmlns.com/foaf/0.1/made",
  templateVariable: "title",
  abstractTemplate: "title",
  order: 90000
}, {
  matcherName: "releasePlace",
  predicate: "http://purl.org/NET/c4dm/event.owl#place",
  templateVariable: "place",
  abstractTemplate: "void",
  order: 90000
}
];
