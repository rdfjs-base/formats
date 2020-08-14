export async function jsonLdParser () {
  const JsonLdParser = (await import('@rdfjs/parser-jsonld')).default

  return new JsonLdParser()
}

export async function n3Parser () {
  const N3Parser = (await import('@rdfjs/parser-n3')).default
  return new N3Parser()
}

export async function rdfXmlParser () {
  const module = await import('rdfxml-streaming-parser')

  let RdfXmlParser
  if (module.default) {
    RdfXmlParser = module.default.RdfXmlParser
  } else {
    RdfXmlParser = module.RdfXmlParser
  }

  return new RdfXmlParser()
}
