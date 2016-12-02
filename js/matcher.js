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
  matcherName: "releaseLink",
  predicate: "http://linkedbrainz.org/release",
  templateVariable: "releaseLink",
  abstractTemplate: "releaseLink",
  order: 22000,
  linkIds: ["releaseInfo"]
},{ 
  matcherName: "membersLink",
  predicate: "http://linkedbrainz.org/members",
  templateVariable: "membersLink",
  abstractTemplate: "membersLink",
  order: 22000,
  linkIds: ["membersInfo"]
},{ 
  matcherName: "tracksLink",
  predicate: "http://linkedbrainz.org/track",
  templateVariable: "tracksLink",
  abstractTemplate: "tracksLink",
  order: 22000,
  linkIds: ["tracksInfo"]
},{ 
  matcherName: "resultsLink",
  predicate: "http://linkedbrainz.org/results",
  templateVariable: "resultsLink",
  abstractTemplate: "resultsLink",
  order: 22000,
  linkIds: ["resultsInfo"]
},{ 
  matcherName: "seeAlsoLink",
  predicate: "http://linkedbrainz.org/seeAlso",
  templateVariable: "seeAlsoLink",
  abstractTemplate: "seeAlsoLink",
  order: 22000,
  linkIds: ["seeAlsoInfo"]
}
];


var predicateMatchers = [{
  matcherName: "date",
  predicate: "http://purl.org/dc/elements/1.1/date",
  templateVariable: "date",
  abstractTemplate: "date",
  order: 90000
},{
  matcherName: "label",
  predicate: "http://www.w3.org/2000/01/rdf-schema#label",
  templateVariable: "label",
  abstractTemplate: "label",
  order: 90003
}, {
  matcherName: "title",
  predicate: "http://purl.org/dc/elements/1.1/title",
  templateVariable: "title",
  abstractTemplate: "title",
  order: 90000
}, {
  matcherName: "place",
  predicate: "http://purl.org/NET/c4dm/event.owl#place",
  templateVariable: "place",
  abstractTemplate: "place",
  order: 90000
},/* {
  matcherName: "ArtistType",
  predicate: "http://linkedbrainz.org/ArtistType",
  templateVariable: "artistType",
  abstractTemplate: "artistType",
  order: 10000
}, */ {
  matcherName: "link",
  predicate: "http://linkedbrainz.org/link",
  templateVariable: "link",
  abstractTemplate: "link",
  order: 90000
}, {
  matcherName: "duration",
  predicate: "http://purl.org/ontology/mo/duration",
  templateVariable: "duration",
  abstractTemplate: "duration",
  order: 90000
},{
  matcherName: "TypeGroup",
  predicate: "http://purl.org/ontology/mo/MusicGroup",
  templateVariable: "TypeGroup",
  abstractTemplate: "TypeGroup",
  order: 10000
},/*{
  matcherName: "ArtistWiki",
  predicate: "http://xmlns.com/foaf/0.1/isPrimaryTopicOf" ,
  templateVariable: "ArtistWiki",
  abstractTemplate: "ArtistWiki",
  order: 10000
}, */{ //q2,
  matcherName: "gender",
  predicate: "http://xmlns.com/foaf/0.1/gender" ,
  templateVariable: "gender",
  abstractTemplate: "gender",
  order: 90000
}, {
  matcherName: "releases",
  predicate: "http://musicbrainz.org/release",
  templateVariable: "release",
  abstractTemplate: "release",
  order: 1100000
} , {
  matcherName: "artists",
  predicate: "http://musicbrainz.org/artist",
  templateVariable: "artist",
  abstractTemplate: "artist",
  order: 1100000
},  {
  matcherName: "tracks",
  predicate: "http://musicbrainz.org/track",
  templateVariable: "track",
  abstractTemplate: "track",
  order: 1100000
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
  matcherName: "name",
  predicate: "http://xmlns.com/foaf/0.1/name",
  templateVariable: "name",
  abstractTemplate: "name",
  order: 90000
}, {
  matcherName: "artistname",
  predicate: "http://linkedbrainz.org/artistName",
  templateVariable: "artistname",
  abstractTemplate: "artistname",
  order: 91000
},{
  matcherName: "seeAlso",
  predicate: "http://www.w3.org/2000/01/rdf-schema#seeAlso",
  templateVariable: "seeAlso",
  abstractTemplate: "seeAlso",
  order: 90000
},{
  matcherName: "comment",
  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
  templateVariable: "comment",
  abstractTemplate: "comment",
  order: 90000
},

];


