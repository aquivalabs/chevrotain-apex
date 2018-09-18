const { createKeywordToken, Select } = require('../_shared')

const From = createKeywordToken({
  name: 'From',
  pattern: /(FROM|from)/,
  label: "'FROM'",
})

const Where = createKeywordToken({
  name: 'Where',
  pattern: /(WHERE|where)/,
  label: "'WHERE'",
})

const Limit = createKeywordToken({
  name: 'Limit',
  pattern: /(LIMIT|limit)/,
  label: "'LIMIT'",
})

const Order = createKeywordToken({
  name: 'Order',
  pattern: /(ORDER|order)/,
  label: "'ORDER'",
})

const By = createKeywordToken({
  name: 'By',
  pattern: /(BY|by)/,
  label: "'BY'",
})

const In = createKeywordToken({
  name: 'In',
  pattern: /(IN|in)/,
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
