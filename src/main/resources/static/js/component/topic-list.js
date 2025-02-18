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

const TopicListPrivate = {

  html: {
    rootElement: undefined,
    listElement: undefined,
  },

  topicChangeListener: undefined,

  init() {
    const topicList = this.html;

    topicList.rootElement = document.createElement("div");
    topicList.rootElement.classList.add("topic-container")

    topicList.rootElement.appendChild(
        Pagination.createSudoElement(HTML_TAG, "topic-pagination"));

    Pagination.init(topicList.rootElement);
    Pagination.updatePagination(HTML_TAG, 1, 1, false);

    topicList.listElement = document.createElement("ul");
    topicList.listElement.classList.add("topic-list");
    topicList.rootElement.appendChild(topicList.listElement);

    topicList.rootElement.addEventListener("click", event => this.clickListener(event));
    return topicList;
  },

  setTopics(topics, currentPage, totalPage) {
    this.html.listElement.innerHTML = topics
        .map(topic => this.createTopicListItem(topic))
        .join("");

    Pagination.updatePagination(HTML_TAG, currentPage, totalPage, false);
  },

  clickListener({isTrusted, target})  {
    if (isTrusted
        && target.localName === "span"
        && target.classList.contains("topic-link")
        && this.topicChangeListener) {
      const id = target.getAttribute("data-id");
      this.topicChangeListener(id);
    }
  },

  setTopicChangeListener(listener) {
    if (typeof listener !== "function") {
      return;
    }
    this.topicChangeListener = listener;
  },

  createTopicListItem(topic) {
    return `
      <li class="topic">
        <span class="topic-link" data-id="${topic.id}">${topic.title} </span>
        <span style="margin-left: 3px;">(<span class="topic-definition-count">${topic.totalDefinition}</span>)</span>
      </li>`;
  },

};

const TopicList = {

  init(parentElement = document.querySelector("body")) {
    const sudoElement = parentElement
        .querySelector(HTML_TAG);

    if (!sudoElement) {
      return;
    }

    sudoElement.replaceWith(this.render(TopicListPrivate.init()));
  },

  render(topicList) {

    return topicList.rootElement;
  },

  setTopics(topics, currentPage, totalPage) {
    TopicListPrivate.setTopics(topics, currentPage, totalPage);
  },

  setPageChangeListener(listener) {
    if (typeof listener !== "function") {
      return;
    }
    Pagination.addPaginationChangeListener(HTML_TAG, listener);
  },

  setTopicChangeListener(listener) {
    TopicListPrivate.setTopicChangeListener(listener);
  }

};

TopicList.init();
export default TopicList;