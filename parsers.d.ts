import { Sink, Stream } from 'rdf-js';

type Parser = Sink<import("events").EventEmitter, Stream>

export function jsonLdParser(): Promise<Parser>
export function n3Parser(): Promise<Parser>
export function rdfXmlParser(): Promise<Parser>
