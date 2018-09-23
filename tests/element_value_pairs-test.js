'use strict'
const Parser = require('../src/index')

describe('elementValuePairs', () => {
  it('single', () => {
    expect(
      // FIXME: unsupported syntax
      // Parser.parse("key=@Value", parser => parser.elementValuePairs())
      Parser.parse('key=false', (parser) => parser.elementValuePairs())
    ).toEqual({
      type: 'ELEMENT_VALUE_PAIRS',
      pairs: [
        {
          type: 'ELEMENT_VALUE_PAIR',
          key: {
            type: 'IDENTIFIER',
            value: 'key',
          },
          value: {
            type: 'QUALIFIED_NAME',
            type: 'BOOLEAN_LITERAL',
            value: 'false',
          },
        },
      ],
    })
  })

  it('multiple', () => {
    expect(
      // FIXME: unsupported syntax
      // Parser.parse('key1=@Value1,key2=@Value2', (parser) => parser.elementValuePairs())
      Parser.parse('key1=true,key2=false', (parser) => parser.elementValuePairs())
    ).toEqual({
      type: 'ELEMENT_VALUE_PAIRS',
      pairs: [
        {
          type: 'ELEMENT_VALUE_PAIR',
          key: {
            type: 'IDENTIFIER',
            value: 'key1',
          },
          value: {
            type: 'QUALIFIED_NAME',
            type: 'BOOLEAN_LITERAL',
            value: 'true',
          },
        },
        {
          type: 'ELEMENT_VALUE_PAIR',
          key: {
            type: 'IDENTIFIER',
            value: 'key2',
          },
          value: {
            type: 'QUALIFIED_NAME',
            type: 'BOOLEAN_LITERAL',
            value: 'false',
          },
        },
      ],
    })
  })
})
