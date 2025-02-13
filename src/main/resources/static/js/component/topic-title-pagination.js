"use strict";

const tempDiv = document.createElement("div");
const currentPagesSelects = [];
let currentPage = 1;

const TopicTitlePagination = {

  init(rootElement = document) {
    rootElement
        .querySelectorAll("TopicTitlePagination")
        .forEach(element => element.replaceWith(TopicTitlePagination.render()));
  },

  render() {

    tempDiv.innerHTML = `
       <div class="topic-titles-pagination-container">
        <button class="topic-titles-pagination-button" title="first page" data-action="first" type="button">|&lt;</button>
        <button class="topic-titles-pagination-button" title="previous page" data-action="previous" type="button">&lt;</button>
        <select class="topic-titles-pagination-select" title="current page" type="button">
          <option value="1" selected="selected">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button class="topic-titles-pagination-button" title="next page" data-action="next" type="button">&gt;</button>
        <button class="topic-titles-pagination-button" title="last page" data-action="last" type="button">&gt;|</button>
      </div>
    `;


    const newSelector = tempDiv
        .querySelector(".topic-titles-pagination-select");
    currentPagesSelects.push(newSelector);

    newSelector
        .addEventListener("change", () => {
          currentPagesSelects.forEach(selector => {
            currentPage = newSelector.value;
            if (selector !== newSelector) {
              selector.value = newSelector.value;
            }
          })
        });

    tempDiv.firstElementChild
        .addEventListener("click", event => {
          event.preventDefault();
          if(event.target.localName === "button"){
            switch(event.target.getAttribute("data-action")){
              case "first":
                break;
              case "previous":
                break;
              case "next":
                break;
              case "last":
                break;
            }
          }

        });
    return tempDiv.firstElementChild;
  },

  getCurrentPage() {
    return currentPage;
  }

};

TopicTitlePagination.init();
export default TopicTitlePagination;