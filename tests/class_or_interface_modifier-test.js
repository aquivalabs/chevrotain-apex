const Parser = require('../src/index')

describe('classOrInterfaceModifier', () => {
  it('public', () => {
    expect(Parser.parse('public', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'public',
    })
  })

  it('protected', () => {
    expect(Parser.parse('protected', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'protected',
    })
  })

  it('private', () => {
    expect(Parser.parse('private', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'private',
    })
  })

  it('static', () => {
    expect(Parser.parse('static', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'static',
    })
  })

  it('abstract', () => {
    expect(Parser.parse('abstract', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'abstract',
    })
  })

<<<<<<< HEAD
  it('with sharing', () => {
    expect(Parser.parse('with sharing', (parser) => parser.sharingModifier())).toEqual({
      type: 'SHARING_MODIFIER',
      value: 'with sharing',
    })
  })

  it('without sharing', () => {
    expect(Parser.parse('without sharing', (parser) => parser.sharingModifier())).toEqual({
      type: 'SHARING_MODIFIER',
      value: 'without sharing',
    })
  })

  it('inherit sharing', () => {
    expect(Parser.parse('inherit sharing', (parser) => parser.sharingModifier())).toEqual({
      type: 'SHARING_MODIFIER',
      value: 'inherit sharing',
    })
  })

  it('testmethod', () => {
    expect(Parser.parse('testmethod', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'testmethod',
    })
  })

  it('final', () => {
    expect(Parser.parse('final', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'MODIFIER',
      value: 'final',
    })
  })

  it('annotation', () => {
    expect(Parser.parse('@Bean', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'ANNOTATION',
      name: {
        type: 'QUALIFIED_NAME',
        name: [
          {
            type: 'IDENTIFIER',
            value: 'Bean',
          },
        ],
      },
      hasBraces: false,
    })
  })

  it('annotation with braces', () => {
    expect(Parser.parse('@Bean()', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'ANNOTATION',
      name: {
        type: 'QUALIFIED_NAME',
        name: [
          {
            type: 'IDENTIFIER',
            value: 'Bean',
          },
        ],
      },
      hasBraces: true,
      values: undefined,
    })
  })

  it('annotation with element value pairs', () => {
    expect(Parser.parse('@Bean(key=true)', (parser) => parser.classOrInterfaceModifier())).toEqual({
      type: 'ANNOTATION',
      name: {
        type: 'QUALIFIED_NAME',
        name: [
          {
            type: 'IDENTIFIER',
            value: 'Bean',
          },
        ],
      },
      hasBraces: true,
      values: [
        {
          type: 'ELEMENT_VALUE_PAIR',
          key: {
            type: 'IDENTIFIER',
            value: 'key',
          },
          value: {
            type: 'BOOLEAN_LITERAL',
            value: 'true',
          },
        },
      ],
    })
  })
})
