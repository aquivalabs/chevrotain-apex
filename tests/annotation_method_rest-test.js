const Parser = require('../src/index')

describe('annotationMethodRest', () => {
  it('identifier', () => {
    expect(Parser.parse('a()', (parser) => parser.annotationMethodRest())).toEqual({
      type: 'ANNOTATION_METHOD_REST',
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      defaultValue: undefined,
    })
  })
})
