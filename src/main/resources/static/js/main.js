"use strict";

import TopicService from "./api/topic-service.js";
import TopicList from "./component/topic-list.js";
import DefinitionList from "./component/definition-list.js";
import SearchBar from "./component/search-bar.js";
import DefinitionForm from "./component/definition-form.js";



SearchBar.setListener("topic", title => {
  // TODO: First search topic then suggest to create new topic
  TopicService
      .saveNewTopicTitle(title)
      .then(result => {
        console.log(result);
      });
});

DefinitionForm.setListener((topic, definition) => {
  if(!topic
      ||!topic.id
      || topic.id <= 0
      || !definition
      || definition.length <= 0
      || definition.trim().length <= 0){
    return;
  }

  TopicService
      .saveNewTopicDefinition(topic, definition)
      .then(console.log);
});



// Index Problems Answer with query param
/*const topic = new URLSearchParams(window.location.search).get("topic");
if (topic) {
  TopicService.getTopicTitleById(encodeURIComponent(topic))
      .then(topicTitle => currentTopic.setTopic(topicTitle.id, topicTitle.title, topicTitle.sanitizedTitle));
} else {
  TopicService.getTopicTitleByRandom()
      .then(topicTitle => currentTopic.setTopic(topicTitle.id, topicTitle.title, topicTitle.sanitizedTitle))
      // FIXME: if search is empty ? else &
      .then(topicTitle => window.history.replaceState({}, currentTopic.sanitizedTitle, window.location.href + `&topic=${currentTopic.sanitizedTitle}`));
}*/

