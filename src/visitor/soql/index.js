function soqlVisitor($) {
  $.queryUnit = function(ctx) {
    return {}
  }

  $.baseSoqlQuery = function(ctx) {
    return {}
  }

  $.listOfFields = function(ctx) {
    return {}
  }

  $.comparisonOperator = function(ctx) {
    return {}
  }

  $.andOr = function(ctx) {
    return {}
  }

  $.colonIdentifierName = function(ctx) {
    return {}
  }

  $.whereClause = function(ctx) {
    return {}
  }

  $.singleWhereCondition = function(ctx) {
    return {}
  }
}

module.exports = {
  soqlVisitor,
}
