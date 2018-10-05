const { createKeywordToken } = require('../_shared')

const CountDistinct = createKeywordToken({
  name: 'COUNT_DISTINCT',
  pattern: /COUNT_DISTINCT/,
  label: "'COUNT DISTINCT'",
})

const Count = createKeywordToken({
  name: 'COUNT',
  pattern: /COUNT/,
  label: "'COUNT'",
})

const Avg = createKeywordToken({
  name: 'AVG',
  pattern: /AVG/,
  label: "'AVG'",
})

const Min = createKeywordToken({
  name: 'MIN',
  pattern: /MIN/,
  label: "'MIN'",
})

const Max = createKeywordToken({
  name: 'MAX',
  pattern: /MAX/,
  label: "'MAX'",
})

const Sum = createKeywordToken({
  name: 'SUM',
  pattern: /SUM/,
  label: "'SUM'",
})

const Group = createKeywordToken({
  name: 'GROUP',
  pattern: /GROUP/,
  label: "'GROUP'",
})

const Having = createKeywordToken({
  name: 'HAVING',
  pattern: /HAVING/,
  label: "'HAVING'",
})

module.exports = {
  CountDistinct,
  Count,
  Avg,
  Min,
  Max,
  Sum,
  Group,
  Having,
}
