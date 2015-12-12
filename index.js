var rdf = require('rdf-ext')
var JsonLdParser = require('rdf-parser-jsonld')
var MicrodataParser = require('rdf-parser-microdata')
var N3Parser = require('rdf-parser-n3')
var RdfXmlParser = require('rdf-parser-rdfxml')
var JsonLdSerializer = require('rdf-serializer-jsonld')
var N3Serializer = require('rdf-serializer-n3')
var NTriplesSerializer = require('rdf-serializer-ntriples')
var SparqlUpdateSerializer = require('rdf-serializer-sparql-update')

var register = function (handler, format, instance) {
  if (!(format in handler)) {
    handler[format] = instance
  }
}

register(rdf.parsers, 'application/ld+json', JsonLdParser)
register(rdf.parsers, 'application/n-triples', N3Parser)
register(rdf.parsers, 'application/rdf+xml', RdfXmlParser)
register(rdf.parsers, 'application/xhtml+xml', MicrodataParser)
register(rdf.parsers, 'text/html', MicrodataParser)
register(rdf.parsers, 'text/n3', N3Parser)
register(rdf.parsers, 'text/turtle', N3Parser)

register(rdf.serializers, 'application/ld+json', new JsonLdSerializer({outputString: true}))
register(rdf.serializers, 'application/n-triples', NTriplesSerializer)
register(rdf.serializers, 'application/sparql-update', SparqlUpdateSerializer)
register(rdf.serializers, 'text/n3', N3Serializer)
register(rdf.serializers, 'text/turtle', N3Serializer)

module.exports = {
  parsers: rdf.parsers,
  serializers: rdf.serializers
}
