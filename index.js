var JsonLdParser = require('rdf-parser-jsonld')
var MicrodataParser = require('rdf-parser-microdata')
var N3Parser = require('rdf-parser-n3')
var RdfXmlParser = require('rdf-parser-rdfxml')
var JsonLdSerializer = require('rdf-serializer-jsonld')
var N3Serializer = require('rdf-serializer-n3')
var NTriplesSerializer = require('rdf-serializer-ntriples')
var SparqlUpdateSerializer = require('rdf-serializer-sparql-update')

function ParserUtil (parsers) {
  var self = this

  Object.keys(parsers).forEach(function (mimeType) {
    self[mimeType] = parsers[mimeType]
  })
}

ParserUtil.prototype.list = function () {
  var propertyBlackList = ['list', 'findParsers', 'parse', 'process', 'stream']

  return Object.keys(this)
    .filter(function (property) {
      return propertyBlackList.indexOf(property) === -1
    })
}

ParserUtil.prototype.findParsers = function (mimeType) {
  if (!(mimeType in this)) {
    return null
  }

  var parsers = this[mimeType]

  if (!Array.isArray(parsers)) {
    parsers = [parsers]
  }

  return parsers
}

ParserUtil.prototype.parse = function (mimeType, data, callback, base, filter, graph) {
  var parsers = this.findParsers(mimeType)

  if (!parsers) {
    return Promise.reject('no parser for mime type: ' + mimeType + ' found')
  }

  // TODO: try other parsers on error
  return parsers.shift().parse(data, callback, base, filter, graph)
}

ParserUtil.prototype.process = function (mimeType, data, callback, base, filter, done) {
  var parsers = this.findParsers(mimeType)

  if (!parsers) {
    return Promise.reject('no parser for mime type: ' + mimeType + ' found')
  }

  // TODO: try other parsers on error
  return parsers.shift().process(data, callback, base, filter, done)
}

ParserUtil.prototype.stream = function (mimeType, inputStream, base, filter) {
  var parsers = this.findParsers(mimeType)

  if (!parsers) {
    return null
  }

  // TODO: try other parsers on error
  return parsers.shift().stream(inputStream, base, filter)
}

function SerializerUtil (serializers) {
  var self = this

  Object.keys(serializers).forEach(function (mimeType) {
    self[mimeType] = serializers[mimeType]
  })
}

SerializerUtil.prototype.list = function () {
  var propertyBlackList = ['list', 'findSerializer', 'serialize', 'stream']

  return Object.keys(this)
    .filter(function (property) {
      return propertyBlackList.indexOf(property) === -1
    })
}

SerializerUtil.prototype.findSerializer = function (mimeType) {
  if (!(mimeType in this)) {
    return null
  }

  return this[mimeType]
}

SerializerUtil.prototype.serialize = function (mimeType, graph, callback) {
  var serializer = this.findSerializer(mimeType)

  if (!serializer) {
    return Promise.reject('no serializer for mime type: ' + mimeType + ' found')
  }

  return serializer.serialize(graph, callback)
}

SerializerUtil.prototype.stream = function (mimeType, inputStream, base, filter) {
  var serializer = this.findSerializer(mimeType)

  if (!serializer) {
    return null
  }

  return serializer.stream(inputStream, base, filter)
}

module.exports = {
  parsers: new ParserUtil({
    'application/ld+json': JsonLdParser,
    'application/n-triples': N3Parser,
    'application/rdf+xml': RdfXmlParser,
    'application/xhtml+xml': MicrodataParser,
    'text/html': MicrodataParser,
    'text/n3': N3Parser,
    'text/turtle': N3Parser
  }),
  serializers: new SerializerUtil({
    'application/ld+json': new JsonLdSerializer({outputString: true}),
    'application/n-triples': NTriplesSerializer,
    'application/sparql-update': SparqlUpdateSerializer,
    'text/n3': N3Serializer,
    'text/turtle': N3Serializer
  }),
  ParserUtil: ParserUtil,
  SerializerUtil: SerializerUtil
}
