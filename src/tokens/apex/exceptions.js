const { createKeywordToken } = require('../_shared')

const Try = createKeywordToken({
  name: 'Try',
  pattern: /try/,
  label: "'try'",
})

const Throw = createKeywordToken({
  name: 'Throw',
  pattern: /throw/,
  label: "'throw'",
})

const Catch = createKeywordToken({
  name: 'Catch',
  pattern: /catch/,
  label: "'catch'",
})

const Finally = createKeywordToken({
  name: 'Finally',
  pattern: /finally/,
  label: "'finally'",
})

module.exports = {
  Try,
  Throw,
  Catch,
  Finally,
}
