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
    year: undefined,
    month: undefined,
    day: undefined
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

    this.setDateFilterToToday();
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
  setDateFilter(year, month, day) {
    if (year <= 1970 || month <= 0 || day <= 0) {
      return;
    }

    this.dateFilter.year = year;
    this.dateFilter.month = month;
    this.dateFilter.day = day;
  },

  setDateFilterToToday() {

    const today = new Date();
    this.setDateFilter(today.getUTCFullYear(), today.getMonth() + 1, today.getUTCDate())
  },


  /*************************************************************************/
  setSelectedTopic(requestedTopicId, addHistory) {

    TopicService
        .getTopicById(+requestedTopicId)
        .then(({id, title, sanitizedTitle, createdAt}) => {
          this.selectedTopic.id = id;
          this.selectedTopic.title = title;
          this.selectedTopic.sanitizedTitle = sanitizedTitle;
          this.selectedTopic.createdAt = createdAt;

          MainMaestroPrivate.setDefinitionsListPage(1);

          if (addHistory) {
            window.history.pushState(
                {},
                "",
                `/topics/${sanitizedTitle}--${id}/definitions`);
          }


          document.title = this.selectedTopic.title + " - TopicProject";
        });
  },

  setTopicsListPage(page) {
    // TODO: FILTER DATE
    TopicService
        .getAllTopicTitles(page, this.dateFilter.year, this.dateFilter.month - 1, this.dateFilter.day)
        .then(topics => {
          TopicList.setTopics(topics.content, topics.currentPage, topics.totalPages);
        });
  },

  setDefinitionsListPage(page) {
    // TODO: FILTER DATE

    TopicService
        .getAllDefinitionsByTopicId(this.selectedTopic.id, page)
        .then(defs => {
          DefinitionList
              .setDefinitionList(this.selectedTopic.title, page, defs.totalPages, defs.content);
        });
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
    TopicList.setTopicChangeListener(topic => MainMaestroPrivate.setSelectedTopic(topic, true));
    TopicList.setPageChangeListener(page => MainMaestroPrivate.setTopicsListPage(page));


    // ### RIGHT FRAME ###
    MainMaestroPrivate.setRightFrame(document.createElement("DefinitionList"));
    DefinitionList.init(MainMaestroPrivate.html.rightFrameElement);
    DefinitionList.setPageChangeListener(page => MainMaestroPrivate.setDefinitionsListPage(page));
    DefinitionList.setDefinitionFormListener(definition => MainMaestroPrivate.saveNewDefinition(definition));

    // ### Initial Values ###

    MainMaestroPrivate.setTopicsListPage(1);


    window.addEventListener("popstate", event => {
      this.acceptRoute(false);
    });

    this.acceptRoute(true);

  },


  setDateFilter(year, month, day) {
    MainMaestroPrivate.setDateFilter(+year, +month, +day);
    MainMaestroPrivate.setTopicsListPage(1);

    // const route = window.location.pathname;
    // if(route.search("/topics/[a-z0-9-]+/definitions") === 0) {
    //   const [topics, title, definitions]
    //       = route.substring(1).split("/");
    //
    //   const hyphen = title.search("--");
    //   MainMaestroPrivate.setSelectedTopic(+title.substring(hyphen + 2), true);
    // }
  },


  acceptRoute(addHistory) {
    const route = window.location.pathname;
    if (route.search("/topics/[a-z0-9-]+/definitions") === 0 && route.endsWith("/definitions")) {
      const [topics, title, definitions] = route.substring(1).split("/");
      const hyphen = title.search("--");
      if (topics === "topics" && definitions === "definitions") {
        MainMaestroPrivate.setSelectedTopic(+title.substring(hyphen + 2), addHistory);
      }
    } else {
      TopicService
          .getTopicByRandom()
          .then(topic => MainMaestroPrivate.setSelectedTopic(topic.id, true));
    }
  },


};


export default MainMaestro;