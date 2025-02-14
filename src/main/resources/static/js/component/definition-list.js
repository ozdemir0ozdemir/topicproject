"use strict";

import TopicService from "../api/topic-service.js";
import Pagination from "./pagination.js";


/* ---------------------------------------------------------------------------
* Private Section
* */
const HTML_TAG = "DefinitionList"

const DefinitionListInfo = {
  definitionHeaderElement: document.createElement("h1"),
  definitionCardsElement: document.createElement("div"),

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
  <div class="topic-definition-card">
    <div class="topic-definition-text">
      ${definition.replaceAll("<", "&lt;")}
    </div>
  </div>
 `;
},

  async setCurrentTopicById(topicId) {
    await TopicService
        .getTopicById(topicId)
        .then(({id, title, sanitizedTitle}) => {
          this.currentTopic.set(id, title, sanitizedTitle);
          document.title = `${title} - TopicProject`;
        });

    this.definitionHeaderElement.innerHTML = this.currentTopic.title;

    await TopicService.getAllDefinitionsByTopicId(this.currentTopic.id)
        .then(definitionList => definitionList
            .map(({id, definition}) => this.createDefinitionCard(id, definition))
            .join(""))
        .then(definitionsHtml => this.definitionCardsElement.innerHTML = definitionsHtml);

    document.querySelector(".right-frame")
        .scrollTop = 0;
  }
};


/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.0
 *
 * Definition List Component.
 * Can be used only once.
 * */
const DefinitionList = {
  init(parentElement = document) {
    parentElement.querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.replace(sudoElement));
  },

  replace(sudoElement) {
    const definitionRoot = document.createElement("div");

    DefinitionListInfo.definitionHeaderElement.classList.add("topic-definitions-title");
    DefinitionListInfo.definitionCardsElement.classList.add("topic-definition-cards");

    const headerRow = document.createElement("div");
    headerRow.classList.add("definition-header")

    headerRow.appendChild(DefinitionListInfo.definitionHeaderElement);
    headerRow.appendChild(Pagination.createSudoElement("definition", "definition-pagination"))

    definitionRoot.appendChild(headerRow);
    definitionRoot.appendChild(DefinitionListInfo.definitionCardsElement);

    Pagination
        .init(definitionRoot, 10);
    TopicService
        .getTopicByRandom()
        .then(topic => DefinitionListInfo.setCurrentTopicById(topic.id));

    sudoElement.replaceWith(definitionRoot);
  },

  changeTopicById(id) {
    DefinitionListInfo.setCurrentTopicById(id);
  },


};

DefinitionList.init();
export default DefinitionList;

