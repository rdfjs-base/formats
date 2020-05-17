# @rdfjs/formats-common

![](https://github.com/rdf-esm/formats-common/workflows/Test/badge.svg)

[![npm version](https://img.shields.io/npm/v/@rdfjs/formats-common.svg)](https://www.npmjs.com/package/@rdfjs/formats-common)

This module bundles parsers and serializers for the most common RDF formats.
Instances of [SinkMap](https://github.com/rdfjs-base/sink-map) are used to handle different media types.

## Fork alert :exclamation:

This package is an ES Modules fork of [@rdfjs/formats-common](https://npm.im/@rdfjs/formats-common).

It uses a [lazy version os `SinkMap`](https://github.com/rdf-esm/sink-map) to dynamically load the sinks.

This way bundlers like webpack will create chunks for them and only load them when they are first needed.

## Usage

The formats object has a `parsers` and `serializers` property.
Each of it is an instance of `SinkMap` with the most common RDF media types as key.

## Example

```javascript
const formats = require('@rdfjs/formats-common')
const Readable = require('stream').Readable

const input = new Readable({
  read: () => {
    input.push(`
      PREFIX s: <http://schema.org/>

      [] a s:Person ;
        s:jobTitle "Professor" ;
        s:name "Jane Doe" ;
        s:telephone "(425) 123-4567" ;
        s:url <http://www.janedoe.com> .
    `)
    input.push(null)
  }
})

const output = formats.parsers.import('text/turtle', input)

output.on('data', quad => {
  console.log(`quad: ${quad.subject.value} - ${quad.predicate.value} - ${quad.object.value}`)
})

output.on('prefix', (prefix, ns) => {
  console.log(`prefix: ${prefix} ${ns.value}`)
})
```
