"use strict";


import TopicService from "../api/topic-service.js";
import Pagination from "./pagination.js";
import DefinitionForm from "./definition-form.js";


/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.1
 *
 * Definition List Component.
 * Can be used only once.
 * */
const HTML_TAG = "DefinitionList";
const PAGINATION_NAME = "definition";

const DefinitionListPrivate = {

  titleElement: undefined,
  definitionCardsElement: undefined,

  currentTopic: {
    id: null,
    title: null,
    sanitizedTitle: null,

    set(id, title, sanitizedTitle) {
      this.id = id;
      this.title = title;
      this.sanitizedTitle = sanitizedTitle;
    }
  },

  createDefinitionCard(id, definition) {
    return `
    <div class="definition-card">
      <div class="definition-card-id">${id}</div>
      <div class="topic-definition-text">
        ${definition.replaceAll("<", "&lt;")}
      </div>
    </div>
   `;
  },

  changeTopic(topic) {
    this.currentTopic.set(topic.id, topic.title, topic.sanitizedTitle);

    TopicService
        .getAllDefinitionsByTopicId(topic.id, 1)
        .then(pageable => {
          Pagination.updatePagination(PAGINATION_NAME, 1, pageable.totalPages, false);
          return pageable;
        })
        .then(definitionList => definitionList.content
            .map(({id, definition}) => this.createDefinitionCard(id, definition))
            .join(""))
        .then(definitionsHtml => this.definitionCardsElement.innerHTML = definitionsHtml);


    // this.titleElement.innerHTML = this.currentTopic.title;
    this.titleElement.innerHTML = "";
    let addInterval = setInterval(() => {
      if(this.titleElement.innerHTML.length !== this.currentTopic.title.length){
        this.titleElement.innerHTML = this.currentTopic.title.substring(0, this.titleElement.innerHTML.length + 1);
      }
      else {
        clearInterval(addInterval);
      }
    }, 5);

    document.title = this.currentTopic.title + " - TopicProject";
    document.querySelector(".right-frame").scrollTop = 0;

    DefinitionForm.setTopic(topic);
  },

  changePage(page) {
    TopicService
        .getAllDefinitionsByTopicId(this.currentTopic.id, page)
        .then(definitionList => definitionList.content
            .map(({id, definition}) => this.createDefinitionCard(id, definition))
            .join(""))
        .then(definitionsHtml => this.definitionCardsElement.innerHTML = definitionsHtml);
    document.querySelector(".right-frame").scrollTop = 0;
  },

};

const DefinitionList = {

  init(parentElement = document) {
    parentElement.querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.render(sudoElement));
  },

  async render(sudoElement) {
    // Create Dom Skeleton
    const definitionRoot = document.createElement("div");

    DefinitionListPrivate.titleElement = document.createElement("div");
    DefinitionListPrivate.titleElement.classList.add("definitions-title");

    DefinitionListPrivate.definitionCardsElement = document.createElement("div");
    DefinitionListPrivate.definitionCardsElement.classList.add("definition-cards");

    const headerRow = document.createElement("div");
    headerRow.classList.add("definition-header")

    headerRow.appendChild(DefinitionListPrivate.titleElement);
    headerRow.appendChild(Pagination.createSudoElement(PAGINATION_NAME, "definition-pagination"));
    await Pagination.init(headerRow);

    definitionRoot.appendChild(headerRow);
    definitionRoot.appendChild(DefinitionListPrivate.definitionCardsElement);


    // Set topic randomly
    TopicService
        .getTopicByRandom()
        .then(topic => DefinitionListPrivate.changeTopic(topic));

    Pagination.addPaginationChangeListener(PAGINATION_NAME, page => {
      DefinitionListPrivate.changePage(page);
    });

    sudoElement.replaceWith(definitionRoot);
  },

  changeTopicById(topicId) {
    TopicService
        .getTopicById(topicId)
        .then(topic => DefinitionListPrivate.changeTopic(topic));
  },



};

DefinitionList.init();
export default DefinitionList;

