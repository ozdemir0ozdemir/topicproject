"use strict";


import Pagination from "./pagination.js";
import DefinitionForm from "./definition-form.js";
import TopicService from "../api/topic-service.js";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.2
 *
 * Definition List Component.
 * Can be used only once.
 * */
const HTML_TAG = "DefinitionList";

const DefinitionListPrivate = {

  topic: {
    id: undefined,
    title: undefined
  },

  definitionList: {
    rootElement: undefined,
    titleElement: undefined,
    listElement: undefined,
  },

  init() {
    const list = this.definitionList;

    list.rootElement = document.createElement("div");
    list.rootElement.classList.add("definition-list-container")


    const headerElement = document.createElement("div");
    headerElement.classList.add("definition-list-header");

    list.titleElement = document.createElement("h1");
    list.titleElement.classList.add("definition-list-title")

    const sudoPaginationElement = Pagination.createSudoElement(HTML_TAG, "definition-list-pagination")

    headerElement.appendChild(list.titleElement);
    headerElement.appendChild(sudoPaginationElement);
    Pagination.init(headerElement);
    Pagination.addPaginationChangeListener(HTML_TAG, page => this.changePage(page));

    list.rootElement.appendChild(headerElement);


    list.listElement = document.createElement("ul");
    list.rootElement.appendChild(list.listElement);

    const sudoDefinitionFormElement = document.createElement("DefinitionForm");
    list.rootElement.appendChild(sudoDefinitionFormElement);
    DefinitionForm.init(list.rootElement);


    return list;
  },

  setDefinitionList(topic, defsPage) {
    if(!this.definitionList.rootElement){
      return
    }
    if (!topic || !topic.id || !topic.title) {
      return;
    }

    this.topic.id = topic.id;
    this.topic.title = topic.title;

    Pagination.updatePagination(HTML_TAG, defsPage.pageable.pageNumber + 1, defsPage.totalPages, false);

    this.definitionList.titleElement.innerHTML = "";
    let addInterval = setInterval(() => {
      if(this.definitionList.titleElement.innerHTML.length !== topic.title.length){
        this.definitionList.titleElement.innerHTML = topic.title.substring(0, this.definitionList.titleElement.innerHTML.length + 1);
      }
      else {
        clearInterval(addInterval);
      }
    }, 5);

    this.definitionList.listElement.innerHTML = defsPage.content
        .map(def => this.createDefinitionCard(def))
        .join("");

    document.querySelector(".right-frame").scrollTop = 0;

    DefinitionForm.setTopic(topic);
  },

  changePage(page) {
    if(!this.topic && !this.topic.id){
      return;
    }
    TopicService.getAllDefinitionsByTopicId(this.topic.id, page)
        .then(defsPage => this.setDefinitionList(this.topic, defsPage));
  },

  createDefinitionCard(definition) {
    return `
    <li class="definition-list-item">
      ${definition.definition.replaceAll("<", "&lt;")}
    </li>
   `;
  },

};

const DefinitionList = {

  init(parentElement = document.querySelector("body")) {

    const sudoElement = parentElement.querySelector(HTML_TAG);
    if (!sudoElement) {
      return;
    }

    sudoElement.replaceWith(this.render(DefinitionListPrivate.init()))
  },

  render(definitionList) {

    return definitionList.rootElement;
  },

  setDefinitionList(topic, defsPage) {
    DefinitionListPrivate.setDefinitionList(topic, defsPage);
  },
};

DefinitionList.init();
export default DefinitionList;