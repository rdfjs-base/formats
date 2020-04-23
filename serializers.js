export async function jsonLdSerializer () {
  const JsonLdSerializer = await import('@rdfjs/serializer-jsonld')

  return new JsonLdSerializer({ encoding: 'string' })
}

export async function nTriplesSerializer () {
  const NTriplesSerializer = await import('@rdfjs/serializer-ntriples')

  return new NTriplesSerializer()
}
