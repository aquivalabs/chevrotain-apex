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
    ])
  })

  // dmlStatement
  // : dmlOperator Identifier
  $.RULE('dmlStatement', () => {
    const dmlOperator = $.SUBRULE($.dmlOperator)
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      if (dmlOperator.children.Upsert.length > 0) {
        $.CONSUME1(tokens.apex.Identifier)
      }
    })
  })
}

module.exports = {
  dmlStatements,
}
