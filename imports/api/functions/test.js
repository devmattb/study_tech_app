export function test(){

  /**
  *   Test new collections!
  **/
  const exampleKeywordInput = {
    'connectedUserId': "bla",
    'keywords': [{"value": "keywordVal1","description": "summaryTxt1"},{"value": "keywordVal2","description": "summaryTxt2"}],
    'pages': "51-55"
  }

  Meteor.call("FeedbackAnswers.insert", {});
  Meteor.call("KeywordAnswers.insert", exampleKeywordInput);

}
