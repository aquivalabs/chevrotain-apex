const { createKeywordToken } = require('../_shared')

const CountDistinct = createKeywordToken({
  name: 'CountDistinct',
  pattern: /COUNT_DISTINCT/,
  label: "'COUNT DISTINCT'",
})

const Count = createKeywordToken({
  name: 'Count',
  pattern: /COUNT/,
  label: "'COUNT'",
})

const Avg = createKeywordToken({
  name: 'Avg',
  pattern: /AVG/,
  label: "'AVG'",
})

const Min = createKeywordToken({
  name: 'Min',
  pattern: /MIN/,
  label: "'MIN'",
})

const Max = createKeywordToken({
  name: 'Max',
  pattern: /MAX/,
  label: "'MAX'",
})

const Sum = createKeywordToken({
  name: 'Sum',
  pattern: /SUM/,
  label: "'SUM'",
})

const Group = createKeywordToken({
  name: 'Group',
  pattern: /GROUP/,
  label: "'GROUP'",
})

const Having = createKeywordToken({
  name: 'Having',
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
