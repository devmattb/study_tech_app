export function subscriptions(template) {
  // Subscribe to all relevant collections.
  template.subscribe('studySession');
  template.subscribe('studyChain');
  template.subscribe('activityDescription');
  template.subscribe('feedbackQuestion');
  template.subscribe('feedbackAnswer');
  template.subscribe('keywords');
  template.subscribe('keywordAnswer');
}
