const { createKeywordToken, LSquareSelect } = require('../_shared')

const Select = createKeywordToken({
  name: 'Select',
  pattern: /SELECT/,
  label: "'SELECT'",
})

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

const Offset = createKeywordToken({
  name: 'Offset',
  pattern: /OFFSET/,
  label: "'OFFSET'",
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

const And = createKeywordToken({
  name: 'And',
  pattern: /AND/,
  label: "'AND'",
})

const Or = createKeywordToken({
  name: 'Or',
  pattern: /OR/,
  label: "'OR'",
})

const Asc = createKeywordToken({
  name: 'Asc',
  pattern: /ASC/,
  label: "'ASC'",
})

const Desc = createKeywordToken({
  name: 'Desc',
  pattern: /DESC/,
  label: "'DESC'",
})

const Nulls = createKeywordToken({
  name: 'Nulls',
  pattern: /NULLS/,
  label: "'NULLS'",
})

const First = createKeywordToken({
  name: 'First',
  pattern: /FIRST/,
  label: "'FIRST'",
})

const Last = createKeywordToken({
  name: 'Last',
  pattern: /LAST/,
  label: "'LAST'",
})

module.exports = {
  LSquareSelect,
  Select,
  From,
  Where,
  Limit,
  Offset,
  Order,
  By,
  In,
  Like,
  And,
  Or,
  Asc,
  Desc,
  Nulls,
  First,
  Last,
}
