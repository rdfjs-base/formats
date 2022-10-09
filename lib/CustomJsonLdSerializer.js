import JsonLdSerializer from '@rdfjs/serializer-jsonld'

class CustomJsonLdSerializer extends JsonLdSerializer {
  constructor ({ ...args } = {}) {
    super({ encoding: 'string', ...args })
  }
}

export default CustomJsonLdSerializer
