"use strict";

import MainMaestro from "./component/main-maestro.js";
import SearchBar from "./component/search-bar.js";
import TopicService from "./api/topic-service.js";

MainMaestro.init();

SearchBar.init();
SearchBar.setListener("topic", title => {
  // TODO: First search topic then suggest to create new topic
  TopicService
      .saveNewTopicTitle(title)
      .then(topic => console.log("New topic saved: DO SOMETHING!!! : ", topic));
});

const today = new Date();
const dateFilter = document.querySelector("#filter-date");
dateFilter.valueAsDate = today;

document
    .querySelector(".filter-pane > #filter-submit")
    .addEventListener("click", () => {
      MainMaestro.setDateFilter(dateFilter.valueAsDate.getUTCFullYear(), dateFilter.valueAsDate.getUTCMonth() + 1, dateFilter.valueAsDate.getUTCDate())
});

document
    .querySelector(".filter-pane > #filter-reset")
    .addEventListener("click", () => {
      MainMaestro.setDateFilter(undefined, undefined, undefined)
    });



