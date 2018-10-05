const { tokens } = require('../../lexer')

function dmlStatements($) {
  // dmlOperator
  // : Insert
  //   | Update
  //   | Upsert
  //   | Delete
  $.RULE('dmlOperator', () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Insert)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Update)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Upsert)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Delete)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Undelete)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Merge)
        },
      },
    ])
  })

  // dmlStatement
  // : dmlOperator Identifier
  $.RULE('dmlStatement', () => {
    $.SUBRULE($.dmlOperator)
    $.SUBRULE($.expression)
  })
}

module.exports = {
  dmlStatements,
}
