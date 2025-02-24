"use strict";


import Pagination from "./pagination.js";
import DefinitionForm from "./definition-form.js";
import {DEFINITION_LIST_TAG} from "../constant.js";

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
const HTML_TAG = DEFINITION_LIST_TAG;

const DefinitionListPrivate = {

  definitionList: {
    rootElement: undefined,
    titleElement: undefined,
    listElement: undefined,
    showAllElement: undefined,
  },

  showAllButtonListener: undefined,

  init() {
    const list = this.definitionList;

    if(list.rootElement){
      return list;
    }

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

    list.rootElement.appendChild(headerElement);

    list.listElement = document.createElement("ul");
    list.rootElement.appendChild(list.listElement);

    list.showAllElement = document.createElement("button");
    list.showAllElement.setAttribute("type", "button");
    list.showAllElement.classList.add("definition-list-show-all-button");
    list.showAllElement.style.display = "block";
    list.showAllElement.innerHTML = "show all";

    list.showAllElement.addEventListener("click", e => {
      if(this.showAllButtonListener){
        this.showAllButtonListener(e);
      }
    });

    list.rootElement.appendChild(list.showAllElement);

    const sudoDefinitionFormElement = document.createElement("DefinitionForm");
    list.rootElement.appendChild(sudoDefinitionFormElement);
    DefinitionForm.init(list.rootElement);


    return list;
  },

  setDefinitionList(topicTitle, currentPage, totalPages, definitions, displayShowAll = true) {
    if(!this.definitionList.rootElement){
      return
    }

    Pagination.updatePagination(HTML_TAG, currentPage, totalPages, false);

    this.definitionList.titleElement.innerHTML = topicTitle;
    this.definitionList.listElement.innerHTML = definitions
        .map(def => this.createDefinitionCard(def))
        .join("");

    document.querySelector("html").scrollTop = 0;
    DefinitionListPrivate.definitionList.showAllElement.style.display = displayShowAll ? "block" : "none";

    DefinitionForm.setTopicTitle(topicTitle);
    DefinitionForm.clear();
  },


  createDefinitionCard(definition) {
    return `
    <li class="definition-list-item">
      ${definition.definition.replaceAll("<", "&lt;")}
      <div style="margin-top: 10px;">${new Date(definition.createdAt).toLocaleDateString()}</div>
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

  setDefinitionList(topicTitle, currentPage, totalPages, definitions, displayShowAll) {
    DefinitionListPrivate.setDefinitionList(topicTitle, currentPage, totalPages, definitions, displayShowAll);
  },

  setPageChangeListener(listener) {
    if (typeof listener !== "function") {
      return;
    }
    Pagination.addPaginationChangeListener(HTML_TAG, listener);
  },

  setDefinitionFormListener(listener) {
    if (typeof listener !== "function") {
      return;
    }
    DefinitionForm.setListener(listener);
  },

  setShowAllButtonListener(listener) {
    if (typeof listener !== "function") {
      return;
    }
    DefinitionListPrivate.showAllButtonListener = listener;
  }
};

export default DefinitionList;