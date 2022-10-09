import { RdfXmlParser } from 'rdfxml-streaming-parser'

class CustomRdfXmlParser extends RdfXmlParser {
  constructor ({ factory, ...args } = {}) {
    super({ ...args, dataFactory: factory })
  }
}

export default CustomRdfXmlParser
