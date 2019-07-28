# @rdfjs/formats-common

[![Build Status](https://travis-ci.org/rdfjs/formats-common.svg?branch=master)](https://travis-ci.org/rdfjs/formats-common)

[![npm version](https://img.shields.io/npm/v/@rdfjs/formats-common.svg)](https://www.npmjs.com/package/@rdfjs/formats-common)

This module bundles parsers and serializers for the most common RDF formats.
Instances of [SinkMap](https://github.com/rdfjs-base/sink-map) are used to handle different media types.

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
