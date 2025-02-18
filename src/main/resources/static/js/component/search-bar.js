"use strict";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.2
 *
 * Search bar component
 * Can be used for multiple instances
 * */

const HTML_TAG = "SearchBar";
const PLACEHOLDER = "Search topics or create new ones...";

const SearchBarPrivate = {

  searchBars: new Map(),

  createSearchBarFor(searchBarName) {
    const rootElement = document.createElement("div");
    rootElement.classList.add("search-bar-container");

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("name", "search-bar-input");
    inputElement.setAttribute("placeholder", PLACEHOLDER);

    const submitElement = document.createElement("button")
    submitElement.setAttribute("type", "button");
    submitElement.innerHTML = `Search`;

    rootElement.appendChild(inputElement);
    rootElement.appendChild(submitElement);

    const searchBar = {
      'rootElement': rootElement,
      'inputElement': inputElement,
      'submitElement': submitElement,
      'listener': undefined,
    };

    this.searchBars.set(searchBarName, searchBar);

    return searchBar;
  },

  setListener(searchBarName, listener) {
    const searchBar = this.searchBars.get(searchBarName);
    if(searchBar && listener && typeof listener === "function"){
      searchBar.listener = listener;
    }
  },

  sanitizeTitle(title) {
    return title.trim().toLowerCase();
  },

};

const SearchBar = {

  init(parentElement = document.querySelector("body")) {

    parentElement
        .querySelectorAll(HTML_TAG)
        .forEach(sudoElement => {
          let name = sudoElement.getAttribute("name");

          if(!name || name.length === 0) {
            console.log("Name attribute must be defined in search-bar tag")
            return;
          }

          name = name.trim().toLowerCase();

          const searchBar = SearchBarPrivate.createSearchBarFor(name);
          searchBar.rootElement.setAttribute("name", name);
          sudoElement.replaceWith(this.render(searchBar));
        });
  },

  render(searchBar) {

    searchBar.inputElement.addEventListener("keyup", event => {
      if(searchBar.listener && event.isTrusted && event.key === "Enter" && event.code === "Enter") {
        searchBar.listener(SearchBarPrivate.sanitizeTitle(searchBar.inputElement.value));
        searchBar.inputElement.value = "";
      }
    });

    searchBar.submitElement.addEventListener("click", event => {
      if(searchBar.listener && event.isTrusted && event.pointerId === 1) {
        searchBar.listener(SearchBarPrivate.sanitizeTitle(searchBar.inputElement.value));
        searchBar.inputElement.value = "";
      }
    });


    return searchBar.rootElement;
  },

  setListener(searchBarName, listener) {
    SearchBarPrivate.setListener(searchBarName.trim().toLowerCase(), listener);
  },

};


export default SearchBar;