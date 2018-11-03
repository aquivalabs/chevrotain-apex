const Parser = require('../src/index')

describe('annotationTypeDeclaration', () => {
  it('empty', () => {
    expect(Parser.parse('@interface A{}', (parser) => parser.annotationTypeDeclaration())).toEqual({
      type: 'ANNOTATION_TYPE_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      body: {
        type: 'ANNOTATION_TYPE_BODY',
        declarations: [],
      },
    })
  })
})
