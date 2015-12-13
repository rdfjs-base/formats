var rdf = require('rdf-ext')
var JsonLdParser = require('rdf-parser-jsonld')
var MicrodataParser = require('rdf-parser-microdata')
var N3Parser = require('rdf-parser-n3')
var RdfXmlParser = require('rdf-parser-rdfxml')
var JsonLdSerializer = require('rdf-serializer-jsonld')
var N3Serializer = require('rdf-serializer-n3')
var NTriplesSerializer = require('rdf-serializer-ntriples')
var SparqlUpdateSerializer = require('rdf-serializer-sparql-update')


function register (handler, format, instance) {
  if (!(format in handler)) {
    handler[format] = instance
  }
}

function mixin (object) {
  object = object || {}
  object.parsers = object.parsers || new rdf.Parsers()
  object.serializers = object.serializers || new rdf.Serializers()

  register(object.parsers, 'application/ld+json', JsonLdParser)
  register(object.parsers, 'application/n-triples', N3Parser)
  register(object.parsers, 'application/rdf+xml', RdfXmlParser)
  register(object.parsers, 'application/xhtml+xml', MicrodataParser)
  register(object.parsers, 'text/html', MicrodataParser)
  register(object.parsers, 'text/n3', N3Parser)
  register(object.parsers, 'text/turtle', N3Parser)

  register(object.serializers, 'application/ld+json', new JsonLdSerializer({outputString: true}))
  register(object.serializers, 'application/n-triples', NTriplesSerializer)
  register(object.serializers, 'application/sparql-update', SparqlUpdateSerializer)
  register(object.serializers, 'text/n3', N3Serializer)
  register(object.serializers, 'text/turtle', N3Serializer)

  return object
}

module.exports = mixin
