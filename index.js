const rdf = require('rdf-ext')
const JsonLdParser = require('rdf-parser-jsonld')
const N3Parser = require('rdf-parser-n3')
const JsonLdSerializer = require('rdf-serializer-jsonld-ext')
const NTriplesSerializer = require('rdf-serializer-ntriples')

function register (handler, format, instance) {
  if (!(format in handler)) {
    handler[format] = instance
  }
}

function mixin (object) {
  object = object || {}
  object.parsers = object.parsers || new rdf.Parsers()
  object.serializers = object.serializers || new rdf.Serializers()

  register(object.parsers, 'application/ld+json', new JsonLdParser({factory: rdf}))
  register(object.parsers, 'application/trig', new N3Parser({factory: rdf}))
  register(object.parsers, 'application/n-quads', new N3Parser({factory: rdf}))
  register(object.parsers, 'application/n-triples', new N3Parser({factory: rdf}))
  register(object.parsers, 'text/n3', new N3Parser({factory: rdf}))
  register(object.parsers, 'text/turtle', new N3Parser({factory: rdf}))

  register(object.serializers, 'application/ld+json', new JsonLdSerializer({outputFormat: 'string'}))
  register(object.serializers, 'application/n-triples', new NTriplesSerializer())
  register(object.serializers, 'text/n3', new NTriplesSerializer())
  register(object.serializers, 'text/turtle', new NTriplesSerializer())

  return object
}

module.exports = mixin
