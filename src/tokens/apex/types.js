const { createKeywordToken } = require('../_shared')

const Boolean = createKeywordToken({
  name: 'Boolean',
  pattern: /Boolean/,
  label: "'Boolean'",
})

const Char = createKeywordToken({
  name: 'Char',
  pattern: /Char/,
  label: "'Char'",
})

const Byte = createKeywordToken({
  name: 'Byte',
  pattern: /Byte/,
  label: "'Byte'",
})

const Short = createKeywordToken({
  name: 'Short',
  pattern: /Short/,
  label: "'Short'",
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

const Float = createKeywordToken({
  name: 'Float',
  pattern: /Float/,
  label: "'Float'",
})

const Double = createKeywordToken({
  name: 'Double',
  pattern: /Double/,
  label: "'Double'",
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
  Char,
  Byte,
  Short,
  Integer,
  Long,
  Float,
  Double,
  String,
  Void,
}
