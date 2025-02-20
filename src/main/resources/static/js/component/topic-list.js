"use strict";

import Pagination from "./pagination.js";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.3
 *
 * Topic List Component.
 * Can be used only once.
 * */
const HTML_TAG = "TopicList";

const TopicListPrivate = {

  html: {
    rootElement: undefined,
    titleElement: undefined,
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

    topicList.titleElement = document.createElement("h4");
    topicList.titleElement.innerHTML = "today";
    topicList.rootElement.appendChild(topicList.titleElement);

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

    document.querySelector(".left-frame").scrollTo(0, 0);
    Pagination.updatePagination(HTML_TAG, currentPage, totalPage, false);
  },

  clickListener(event)  {
    event.preventDefault();
    if (event.isTrusted
        && event.target.localName === "a"
        && event.target.classList.contains("topic-link")
        && this.topicChangeListener) {
      const id = event.target.getAttribute("data-id");
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
      <a class="topic-link" href="/topics/${topic.topicTitleSanitized}--${topic.id}/definitions" data-id="${topic.id}">
        <li class="pointer-events-none">
          <span class="pointer-events-none">${topic.title}</span><span class="topic-definition-count pointer-events-none">${topic.totalDefinition}</span>
        </li>
      </a>`;
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

export default TopicList;