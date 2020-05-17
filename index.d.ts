/// <reference types="node" />
import { Stream } from 'rdf-js';
import { SinkMap } from "@rdf-esm/sink-map";

export const parsers: SinkMap<import("events").EventEmitter, Stream>;
export const serializers: SinkMap<Stream, import("events").EventEmitter>;
