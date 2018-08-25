const { createToken } = require('./_shared')

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

const LCurly = createToken({
  name: 'LCurly',
  // using a string literal to get around a bug in regexp-to-ast
  // so lexer optimizations can be enabled.
  pattern: '{',
  label: "'{'",
})

const RCurly = createToken({
  name: 'RCurly',
  pattern: /}/,
  label: "'}'",
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
})

const Less = createToken({
  name: 'Less',
  pattern: /</,
  label: "'<'",
})

const LessEquals = createToken({
  name: 'LessEquals',
  pattern: /<=/,
  label: "'<='",
})

const Greater = createToken({
  name: 'Greater',
  pattern: />/,
  label: "'>'",
})

const GreaterEquals = createToken({
  name: 'GreaterEquals',
  pattern: />=/,
  label: "'>='",
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

const EqualsEquals = createToken({
  name: 'EqualsEquals',
  pattern: /==/,
  label: "'=='",
})

const Minus = createToken({
  name: 'Minus',
  pattern: /-/,
  label: "'-'",
})

const MinusEquals = createToken({
  name: 'MinusEquals',
  pattern: /-=/,
  label: "'-='",
})

const MinusMinus = createToken({
  name: 'MinusMinus',
  pattern: /--/,
  label: "'--'",
})

const Plus = createToken({
  name: 'Plus',
  pattern: /\+/,
  label: "'+'",
})

const PlusEquals = createToken({
  name: 'PlusEquals',
  pattern: /\+=/,
  label: "'+='",
})

const PlusPlus = createToken({
  name: 'PlusPlus',
  pattern: /\+\+/,
  label: "'++'",
})

const And = createToken({
  name: 'And',
  pattern: /&/,
  label: "'&'",
})

const AndAnd = createToken({
  name: 'AndAnd',
  pattern: /&&/,
  label: "'&&'",
})

const AndEquals = createToken({
  name: 'AndEquals',
  pattern: /&=/,
  label: "'&='",
})

const At = createToken({
  name: 'At',
  pattern: /@/,
  label: "'@'",
})

const Questionmark = createToken({
  name: 'Questionmark',
  pattern: /\?/,
  label: "'?'",
})

const Exclamationmark = createToken({
  name: 'Exclamationmark',
  pattern: /!/,
  label: "'!'",
})

const ExclamationmarkEquals = createToken({
  name: 'ExclamationmarkEquals',
  pattern: /!=/,
  label: "'!='",
})

const Or = createToken({
  name: 'Or',
  pattern: /\|/,
  label: "'|'",
})

const OrEquals = createToken({
  name: 'OrEquals',
  pattern: /\|=/,
  label: "'|='",
})

const OrOr = createToken({
  name: 'OrOr',
  pattern: /\|\|/,
  label: "'||'",
})

const Star = createToken({
  name: 'Star',
  pattern: /\*/,
  label: "'*'",
})

const StarEquals = createToken({
  name: 'StarEquals',
  pattern: /\*=/,
  label: "'*='",
})

const Dash = createToken({
  name: 'Dash',
  pattern: /\//,
  label: "'/'",
})

const DashEquals = createToken({
  name: 'DashEquals',
  pattern: /\/=/,
  label: "'/='",
})

module.exports = {
  Dot,
  Comma,
  SemiColonWithFollowEmptyLine,
  SemiColon,
  Colon,
  EqualsEquals,
  ExclamationmarkEquals,
  Equals,
  PlusPlus,
  PlusEquals,
  Plus,
  MinusMinus,
  MinusEquals,
  Minus,
  AndAnd,
  AndEquals,
  And,
  OrOr,
  OrEquals,
  Or,
  LBrace,
  RBrace,
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  LessEquals,
  Less,
  GreaterEquals,
  Greater,
  At,
  StarEquals,
  Star,
  DashEquals,
  Dash,
  Questionmark,
  Exclamationmark,
}
