const { createToken } = require('./_shared')

const LineComment = createToken({
  name: 'LineComment',
  pattern: /\/\/[^\n\r]*/,
})

const LineCommentStandalone = createToken({
  name: 'LineCommentStandalone',
  pattern: /\/\/[^\n\r]*((\n|[\r][^\n]|\r\n)\s*){2,}/,
  line_breaks: true,
})

const JavaDocComment = createToken({
  name: 'JavaDocComment',
  pattern: /\/\*\*([^*]|\*(?!\/))*\*\//,
  line_breaks: true,
})

const JavaDocCommentStandalone = createToken({
  name: 'JavaDocCommentStandalone',
  pattern: /\/\*\*([^*]|\*(?!\/))*\*\/(((\n)|([\r][^\n])|(\r\n))\s*){2,}/,
  line_breaks: true,
})

const TraditionalComment = createToken({
  name: 'TraditionalComment',
  pattern: /\/\*([^*]|\*(?!\/))*\*\//,
  line_breaks: true,
})

const TraditionalCommentStandalone = createToken({
  name: 'TraditionalCommentStandalone',
  pattern: /\/\*([^*]|\*(?!\/))*\*\/(((\n)|([\r][^\n])|(\r\n))\s*){2,}/,
  line_breaks: true,
})

module.exports = {
  LineComment,
  LineCommentStandalone,
  JavaDocComment,
  JavaDocCommentStandalone,
  TraditionalComment,
  TraditionalCommentStandalone,
}
