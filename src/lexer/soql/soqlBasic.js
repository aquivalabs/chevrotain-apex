const { createKeywordToken, Select } = require('../_shared')

const From = createKeywordToken({
  name: 'From',
  pattern: /FROM/,
  label: "'FROM'",
})

const Where = createKeywordToken({
  name: 'Where',
  pattern: /WHERE/,
  label: "'WHERE'",
})

const Limit = createKeywordToken({
  name: 'Limit',
  pattern: /LIMIT/,
  label: "'LIMIT'",
})

const Order = createKeywordToken({
  name: 'Order',
  pattern: /ORDER/,
  label: "'ORDER'",
})

const By = createKeywordToken({
  name: 'By',
  pattern: /BY/,
  label: "'BY'",
})

const In = createKeywordToken({
  name: 'In',
  pattern: /IN/,
  label: "'IN'",
})

const Like = createKeywordToken({
  name: 'Like',
  pattern: /LIKE/,
  label: "'LIKE'",
})

module.exports = {
  Select,
  From,
  Where,
  Limit,
  Order,
  By,
  In,
  Like,
}
