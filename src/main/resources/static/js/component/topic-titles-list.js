"use strict";

import TopicService from "../api/topic-service.js";
import TopicTitlePagination from "./topic-title-pagination.js";

const topicTitlesContainer = document.createElement("div");
topicTitlesContainer.classList.add("topic-titles-container")

const listElement = document.createElement("ul");
listElement.classList.add("topic-titles-list");


const topicList = [];

function createTopicTitleItem(id, title) {
  return `
    <li class="topic-title">
      <a href="#" data-id="${id}">${title}</a>
    </li>`;
}

const TopicTitlesList = {

  topicChangeCallback: (id, title) => {},

  init(rootElement = document) {
    rootElement
        .querySelectorAll("TopicTitlesList")
        .forEach(element => element.replaceWith(TopicTitlesList.render()));

    listElement
        .addEventListener("click", event => {
          event.preventDefault();
          const id = event.target.getAttribute("data-id");
          if (event.target && id) {
            this.topicChangeCallback(id, event.target.innerHTML);
            // currentTopic.setTopic(id, event.target.innerHTML);
          }
        });

  },

  render() {

    listElement.innerHTML = "";

    let tempHtml = "";

    TopicService
        .getAllTopicTitles()
        .then(topics => topics.forEach(topic => {
            topicList.push(topic);
            tempHtml += createTopicTitleItem(topic.id, topic.title);
        }))
        .then(_ => {
          listElement.innerHTML = tempHtml;
          topicTitlesContainer.appendChild(document.createElement("TopicTitlePagination"));
          topicTitlesContainer.appendChild(listElement);
          topicTitlesContainer.appendChild(document.createElement("TopicTitlePagination"));
          TopicTitlePagination.init(topicTitlesContainer);
        });


    return topicTitlesContainer;
  },

};

TopicTitlesList.init();
export default TopicTitlesList;