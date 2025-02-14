"use strict";

import TopicService from "../api/topic-service.js";
import Pagination from "./pagination.js";

/* ---------------------------------------------------------------------------
* Private Section
* */
const HTML_TAG = "TopicList";
const PAGINATION_NAME = "topic";

const TopicInfo = {

  listElement: undefined,
};

function createTopicListItem(id, title) {
  return `
    <li class="topic">
      <a href="#" data-id="${id}">${title}</a>
    </li>`;
}

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.0
 *
 * Topic List Component.
 * Can be used only once.
 * */
const TopicList = {


  init() {
    document
        .querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.render(sudoElement));
  },

  render(sudoElement) {
    // This element can be rendered only once
    if(TopicInfo.listElement !== undefined){
      return;
    }

    const topicContainer = document.createElement("div");
    topicContainer.classList.add("topic-container")

    TopicInfo.listElement = document.createElement("ul");
    TopicInfo.listElement.classList.add("topic-list");

    let total = 1;
    TopicService
        .getAllTopicTitles(1)
        .then(topics => {total = topics.totalPages;  return topics;})
        .then(topics => topics.content
            .map(({id, title}) => createTopicListItem(id, title))
            .join(""))
        .then(topicsHtml => TopicInfo.listElement.innerHTML = topicsHtml)
        .then(_ => Pagination.init(topicContainer, total));

    topicContainer.appendChild(Pagination.createSudoElement(PAGINATION_NAME));
    topicContainer.appendChild(TopicInfo.listElement);

    Pagination.addPageChangedListener(page => {
      let total = 1;
      TopicInfo.listElement.innerHTML = "";
      // FIXME: request paginated
      TopicService
          .getAllTopicTitles(page)
          .then(topics => {total = topics.totalPages;  return topics;})
          .then(topics => topics.content
              .map(({id, title}) => createTopicListItem(id, title))
              .join(""))
          .then(topics => TopicInfo.listElement.innerHTML = topics)
          .then(_ => Pagination.updateTotalPagesFor(PAGINATION_NAME, total))

    });

    TopicInfo
        .listElement
        .addEventListener("click", event => {
          event.preventDefault();
          const id = event.target.getAttribute("data-id");
          if (event.target.localName === "a" && id) {
            // TODO: invoke topicChangedListeners
          }
        });



    sudoElement.replaceWith(topicContainer);
  },

};

TopicList.init();
export default TopicList;