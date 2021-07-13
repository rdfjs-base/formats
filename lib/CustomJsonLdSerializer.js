const JsonLdSerializer = require('@rdfjs/serializer-jsonld')

class CustomJsonLdSerializer extends JsonLdSerializer {
  constructor ({ ...args } = {}) {
    super({ encoding: 'string', ...args })
  }
}

module.exports = CustomJsonLdSerializer
