"use strict";

import MainMaestro from "./component/main-maestro.js";
import SearchBar from "./component/search-bar.js";
import TopicService from "./api/topic-service.js";

MainMaestro.init();

SearchBar.init();
SearchBar.setListener("topic", title => {
  // TODO: First search topic then suggest to create new topic
  TopicService
      .saveNewTopicTitle(title)
      .then(topic => console.log("New topic saved: DO SOMETHING!!! : ", topic));
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

