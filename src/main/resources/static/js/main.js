"use strict";

import TopicService from "./api/topic-service.js";
import TopicList from "./component/topic-list.js";
import DefinitionList from "./component/definition-list.js";


/*const currentTopic = {
  id: null,
  title: null,
  sanitizedTitle: null,

  setTopic(id, title, sanitizedTitle) {
    this.id = id;
    this.title = title;
    this.sanitizedTitle = sanitizedTitle;
    getTopicDefinitionsByTopicTitleId(id, title);
    // NewDefinitionForm.updatePlaceholder(title);
    document.title = `${title} - TopicProject`

    // FIXME: url must respect topic changes
    // window.history.pushState({}, sanitizedTitle, window.location.href + `?topic=${sanitizedTitle}`);
  }
};*/

/*
const newTopicTitle = document.querySelector("#new-topic-title");

document
    .querySelector(".topic-titles-add-button")
    .addEventListener("click", () => {
      if (newTopicTitle.value) {
        TopicService.saveNewTopicTitle(newTopicTitle.value)
            .then(result => {
              refreshAllTopicTitles();
              newTopicTitle.value = "";
            });
      }
    });
    */


// NewDefinitionForm.init(
//     document.querySelector("#new-definition-text"),
//     document.querySelector(".new-definition-add-button"),
//     newTopicDefinition =>
//         TopicService
//             .saveNewTopicDefinition(currentTopic, newTopicDefinition)
//             .then(result => getTopicDefinitionsByTopicTitleId(currentTopic.id, currentTopic.title))
// );



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






// function getTopicDefinitionsByTopicTitleId(topicTitleId, topicTitle) {
//   const topicTitleHeader = document.querySelector(".topic-definitions-title");
//   topicTitleHeader.innerHTML = topicTitle;
//
//   const definitionCards = document.querySelector(".topic-definition-cards");
//   TopicService.getAllDefinitionsByTopicTitleId(topicTitleId)
//       .then(defList => defList
//           .map(def => createTopicDefinitionItem(def.id, def.definition))
//           .join(""))
//       .then(definitions => definitionCards.innerHTML = definitions);
// }
//
