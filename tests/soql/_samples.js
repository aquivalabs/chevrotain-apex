const simpleSoqlQueries = {
  basicQuery: `public List<sObject> a = [
    SELECT Id, Name, Contact.Name FROM Account
  ];`,
  queryWhereEqualsColonIdentifier: `public List<sObject> a = [
    select Id from Account
    where Id = :sasa
  ];`,
  queryWhereEqualsNumberLiteral: `public List<sObject> a = [
    select Id from Account
    where Id = 123
  ];`,
  queryWhereEqualsStringLiteral: `public List<sObject> a = [
    select Id from Account
    where Id = ':sasa'
  ];`,
  queryComplexWhere: `public List<sObject> a = [
    select Id from Account
    where id like 'qweqw'
      and name = 231
      or dew = true
  ];`,
  queryLimit: `public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    limit 232
  ];`,
  queryOffset: `public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    offset 232
  ];`,
  queryLimitOffset: `public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    limit 123
    offset 232
  ];`,
  queryOrderBy: `public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    ORDER by Something
  ];`,
  queryComplexOrderBy: `public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something, Else desc Nulls first
  ];`,
  queryWithSubquery: `public List<sObject> a = [
    SeLeCt Id, Name,
      (SELECT Id, sth__c from Contacts)
    fRoM Account
  ];`,
  queryWhereSubquery: `public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE dew in (select id from sth)
  ];`,
  complexQuery: `public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      and dwdwr <= :dsd
      or dew in (select id from sth)
    ORDER by Something asc Nulls last
  ];`,
}

module.exports = {
  simpleSoqlQueries,
}
