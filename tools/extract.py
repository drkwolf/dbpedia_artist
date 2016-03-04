import rdflib

g = rdflib.Graph()
result = g.parse("manowar/manowar.nt", format="nt")
#result = g.parse("area.nt", format="nt")

# print("graph has %s statements." % len(g))

# get classes
prefixes ='\
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
        PREFIX owl: <http://www.w3.org/2002/07/owl#>\
        PREFIX dct: <http://purl.org/dc/terms/>\
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
        PREFIX sim: <http://purl.org/ontology/similarity/>\
        PREFIX mo: <http://purl.org/ontology/mo/>\
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
        PREFIX ob: <http://open.vocab.org/terms/>\
        PREFIX mbz: <http://test.musicbrainz.org/>\
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
        PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\
        PREFIX rr: <http://www.w3.org/ns/r2rml#> \
        PREFIX lb: <https://github.com/LinkedBrainz/r2rml/v0.1#> \
        PREFIX ngs: <http://musicbrainz.org/NGS> \
        PREFIX dc: <http://purl.org/dc/elements/1.1/>  \
        PREFIX event: <http://purl.org/NET/c4dm/event.owl#> \
        PREFIX is: <http://purl.org/ontology/is/core#> \
        PREFIX isi: <http://purl.org/ontology/is/inst/> \
        PREFIX time: <http://www.w3.org/2006/time#> \
        PREFIX tl: <http://purl.org/NET/c4dm/timeline.owl#> \
         '
qclass = prefixes 

# qclass += 'SELECT DISTINCT ?class WHERE { [] a ?class } ORDER BY ?class'
# label =  'select  ?label where { ?x rdfs:label ?label . }'
artistes = 'select  DISTINCT ?x ?sname where {\
        ?x ob:sortLabel ?sname .\
        }' 

"""
return the name of the function
"""
def get_query(name):
    return "SELECT ?band ?dbpedia \
            WHERE {\
                ?band foaf:name 'Manowar';\
                owl:sameAs ?dbpedia .\
            }"

qres = g.query(prefixes + get_query('name'))
print(qres)

artlist = 'var people = ['
for url, name in qres:
    print url+' '+ name
    artlist += '"'+name+'",\r\n'
    # print(unicode(row[0]))

# artlist += ']'
# text_file = open("js/people.js", "w")
# text_file.write(artlist.encode("UTF-8"))
# text_file.close()
# s = g.serialize(format='n3')
