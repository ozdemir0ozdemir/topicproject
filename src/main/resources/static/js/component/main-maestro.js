"use strict";

import TopicService from "../api/topic-service.js";
import TopicList from "./topic-list.js";
import DefinitionList from "./definition-list.js";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.0
 *
 * Main Maestro manages <br/>
 * TopicList and DefinitionList components <br/>
 * and their pagination
 * */
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
  setSelectedTopic(requestedTopicId) {

    TopicService
        .getTopicById(requestedTopicId)
        .then(({id, title, sanitizedTitle, createdAt}) => {
          this.selectedTopic.id = id;
          this.selectedTopic.title = title;
          this.selectedTopic.sanitizedTitle = sanitizedTitle;
          this.selectedTopic.createdAt = createdAt;

          MainMaestroPrivate.setDefinitionsListPage(1);
        });
  },

  setTopicsListPage(page) {
    // TODO: FILTER DATE
    TopicService
        .getAllTopicTitles(page)
        .then(topics => {
          TopicList.setTopics(topics.content, topics.pageable.pageNumber + 1, topics.totalPages);
        });
  },

  setDefinitionsListPage(page) {
    // TODO: FILTER DATE

    TopicService
        .getAllDefinitionsByTopicId(this.selectedTopic.id, page)
        .then(topics => DefinitionList
            .setDefinitionList(this.selectedTopic.title, page, topics.totalPages, topics.content));
  },

  saveNewDefinition(definition) {
    TopicService
        .saveNewTopicDefinition(this.selectedTopic, definition)
        .then(def => console.log("new definition saved. DO SOMETHING!!! : ", def));
  },

};

const MainMaestro = {

  init() {
    MainMaestroPrivate.init();

    // ### LEFT FRAME ###
    MainMaestroPrivate.setLeftFrame(document.createElement("TopicList"));
    TopicList.init(MainMaestroPrivate.html.leftFrameElement);
    TopicList.setTopicChangeListener(topic => MainMaestroPrivate.setSelectedTopic(topic));
    TopicList.setPageChangeListener(page => MainMaestroPrivate.setTopicsListPage(page));


    // ### RIGHT FRAME ###
    MainMaestroPrivate.setRightFrame(document.createElement("DefinitionList"));
    DefinitionList.init(MainMaestroPrivate.html.rightFrameElement);
    DefinitionList.setPageChangeListener(page => MainMaestroPrivate.setDefinitionsListPage(page));
    DefinitionList.setDefinitionFormListener(definition => MainMaestroPrivate.saveNewDefinition(definition));

    // ### Initial Values ###
    MainMaestroPrivate.setTopicsListPage(1);

    TopicService
        .getTopicByRandom()
        .then(topic => MainMaestroPrivate.setSelectedTopic(topic.id));

  },

};


export default MainMaestro;