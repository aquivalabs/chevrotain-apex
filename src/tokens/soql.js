const { createKeywordToken } = require('./_shared')

const Select = createKeywordToken({
  name: 'SELECT',
  pattern: /SELECT/,
  label: "'SELECT'",
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

const Group = createKeywordToken({
  name: 'GROUP',
  pattern: /GROUP/,
  label: "'GROUP'",
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

const Count = createKeywordToken({
  name: 'COUNT',
  pattern: /COUNT/,
  label: "'COUNT'",
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
  Group,
  Order,
  By,
  Count,
  In,
}
