"use strict";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.1
 *
 * Pagination Component
 * */
const DATA_PAGINATION_NAME = "data-pagination-name";
const HTML_TAG = "Pagination";

const PaginationPrivate = {
  paginationSets: new Map(),

  addPagination(paginationName,
                      currentPage,
                      totalPages,
                      firstPageButton,
                      previousPageButton,
                      nextPageButton,
                      lastPageButton,
                      selectElement) {

    const pagination = {
      currentPage: currentPage,
      totalPages: totalPages,
      selectElement: selectElement,
      firstPageButton: firstPageButton,
      previousPageButton: previousPageButton,
      nextPageButton: nextPageButton,
      lastPageButton: lastPageButton,
      listeners: []
    };

    this.paginationSets.set(paginationName, pagination);

    return pagination;
  },

  updatePagination(paginationName, currentPage, totalPages, invokeCallbacks) {
    const pagination = this.paginationSets.get(paginationName);
    if(!pagination){
      console.log("update - Pagination not found: ", paginationName);
      return;
    }

    // update model
    pagination.currentPage = currentPage;
    pagination.totalPages = totalPages;

    // recreate options and select current page
    pagination.selectElement.innerHTML =
        this.createOptionsElements(currentPage, totalPages);

    // updateButtonsDisabledStatus
    this.updateButtonsDisabledStatus(pagination);

    if(invokeCallbacks){
      pagination.listeners.forEach(lis => lis(currentPage));
    }
  },

  addPaginationChangeListener(paginationName, listener) {
    const pagination = this.paginationSets.get(paginationName);
    if(!pagination){
      console.log("listener - Pagination not found: ", paginationName);
      return;
    }

    pagination.listeners.push(listener);
  },

  createOptionsElements(currentPage, totalPages) {
    return [...Array(totalPages).keys()]
        .map(i => i + 1)
        .map(i => `<option${i === currentPage ? ' selected="selected"' : ''} value="${i}">${i}</option>`)
        .join("");
  },

  updateButtonsDisabledStatus(pagination) {
    pagination.firstPageButton.removeAttribute("disabled");
    pagination.previousPageButton.removeAttribute("disabled");
    pagination.nextPageButton.removeAttribute("disabled");
    pagination.lastPageButton.removeAttribute("disabled");

    if (pagination.currentPage === 1) {
      pagination.firstPageButton.setAttribute("disabled", "disabled");
      pagination.previousPageButton.setAttribute("disabled", "disabled");
    }

    if (pagination.currentPage === pagination.totalPages) {
      pagination.nextPageButton.setAttribute("disabled", "disabled");
      pagination.lastPageButton.setAttribute("disabled", "disabled");
    }
  },

};


const Pagination = {

  createSudoElement(paginationName = "noname",  cssClass = "") {
    const pagination = document.createElement("Pagination");
    pagination.setAttribute(DATA_PAGINATION_NAME, paginationName);
    pagination.classList = cssClass;
    return pagination;
  },

  init(parent = document.querySelector("body")) {
    parent
        .querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.render(sudoElement));
  },

  render(sudoElement) {
    // Prepare Root
    const paginationRoot = document.createElement("div");
    const paginationName = sudoElement.getAttribute(DATA_PAGINATION_NAME);
    paginationRoot.classList = "pagination " + sudoElement.classList;
    paginationRoot.setAttribute(DATA_PAGINATION_NAME, paginationName);

    paginationRoot.innerHTML = `
        <button class = "first-button" title="first page" data-action="first" type="button" disabled="disabled">|&lt;</button>
        <button class = "previous-button" title="previous page" data-action="previous" type="button" disabled="disabled">&lt;</button>
        <select title = "current page"></select>
        <button class = "next-button" title="next page" data-action="next" type="button">&gt;</button>
        <button class = "last-button" title="last page" data-action="last" type="button">&gt;|</button>
    `;

    // Prepare Model
    const model = PaginationPrivate.addPagination(
        paginationName,
        1,
        1,
        paginationRoot.querySelector(".first-button"),
        paginationRoot.querySelector(".previous-button"),
        paginationRoot.querySelector(".next-button"),
        paginationRoot.querySelector(".last-button"),
        paginationRoot.querySelector("select")
    );


    // Add Buttons and Select Listener
    // e.target.type = [button, select-one]
    // e.type = [click, change]
    const listener = e => {
      if (e.target.type === 'button' && e.type === 'click') {
        const action = e.target.getAttribute("data-action");
        switch (action) {
          case "next" :
             PaginationPrivate.updatePagination(paginationName, Math.min(model.currentPage += 1, model.totalPages), model.totalPages, true);
            break;
          case "previous" :
            PaginationPrivate.updatePagination(paginationName, Math.max(model.currentPage -= 1, 1), model.totalPages, true);
            break;
          case "first" :
            PaginationPrivate.updatePagination(paginationName, 1, model.totalPages,true);
            break;
          case "last" :
            PaginationPrivate.updatePagination(paginationName, model.totalPages, model.totalPages, true);
            break;
          default:
            break;
        }
      } else if (e.target.type === 'select-one' && e.type === 'change') {
        PaginationPrivate.updatePagination(paginationName, +e.target.value, model.totalPages, true);
      }
    };

    paginationRoot.addEventListener("click", listener);
    paginationRoot.addEventListener("change", listener);


    // Finally, replace sudo element with real one
    sudoElement.replaceWith(paginationRoot);
  },

  updatePagination(paginationName, currentPage, totalPages, invokeCallbacks) {
    PaginationPrivate.updatePagination(paginationName, currentPage, totalPages, invokeCallbacks);
  },

  addPaginationChangeListener(paginationName, listener) {
    PaginationPrivate.addPaginationChangeListener(paginationName, listener);
  },
}

Pagination.init();
export default Pagination;
