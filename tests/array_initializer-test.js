'use strict'
const Parser = require('../src/index')

describe('arrayOrMapInitializer', () => {
  it('empty', () => {
    expect(Parser.parse('{}', (parser) => parser.arrayOrMapInitializer())).toEqual({
      type: 'ARRAY_INITIALIZER',
      variableInitializers: [],
    })
  })

  it('with variable initializer', () => {
    expect(Parser.parse('{this}', (parser) => parser.arrayOrMapInitializer())).toEqual({
      type: 'ARRAY_INITIALIZER',
      variableInitializers: [
        {
          type: 'THIS',
        },
      ],
    })
  })

  it('comma after last element', () => {
    expect(Parser.parse('{this,super,}', (parser) => parser.arrayOrMapInitializer())).toEqual({
      type: 'ARRAY_INITIALIZER',
      variableInitializers: [
        {
          type: 'THIS',
        },
        {
          type: 'SUPER',
        },
      ],
    })
  })
})
