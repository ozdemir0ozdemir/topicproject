"use strict";

import TopicService from "../api/topic-service.js";
import TopicList from "./topic-list.js";
import DefinitionList from "./definition-list.js";


const MainMaestroPrivate = {

  html: {
    rootElement: undefined,
    leftFrameElement: undefined,
    rightFrameElement: undefined
  },

  dateFilter: {
    start: {
      year: undefined,
      month: undefined,
      day: undefined
    },
    end: {
      interval: undefined,
      unit: undefined // YEAR, MONTH, DAY
    }
  },

  selectedTopic: {
    id: undefined,
    title: undefined,
    sanitizedTitle: undefined,
    createdAt: undefined
  },

  topicsPagination: {
    currentPage: 0,
    totalPages: 0,
  },

  definitionsPagination: {
    currentPage: 0,
    totalPages: 0,
  },

  init() {
    const html = this.html;

    html.rootElement = document.querySelector("main");

    html.leftFrameElement = document.createElement("div");
    html.leftFrameElement.classList.add("left-frame");

    html.rightFrameElement = document.createElement("div");
    html.rightFrameElement.classList.add("right-frame");

    html.rootElement.appendChild(html.leftFrameElement);
    html.rootElement.appendChild(html.rightFrameElement);
  },

  // Set frames content
  setLeftFrame(content) {
    this.html.leftFrameElement.innerHTML = "";
    this.html.leftFrameElement.appendChild(content);
  },

  setRightFrame(content) {
    this.html.rightFrameElement.innerHTML = "";
    this.html.rightFrameElement.appendChild(content);
  },

  // Filter
  setDateFilterStart(year, month, day) {
    if (year <= 0 || month <= 0 || day <= 0) {
      return;
    }

    this.dateFilter.start.year = year;
    this.dateFilter.start.month = month;
    this.dateFilter.start.day = day;
  },

  setDateFilterEnd(interval, unit) {
    if (unit !== "YEAR" || unit !== "MONTH" || unit !== "DAY") {
      return;
    }

    if (interval <= 0) {
      return;
    }

    this.dateFilter.end.interval = interval;
    this.dateFilter.end.unit = unit;
  },

  setDateFilter(year, month, day, endInterval, endUnit) {
    this.setDateFilterStart(year, month, day);
    this.setDateFilterEnd(endInterval, endUnit);
  },

  /*************************************************************************/
  setSelectedTopic({id, title, sanitizedTitle, createdAt}) {
    this.selectedTopic.id = id;
    this.selectedTopic.title = title;
    this.selectedTopic.sanitizedTitle = sanitizedTitle;
    this.selectedTopic.createdAt = createdAt;

    MainMaestroPrivate.setDefinitionsList(id, 1);
    return this.selectedTopic;
  },

  setTopicsPagination(currentPage, totalPages) {
    this.topicsPagination.currentPage = currentPage;
    this.topicsPagination.totalPages = totalPages;
  },

  setDefinitionsPagination(currentPage, totalPages) {
    this.definitionsPagination.currentPage = currentPage;
    this.definitionsPagination.totalPages = totalPages;
  },

  setTopicsList(page) {
    // TODO: FILTER DATE
    TopicService
        .getAllTopicTitles(page)
        .then(topics => {
          this.setTopicsPagination(topics.pageable.pageNumber + 1, topics.totalPages);
          TopicList.setTopics(topics.content, this.topicsPagination.currentPage, this.topicsPagination.totalPages);
        });
  },


  setDefinitionsList(id, page) {
    // TODO: FILTER DATE
    TopicService
        .getAllDefinitionsByTopicId(id, page)
        .then(topics => {
          this.setDefinitionsPagination(topics.pageable.pageNumber + 1, topics.totalPages);
          DefinitionList.setDefinitionList(
              this.selectedTopic.title,
              this.definitionsPagination.currentPage,
              this.definitionsPagination.totalPages,
              topics.content
          );
        });
  },

};

const MainMaestro = {

  init() {
    MainMaestroPrivate.init();

    // ### LEFT FRAME ###
    MainMaestroPrivate.setLeftFrame(document.createElement("TopicList"));
    TopicList.init(MainMaestroPrivate.html.leftFrameElement);
    TopicList.setPageChangeListener(newPage => MainMaestroPrivate.setTopicsList(newPage));
    TopicList.setTopicChangeListener(id => {
        TopicService
            .getTopicById(id)
            .then(topic => MainMaestroPrivate.setSelectedTopic(topic));
    });

    // ### RIGHT FRAME ###
    MainMaestroPrivate.setRightFrame(document.createElement("DefinitionList"));
    DefinitionList.init(MainMaestroPrivate.html.rightFrameElement);
    DefinitionList.setPageChangeListener(newPage => {
      MainMaestroPrivate.definitionsPagination.currentPage = newPage;
      MainMaestroPrivate.setDefinitionsList(MainMaestroPrivate.selectedTopic.id ,newPage);
    });
    DefinitionList.setDefinitionFormListener(newDefinition => {
      TopicService
          .saveNewTopicDefinition(MainMaestroPrivate.selectedTopic, newDefinition)
          .then(console.log);
    });

    // ### Initial Values ###
    MainMaestroPrivate.setTopicsList(1);

    TopicService
        .getTopicByRandom()
        .then(topic => MainMaestroPrivate.setSelectedTopic(topic));

  },

};

MainMaestro.init();
export default MainMaestro;