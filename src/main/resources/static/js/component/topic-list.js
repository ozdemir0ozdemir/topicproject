"use strict";

import TopicService from "../api/topic-service.js";
import Pagination from "./pagination.js";
import DefinitionList from "./definition-list.js";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.1
 *
 * Topic List Component.
 * Can be used only once.
 * */
const HTML_TAG = "TopicList";
const PAGINATION_NAME = "topic";


const TopicListPrivate = {

  listElement: undefined,

  createTopicListItem(topic) {
  return `
    <li class="topic">
      <span class="topic-link" href="" data-id="${topic.id}">${topic.title} </span>
      <span style="margin-left: 3px;">(<span class="topic-definition-count">${topic.totalDefinition}</span>)</span>
    </li>`;
  },

};

const TopicList = {


  init() {
    document
        .querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.render(sudoElement));
  },

  async render(sudoElement) {
    // Create Dom Skeleton
    const topicContainer = document.createElement("div");
    topicContainer.classList.add("topic-container")

    TopicListPrivate.listElement = document.createElement("ul");
    TopicListPrivate.listElement.classList.add("topic-list");

    topicContainer.appendChild(Pagination.createSudoElement(PAGINATION_NAME,"topic-pagination"));
    await Pagination.init(topicContainer);

    topicContainer.appendChild(TopicListPrivate.listElement);


    // Init first topic page
    TopicService
        .getAllTopicTitles(1)
        .then(topics => {
          Pagination.updatePagination(PAGINATION_NAME, 1, topics.totalPages, false);
          return topics;
        })
        .then(topics => topics.content
            .map(topic => TopicListPrivate.createTopicListItem(topic))
            .join(""))
        .then(topicsHtml => TopicListPrivate.listElement.innerHTML = topicsHtml);


    // Change Topic Page Listener
    Pagination.addPaginationChangeListener(PAGINATION_NAME, page => {
      TopicService
          .getAllTopicTitles(page)
          .then(topics => topics.content
              .map(topic => TopicListPrivate.createTopicListItem(topic))
              .join(""))
          .then(topicsHtml => TopicListPrivate.listElement.innerHTML = topicsHtml);
      document.querySelector(".left-frame").scrollTop = 0;
    });


    // Change Definition List
    TopicListPrivate
        .listElement
        .addEventListener("click", event => {
          event.preventDefault();
          const id = event.target.getAttribute("data-id");
          if (event.target.classList.contains("topic-link") && id) {
            DefinitionList.changeTopicById(id);
          }
        });



    sudoElement.replaceWith(topicContainer);
  },

};

TopicList.init();
export default TopicList;