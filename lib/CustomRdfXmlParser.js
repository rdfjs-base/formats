const { RdfXmlParser } = require('rdfxml-streaming-parser')

class CustomRdfXmlParser extends RdfXmlParser {
  constructor ({ factory, ...args } = {}) {
    super({ ...args, dataFactory: factory })
  }
}

module.exports = CustomRdfXmlParser
