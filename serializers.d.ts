import { Sink, Stream } from 'rdf-js'

type Serializer = Sink<Stream, import("events").EventEmitter>

export function jsonLdSerializer(): Promise<Serializer>
export function nTriplesSerializer(): Promise<Serializer>
