var combineMatchers = [{
  matcherName: "personCard",
  abstractTemplate: "personCard",
  combineIds: ["depiction", "homepage", "mbox", "phone", "room"],
  order: 21000
}, {
  matcherName: "projectCombine",
  templateVariable: "project",
  abstractTemplate: "project",
  combineIds: ["rdfschema_label", "homepage", "abstract", "rdfschema_logo"],
  order: 200
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
  matcherName: "abstract",
  predicate: "http://purl.org/dc/terms/abstract",
  templateVariable: "abstract",
  abstractTemplate: "abstract",
  order: 1100000
}, {
  matcherName: "projects",
  predicate: "http://eis.iai.uni-bonn.de/Projects/",
  templateVariable: "project",
  abstractTemplate: "project",
  order: 1100000
}, {
  matcherName: "rdfschema_logo",
  predicate: "http://xmlns.com/foaf/0.1/logo",
  templateVariable: "logo_url",
  abstractTemplate: "void",
  order: 100
}, {
  matcherName: "rdfschema_label",
  predicate: "http://www.w3.org/2000/01/rdf-schema#label",
  templateVariable: "title",
  abstractTemplate: "void",
  order: 100
}, {
  matcherName: "foaf_name",
  predicate: "http://xmlns.com/foaf/0.1/name",
  templateVariable: "title",
  abstractTemplate: "title",
  order: 100000
}, {
  matcherName: "homepage",
  predicate: "http://xmlns.com/foaf/0.1/homepage",
  templateVariable: "website",
  abstractTemplate: "void",
  order: 20000
}, {
  matcherName: "depiction",
  predicate: "http://xmlns.com/foaf/0.1/depiction",
  templateVariable: "img_url",
  abstractTemplate: "img",
  order: 90000
}, {
  matcherName: "mbox",
  predicate: "http://xmlns.com/foaf/0.1/mbox",
  templateVariable: "email",
  abstractTemplate: "void",
  order: 90000
}, {
  matcherName: "phone",
  predicate: "http://xmlns.com/foaf/0.1/phone",
  templateVariable: "phone",
  abstractTemplate: "phone",
  order: 90000
}, {
  matcherName: "room",
  predicate: "http://eis.iai.uni-bonn.de/schema/room",
  templateVariable: "address",
  abstractTemplate: "address",
  order: 90000
}, {
  matcherName: "content",
  predicate: "http://ns.ontowiki.net/SysOnt/Site/content",
  templateVariable: "markdown",
  abstractTemplate: "markdown",
  order: 100
}, {
  matcherName: "description",
  predicate: "http://purl.org/dc/terms/description",
  templateVariable: "markdown",
  abstractTemplate: "markdown",
  order: 100
}];
