/**
*   Takes the ID paramater of the current url and uses it to retrieve
*   a studySession object and a studyChain object from the database.
*
*   @returns an array containing a studySession object and it's connected studyChain object.
**/
export function getSSObjects() {
  var studySessionId = FlowRouter.getParam('_id');
  const studySessionObj = StudySession.findOne({_id:studySessionId});
  const studyChainObj = StudyChain.findOne({_id:studySessionObj.connectedStudyChainId});
  return [studySessionObj, studyChainObj];
}
