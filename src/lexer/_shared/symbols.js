const { createToken } = require('./helpers')

const LBrace = createToken({
  name: 'LBrace',
  pattern: /\(/,
  label: "'('",
})

const RBrace = createToken({
  name: 'RBrace',
  pattern: /\)/,
  label: "')'",
})

const LSquare = createToken({
  name: 'LSquare',
  pattern: /\[/,
  label: "'['",
})

const RSquare = createToken({
  name: 'RSquare',
  pattern: /]/,
  label: "']'",
  pop_mode: true,
})

const ExclamationmarkEquals = createToken({
  name: 'ExclamationmarkEquals',
  pattern: /!=/,
  label: "'!='",
})

const LessEquals = createToken({
  name: 'LessEquals',
  pattern: /<=/,
  label: "'<='",
})

const GreaterEquals = createToken({
  name: 'GreaterEquals',
  pattern: />=/,
  label: "'>='",
})

const Less = createToken({
  name: 'Less',
  pattern: /</,
  label: "'<'",
})

const Greater = createToken({
  name: 'Greater',
  pattern: />/,
  label: "'>'",
})

const Dot = createToken({
  name: 'Dot',
  pattern: /\./,
  label: "'.'",
})

const Comma = createToken({
  name: 'Comma',
  pattern: /,/,
  label: "','",
})

const SemiColonWithFollowEmptyLine = createToken({
  name: 'SemiColonWithFollowEmptyLine',
  pattern: /;[ \t]*(\r\n|\r[^\n]|\n)[ \t]*(\r\n|\r|\n)/,
  label: "';'",
  line_breaks: true,
})

const SemiColon = createToken({
  name: 'SemiColon',
  pattern: /;/,
  label: "';'",
})

const Colon = createToken({
  name: 'Colon',
  pattern: /:/,
  label: "':'",
})

const Equals = createToken({
  name: 'Equals',
  pattern: /=/,
  label: "'='",
})

module.exports = {
  Dot,
  Comma,
  SemiColonWithFollowEmptyLine,
  SemiColon,
  Colon,
  LBrace,
  RBrace,
  LSquare,
  RSquare,
  ExclamationmarkEquals,
  LessEquals,
  GreaterEquals,
  Equals,
  Greater,
  Less,
}
