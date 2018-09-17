const { createKeywordToken, createToken, makePattern } = require('../_shared')

const True = createKeywordToken({
  name: 'True',
  pattern: /true/,
  label: "'true'",
})

const False = createKeywordToken({
  name: 'False',
  pattern: /false/,
  label: "'false'",
})

const Null = createKeywordToken({
  name: 'Null',
  pattern: /null/,
  label: "'null'",
})

const Enum = createKeywordToken({
  name: 'Enum',
  pattern: /enum/,
  label: "'enum'",
})

const FloatLiteral = createToken({
  name: 'FloatLiteral',
  pattern: makePattern(
    '-?({{Digits}}\\.{{Digits}}?|\\.{{Digits}}){{ExponentPart}}?[fFdD]?|{{Digits}}({{ExponentPart}}[fFdD]?|[fFdD])'
  ),
  label: "'FloatLiteral'",
})

const DecimalLiteral = createToken({
  name: 'DecimalLiteral',
  pattern: makePattern('-?(0|[1-9]({{Digits}}?|_+{{Digits}}))[lL]?'),
  label: "'DecimalLiteral'",
})

const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: makePattern('[\'"][^"\\\\]*(\\\\.[^"\\\\]*)*[\'"]'),
  label: "'StringLiteral'",
})

module.exports = {
  True,
  False,
  Null,
  Enum,
  FloatLiteral,
  DecimalLiteral,
  StringLiteral,
}
