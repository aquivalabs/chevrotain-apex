const { createKeywordToken } = require('../_shared')

const Boolean = createKeywordToken({
  name: 'Boolean',
  pattern: /Boolean/,
  label: "'Boolean'",
})

const Integer = createKeywordToken({
  name: 'Integer',
  pattern: /Integer/,
  label: "'Integer'",
})

const Long = createKeywordToken({
  name: 'Long',
  pattern: /Long/,
  label: "'Long'",
})

const Double = createKeywordToken({
  name: 'Double',
  pattern: /Double/,
  label: "'Double'",
})

const Decimal = createKeywordToken({
  name: 'Decimal',
  pattern: /Decimal/,
  label: "'Decimal'",
})

const String = createKeywordToken({
  name: 'String',
  pattern: /String/,
  label: "'String'",
})

const Void = createKeywordToken({
  name: 'Void',
  pattern: /void/,
  label: "'void'",
})

module.exports = {
  Boolean,
  Integer,
  Long,
  Double,
  Decimal,
  String,
  Void,
}
