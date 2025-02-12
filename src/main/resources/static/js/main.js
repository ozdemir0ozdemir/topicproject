"use strict";

import TopicService from "./api/topic-service.js";


const newTopicTitle = document.querySelector("#new-topic-title");
const newTopicDefinition = document.querySelector("#new-definition-text");

const currentTopic = {
  id: null,
  title: null,
  sanitizedTitle: null,

  setTopic(id, title, sanitizedTitle) {
    this.id = id;
    this.title = title;
    this.sanitizedTitle = sanitizedTitle;
    getTopicDefinitionsByTopicTitleId(id, title);
  }
};

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

document
    .querySelector(".topic-titles-refresh-button")
    .addEventListener("click", () => refreshAllTopicTitles());

document
    .querySelector(".topic-titles-list")
    .addEventListener("click", event => {
      event.preventDefault();
      const id = event.target.getAttribute("data-id");
      if (event.target && id) {
        currentTopic.setTopic(id, event.target.innerHTML);
      }
    });

document
    .querySelector(".new-definition-add-button")
    .addEventListener("click", () => {
      if (newTopicDefinition.value) {
        TopicService.saveNewTopicDefinition(currentTopic, newTopicDefinition.value)
            .then(result => {
              getTopicDefinitionsByTopicTitleId(currentTopic.id, currentTopic.title);
              newTopicDefinition.value = "";
            });
      }

    });


// Index Problems Answer with query param
const topic = new URLSearchParams(window.location.search).get("topic");
console.log(window.location.search["topic"]);
if (topic) {
  TopicService.getTopicTitleById(encodeURIComponent(topic))
      .then(topicTitle => currentTopic.setTopic(topicTitle.id, topicTitle.title, topicTitle.sanitizedTitle));
} else {
  TopicService.getTopicTitleByRandom()
      .then(topicTitle => currentTopic.setTopic(topicTitle.id, topicTitle.title, topicTitle.sanitizedTitle))
      // FIXME: if search is empty ? else &
      .then(topicTitle => window.history.pushState({}, "", window.location.href + `?topic=${currentTopic.sanitizedTitle}`));
}


refreshAllTopicTitles();


function createTopicTitleItem(id, title) {
  return `
    <li class="topic-title">
      <a href="#" data-id="${id}">${title}</a>
    </li>`;
}

function createTopicDefinitionItem(id, definition) {
  return `
  <div class="topic-definition-card">
    <div class="topic-definition-text">
      ${definition.replaceAll("<", "&lt;")}
    </div>
  </div>
 `;
}

function refreshAllTopicTitles() {
  const topicTitlesList = document.querySelector(".topic-titles-list");
  topicTitlesList.innerHTML = "";

  TopicService.getAllTopicTitles()
      .then(topicTitleList => topicTitleList
          .map(title => createTopicTitleItem(title.id, title.title))
          .join(""))
      .then(titles => topicTitlesList.innerHTML = titles);
}

function getTopicDefinitionsByTopicTitleId(topicTitleId, topicTitle) {
  const topicTitleHeader = document.querySelector(".topic-definitions-title");
  topicTitleHeader.innerHTML = topicTitle;

  const definitionCards = document.querySelector(".topic-definition-cards");
  TopicService.getAllDefinitionsByTopicTitleId(topicTitleId)
      .then(defList => defList
          .map(def => createTopicDefinitionItem(def.id, def.definition))
          .join(""))
      .then(definitions => definitionCards.innerHTML = definitions);
}

