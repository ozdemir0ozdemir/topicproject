"use strict";


/* ---------------------------------------------------------------------------
* Private Section
* */
const DATA_PAGINATION_FOR = "data-pagination-for";
const HTML_TAG = "Pagination";

const PageInfo = {
  pages: new Map(),
  pageChangedListeners: [],

  goNextPageFor(paginationFor) {
    const page = this.get(paginationFor);
    if (page.currentPage === page.totalPages) {
      return
    }

    this.setCurrentPageFor(paginationFor, this.pages.get(paginationFor).currentPage + 1);
  },

  goPreviousPageFor(paginationFor) {
    const page = this.get(paginationFor);
    if (page.currentPage === 1) {
      return;
    }

    this.setCurrentPageFor(paginationFor, this.get(paginationFor).currentPage - 1);
  },

  goFirstPageFor(paginationFor) {
    this.setCurrentPageFor(paginationFor, 1);
  },

  goLastPageFor(paginationFor) {
    this.setCurrentPageFor(paginationFor, this.get(paginationFor).totalPages);
  },

  setCurrentPageFor(paginationFor, pageNumber) {
    const page = this.get(paginationFor);

    // Bounds security
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    pageNumber = pageNumber > page.totalPages ? page.totalPages : pageNumber;
    page.currentPage = +pageNumber;

    // Previous & Next Buttons disable-enable
    if(page.currentPage === 1){
      page.previousButtons.forEach(btn => btn.setAttribute("disabled", "disabled"));
    }
    else {
      page.previousButtons.forEach(btn => btn.removeAttribute("disabled"));
    }

    if(page.currentPage === page.totalPages){
      page.nextButtons.forEach(btn => btn.setAttribute("disabled", "disabled"));
    }
    else {
      page.nextButtons.forEach(btn => btn.removeAttribute("disabled"));
    }

    this.pages.set(paginationFor, page);

    // update all selectors
    this.get(paginationFor)
        .selectElement
        .forEach(select => select.value = pageNumber);

    // FIXME : invoke proper listener
    this.pageChangedListeners.forEach(listener => listener(pageNumber, paginationFor))
  },

  updateTotalPagesFor(paginationFor, totalPages) {
    const pagination = this.get(paginationFor);

    pagination.totalPages = totalPages;

    pagination.selectElement.forEach(el => {
      el.innerHTML = "";

      for(let i = 1; i <= totalPages; i++) {
          el.innerHTML += `<option value="${i}" ${pagination.currentPage === i ? 'selected="selected"':''}>${i}</option>`;
      }
    });
  },

  create(paginationFor, currentPage, totalPages, selectElement, previousButtons, nextButtons) {
    if (this.get(paginationFor)) {
      const oldPage = this.get(paginationFor);
      oldPage.selectElement.push(selectElement);
    } else {
      this.pages.set(
          paginationFor,
          {
            'currentPage': +currentPage,
            'totalPages': +totalPages,
            'selectElement': [selectElement],
            'previousButtons': previousButtons,
            'nextButtons': nextButtons
          }
      );
    }
  },

  get(paginationFor) {
    return this.pages.get(paginationFor);
  }

}

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.0
 *
 * Pagination Component
 * */
const Pagination = {


  createSudoElement(paginationFor, cssClass) {
    const pagination = document.createElement("Pagination");
    pagination.setAttribute("data-pagination-for", paginationFor);
    if(cssClass){
      pagination.classList.add(cssClass);
    }
    return pagination;
  },

  // FIXME : add listener by paginationFor property
  addPageChangedListener(listener) {
    PageInfo.pageChangedListeners.push(listener);
  },

  updateTotalPagesFor(paginationFor, totalPages) {
     PageInfo.updateTotalPagesFor(paginationFor, totalPages);
  },

  init(parent = document, totalPages) {
    parent
        .querySelectorAll(HTML_TAG)
        .forEach(sudoElement => this.render(sudoElement, totalPages));
  },

  render(sudoElement, totalPages) {
    const paginationRoot = document.createElement("div");
    const paginationFor = sudoElement.getAttribute(DATA_PAGINATION_FOR);
    paginationRoot.classList.add("pagination");
    paginationRoot.setAttribute(DATA_PAGINATION_FOR, paginationFor);

    paginationRoot.innerHTML = `
        <button class ="previous-button" title="first page" data-action="first" type="button" disabled="disabled">|&lt;</button>
        <button class ="previous-button" title="previous page" data-action="previous" type="button" disabled="disabled">&lt;</button>
        <select title="current page">
        </select>
        <button class ="next-button" title="next page" data-action="next" type="button">&gt;</button>
        <button class ="next-button" title="last page" data-action="last" type="button">&gt;|</button>
    `;

    const selector = paginationRoot.querySelector("select");
    for(let i = 1; i <= totalPages; i++) {
      selector.innerHTML += `<option value="${i}">${i}</option>`;
    }

    PageInfo.create(
        paginationFor,
        1,
        totalPages,
        paginationRoot.querySelector("select"),
        paginationRoot.querySelectorAll(".previous-button"),
        paginationRoot.querySelectorAll(".next-button")
    );

    // e.target.type = [button, select-one]
    // e.type = [click, change]
    const listener = e => {
      if (e.target.type === 'button' && e.type === 'click') {
        const action = e.target.getAttribute("data-action");
        switch (action) {
          case "next" :
            PageInfo.goNextPageFor(paginationFor);
            break;
          case "previous" :
            PageInfo.goPreviousPageFor(paginationFor);
            break;
          case "first" :
            PageInfo.goFirstPageFor(paginationFor);
            break;

          case "last" :
            PageInfo.goLastPageFor(paginationFor);
            break;
          default:
            break;
        }
      } else if (e.target.type === 'select-one' && e.type === 'change') {
        PageInfo.setCurrentPageFor(paginationFor, e.target.value);
      }
    };

    paginationRoot.addEventListener("click", listener);
    paginationRoot.addEventListener("change", listener);

    paginationRoot.classList.add(sudoElement.classList);
    sudoElement.replaceWith(paginationRoot);
  }

}

Pagination.init();
export default Pagination;
