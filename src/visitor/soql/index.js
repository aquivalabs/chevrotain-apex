function soqlVisitor($) {
  $.baseSoqlQuery = function (ctx) {
    return {}
  }

  $.listOfFields = function (ctx) {
    return {}
  }
}

module.exports = {
  soqlVisitor,
}
