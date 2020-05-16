export async function jsonLdParser() {
  const JsonLdParser = (await import('@rdfjs/parser-jsonld')).default

  return new JsonLdParser()
}

export async function n3Parser() {
  const N3Parser = (await import('@rdfjs/parser-n3')).default
  return new N3Parser()
}

export async function rdfXmlParser () {
  const { RdfXmlParser } = (await import('rdfxml-streaming-parser')).default
  return new RdfXmlParser()
}
