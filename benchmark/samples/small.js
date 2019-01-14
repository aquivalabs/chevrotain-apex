module.exports = `public abstract class AqObj {
  public static final String NAME = 'VALUE';
  public List<sObject> l = Trigger.new.get(0);
  public List<sObject> a = r.dsr.get(0);
  public List<sObject> a = r.dsr.de.set(0);
  public List<sObject> a = r.r.qwe(0);
  public String vah = 'a"b"c';
  private static final List<String> definedList = new List<String>{'a', 'b'};
  String listElementByIndex = definedList[0];
  private static final Map<String, String> definedList = new Map<String, String>{'a' => 'a', 'b' => 'b'};
  List<sObject> a = nEw List<sObject>();

  public static void ifElseStatements(){
    if(a == 1 || (b > 1 || (d) && c != 23)){

    }
  }

  public List<sObject> a = [
    SELECT Id, Name, Contact.Name FROM Account
  ];
  /* comments */
  public List<sObject> a = [
    select Id from Account
    where Id = :sasa
  ];
  // comments here
  public List<sObject> a = [
    SeLeCt Id, Name FRoM Account
    whErE id = 1
  ];

  public List<sObject> a = [
    SELECT lookup__c,
        Count(Id), Max(CreatedByDate), MIN(Number__c),
        AVG(Something), SUM(FieldToSum__c)
    FROM Account
    GROUP BY lookup__c
  ];

  public List<sObject> a = [
    SELECT lookup__c,
        Count(Id), Max(CreatedByDate), MIN(Number__c),
        AVG(Something) t, SUM(FieldToSum__c)
    FROM Account
    GROUP BY lookup__c
    HAVING COUNT(Id) < 10
  ];

  public List<Contact> conts = [
    SELECT Id
    FROM Contact
    WHERE CreatedDate = 1999-01-01 OR Field__c.Field__c > 1999-01-01T23:01:01Z
    OR Field__c.Field__c >= 1999-01-01T23:01:01-08:00
  ];

  public List<Contact> conts = [
    SELECT Id
    FROM Contact
    WHERE CreatedDate > YESTERDAY OR CreatedDate = TODAY OR CreatedDate = TOMORROW
    OR CreatedDate >= LAST_WEEK OR CreatedDate = THIS_WEEK OR CreatedDate = NEXT_WEEK
    OR CreatedDate = LAST_MONTH OR CreatedDate = THIS_month OR CreatedDate = next_MONTH
    OR CreatedDate = LAST_YEAR OR CreatedDate = THIS_YEAR OR CreatedDate = NEXT_YEAR
    OR CreatedDate = LAST_90_DAYS OR CreatedDate = NEXT_90_DAYS
    OR CreatedDate = LAST_QUARTER OR CreatedDate = THIS_QUARTER OR CreatedDate = NEXT_QUARTER
    OR CreatedDate = LAST_FISCAL_QUARTER OR CreatedDate = THIS_FISCAL_QUARTER OR CreatedDate = NEXT_FISCAL_QUARTER
    OR CreatedDate = LAST_FISCAL_YEAR OR CreatedDate = THIS_FISCAL_YEAR OR CreatedDate = NEXT_FISCAL_YEAR
  ];

  public List<Contact> conts = [
    SELECT Id
    FROM Contact
    WHERE CreatedDate = LAST_N_DAYS:10 OR CreatedDate = NEXT_N_DAYS:10
    OR CreatedDate = LAST_N_WEEKS:10 OR CreatedDate = NEXT_N_WEEKS:10
    OR CreatedDate = LAST_N_MONTHS:10 OR CreatedDate = NEXT_N_MONTHS:10
    OR CreatedDate = LAST_N_QUARTERS:10 OR CreatedDate = NEXT_N_QUARTERS:10
    OR CreatedDate = LAST_N_YEARS:10 OR CreatedDate = NEXT_N_YEARS:10
    OR CreatedDate = LAST_N_FISCAL_QUARTERS:10 OR CreatedDate = NEXT_N_FISCAL_QUARTERS:10
  ];

  public List<Contact> conts = [
    SELECT ToLabel(Type), CALENDAR_MONTH(CreatedDate), CALENDAR_QUARTER(CreatedDate), CALENDAR_YEAR(CreatedDate),
        DAY_IN_MONTH(CreatedDate), DAY_IN_WEEK(CreatedDate), DAY_IN_YEAR(CreatedDate), DAY_ONLY(CreatedDate),
        FISCAL_MONTH(CreatedDate), FISCAL_QUARTER(CreatedDate), FISCAL_YEAR(CreatedDate),
        HOUR_IN_DAY(CreatedDate), WEEK_IN_MONTH(CreatedDate), WEEK_IN_YEAR(CreatedDate),
        FORMAT(CurrencyField__c), convertCurrency(CurrencyField__c)
    FROM Contact
    WHERE CALENDAR_MONTH(CreatedDate) = 10 OR CALENDAR_QUARTER(CreatedDate) = 1 OR CALENDAR_YEAR(CreatedDate) = 10
    OR DAY_IN_MONTH(CreatedDate) = 1 OR DAY_IN_WEEK(CreatedDate) = 1 OR DAY_IN_YEAR(CreatedDate) = 1 OR DAY_ONLY(CreatedDate) = 1
    OR FISCAL_MONTH(CreatedDate) = 1 OR FISCAL_QUARTER(CreatedDate) = 1 OR FISCAL_YEAR(CreatedDate) = 1
    OR HOUR_IN_DAY(CreatedDate) = 1 OR WEEK_IN_MONTH(CreatedDate) = 1 OR WEEK_IN_YEAR(CreatedDate) = 1
  ];

  public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    whErE id = 1
    limit 232
  ];

  public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    whErE id = 1
    limit 123
    offset 232
  ];

  public List<sObject> a = [
    sELeCt Id, Name FRoM Account
    whErE id = 1
    offset 232
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE ((id like 'qweqw')
            and (name = 231)
      or dew = true)
    ORDER by Something asc
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE not Name like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something asc
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE not Lookup__c.Name like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something asc
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE not Lookup__c.Name = 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something asc
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE not Lookup__c.Name >= 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something asc
  ];

  public List<sObject> a = [
    SeLeCt Id, Name fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or dew = true
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or dew in (select id from sth)
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or Name not in :names
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or Name not in ('name1', 'name2')
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or NOT Name not in ('name1', 'name2')
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
          and name = 231
      or NOT Name not in ('name1', 'name2')
    ORDER by Something desc Nulls first
  ];

  public List<sObject> a = [
    SeLeCt Id, Name, (SELECT Id, sth__c from Contacts) fRoM Account
    WhErE id like 'qweqw'
      and name = 231
      or something__c in (123, 321)
    ORDER by Something desc Nulls first
  ];

  public String abc {
      get;
      set {
          something here;
      }
  }

  public String abc { get {
          return this.abc;
      }
      set {
          something here;
      }
  }

  public virtual void onTrigger() {
      if (Trigger.isBefore) {
          if (Trigger.isDelete) {
              preValidateDelete(this.TriggerRecords);
          } else {
              preValidate(this.TriggerRecords);
              if (Trigger.isInsert) {
                  initialize(this.TriggerRecords);
              }
              calculate(this.TriggerRecords);
              validate(this.TriggerRecords);
          }
      } else if (Trigger.isAfter) {
          postInsertUpsertDelete(this.TriggerRecords);
          if (Trigger.isInsert || Trigger.isUndelete) {
              postInsert(this.TriggerRecords);
              postUpsert(this.TriggerRecords);
          }
          else if (Trigger.isUpdate) {
              postUpdate(this.TriggerRecords);
              postUpsert(this.TriggerRecords);
          }
          else if (Trigger.isDelete) {
              postDelete(this.TriggerRecords);
          }
      }
  }

  protected virtual void preValidate(List<sObject> records) {}

  protected virtual void preValidateDelete(List<sObject> records) {}

  protected virtual void initialize(List<sObject> records) {}

  protected virtual void calculate(List<sObject> records) {}

  protected virtual void validate(List<sObject> records) {}

  protected virtual void dmlStatements(List<sObject> records) {
    Map<String, sObject> objMap = new Map<String, sObject>();
    if(records.size() > 0) {
      if (records[0].Id != null) {
        insert records;
      } else {
        update records;
      }
      upsert records;
      uPSert records externalId;
      try {
        delete records;
      } catch(Exception e) {}
      undelete records;
      merge record1 record2 records;

      insert getValues();
      insert objMap.values();
    }
  }

  protected virtual void postInsert(List<sObject> records) {}

  protected virtual void postUpdate(List<sObject> records) {}

  protected virtual void postUpsert(List<sObject> records) {}

  protected virtual void postDelete(List<sObject> records) {}

  protected virtual void postInsertUpsertDelete(List<sObject> records) {}

  private Set<Id> erroredIds = new Set<Id>();
  private List<sObject> erroredRecords = new List<sObject>();
  private List<sObject> triggerRecordsOverride = null;

  protected List<sObject> TriggerRecords {
      get {
          List<sObject> baseRecords = isDelete() ? Trigger.old : Trigger.new;
          if (triggerRecordsOverride != null) {
              return triggerRecordsOverride;
          } else if (!erroredRecords.isEmpty()) {
              triggerRecordsOverride = new List<sObject>();
              for (sObject baseRecord : baseRecords) {
                  if (baseRecord.Id != null) {
                      if (!erroredIds.contains(baseRecord.Id)) {
                          triggerRecordsOverride.add(baseRecord);
                      }
                  } else {
                      Boolean isError = false;
                      for (sObject erroredRecord : erroredRecords) {
                          if (baseRecord == erroredRecord) {
                              isError = true;
                              break;
                          }
                      }
                      if (!isError) {
                          triggerRecordsOverride.add(baseRecord);
                      }
                  }
              }
              erroredRecords.clear();
              return triggerRecordsOverride;
          } else {
              return baseRecords;
          }
      }
  }

  protected void addError(sObject record, sObjectField field, String errorString) {
      record.addError(errorString);
      if (record.Id != null) {
          erroredIds.add(record.Id);
      }
      erroredRecords.add(record);
  }

  protected Boolean isInsert() {
      return Trigger.isInsert;
  }

  protected Boolean isUpdate() {
      return Trigger.isUpdate;
  }

  protected Boolean isDelete() {
      return Trigger.isDelete;
  }

  protected Boolean isUndelete() {
      return Trigger.isUndelete;
  }

  protected List<sObject> oldRecords() {
      if (isUpdate() || isDelete()) {
          return Trigger.old;
      } else {
          return null;
      }
  }

  protected sObject oldRecord(sObject record) {
      if (isUpdate() || isDelete()) {
          return Trigger.oldMap.get(record.Id);
      } else {
          return null;
      }
  }

  protected object oldValue(sObject record, sObjectField field) {
      if (isUpdate() || isDelete()) {
          return oldRecord(record).get(field);
      } else {
          return null;
      }
  }


  protected void require(sObject record, sObjectField field, Boolean condition, String errorMessage) {
      if (condition != true) {
          addError(record, field, errorMessage);
      }
  }

  private Boolean fieldIsEmpty(sObject record, sObjectField field) {
      object value = record.get(field);
      if (value == null) {
          return true;
      } else if (value instanceof String) {
          return String.isEmpty((String)value);
      } else {
          return false;
      }
  }

  protected void requireFields(sObject record, Set<sObjectField> fields) {
      List<sObjectField> missingFields = new List<sObjectField>();
      for (sObjectField field : new List<sObjectField>(fields))
          if (fieldIsEmpty(record, field))
              missingFields.add(field);

      if (missingFields.size() == 1)
          addError(record, null, AqString.format(Label.Aq_M_ValueRequired, missingFields[0]));
      else if (missingFields.size() > 1)
          addError(record, null, AqString.format(Label.Aq_M_ValuesRequired, AqString.formatList(missingFields)));
  }

  protected void requireField(sObject record, sObjectField field) {
      if (fieldIsEmpty(record, field))
          addError(record, field, AqString.format(Label.Aq_M_ValueRequired, field));
  }

  protected void requireTogether(sObject record, Set<SObjectField> fields) {
      Boolean oneSpecified = false;
      for (SObjectField field : fields) {
          if (!fieldIsEmpty(record, field)) {
              oneSpecified = true;
              break;
          }
      }
      if (!oneSpecified)
          return;

      for (SObjectField field : fields)
          if (fieldIsEmpty(record, field))
              addError(record, field, AqString.format(Label.Aq_M_RequiredTogether, AqString.formatSet(fields)));
  }

  protected void validateString(sObject record, sObjectField field, String dataType, Boolean required, Integer maxLength) {
      AqResult result = AqTypes.validateAndConvert('Field', AqString.valueOf(field), dataType, String.valueOf(record.get(field)), required, maxLength);
      if (result.hasError())
          addError(record, field, result.Message);
  }

  protected void validateString(sObject record, sObjectField field, String dataType, Boolean required) {
      validateString(record, field, dataType, required, null);
  }

  protected void validateString(sObject record, sObjectField field, String dataType) {
      validateString(record, field, dataType, false, null);
  }

  protected void validatePattern(sObject record, sObjectField field, Boolean required, String regEx, String patternLabel) {
      AqResult result = AqTypes.validatePattern('Field', AqString.valueOf(field), String.valueOf(record.get(field)), required, regEx, patternLabel);
      if (result.hasError())
          addError(record, field, result.Message);
  }

  protected void validateInteger(sObject record, sObjectField field, Boolean required, Integer min, Integer max) {
      if (required == true)
          requireField(record, field);
      Integer value = Integer.valueOf(record.get(field));
      if (value != null) {
          if (min != null && value < min)
              addError(record, field, AqString.format(Label.Aq_M_ValueLessThanMin, value, min));
          else if (max != null && value > max)
              addError(record, field, AqString.format(Label.Aq_M_ValueGreaterThanMax, value, max));
      }
  }


  protected Boolean isChangedField(sObject record, sObjectField field) {
      if (isInsert() || isUndelete()) {
          return record.get(field) != null;
      } else if (isDelete()) {
          return Trigger.oldMap.get(record.Id).get(field) != null;
      } else if (isUpdate()) {
          return record.get(field) != Trigger.oldMap.get(record.Id).get(field);
      } else {
          return false;
      }
  }

  protected Boolean isChangedAnyField(sObject record, Set<sObjectField> fields) {
      for (sObjectField field : fields)
          if (isChangedField(record, field))
              return true;

      return false;
  }


  protected Boolean isChangedFieldFrom(sObject record, sObjectField field, object fromValue) {
      return oldValue(record, field) == fromValue && isChangedField(record, field);
  }

  protected Boolean isChangedFieldTo(sObject record, sObjectField field, object toValue) {
      return isChangedField(record, field) && record.get(field) == toValue;
  }

  protected Boolean isChangedFieldToNonNull(sObject record, sObjectField field) {
      return isChangedField(record, field) && record.get(field) != null;
  }
}`
