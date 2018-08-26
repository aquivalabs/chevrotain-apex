const { createKeywordToken } = require('../_shared')
const { LEXER_MODE } = require('../../constants')

const Select = createKeywordToken({
  name: '[SELECT',
  pattern: /\[\s*SELECT/,
  label: "'[SELECT'",
  push_mode: LEXER_MODE.SOQL,
})

const From = createKeywordToken({
  name: 'FROM',
  pattern: /FROM/,
  label: "'FROM'",
})

const Where = createKeywordToken({
  name: 'WHERE',
  pattern: /WHERE/,
  label: "'WHERE'",
})

const Limit = createKeywordToken({
  name: 'LIMIT',
  pattern: /LIMIT/,
  label: "'LIMIT'",
})

const Order = createKeywordToken({
  name: 'ORDER',
  pattern: /ORDER/,
  label: "'ORDER'",
})

const By = createKeywordToken({
  name: 'BY',
  pattern: /BY/,
  label: "'BY'",
})

const In = createKeywordToken({
  name: 'IN',
  pattern: /IN/,
  label: "'IN'",
})

module.exports = {
  Select,
  From,
  Where,
  Limit,
  Order,
  By,
  In,
}
