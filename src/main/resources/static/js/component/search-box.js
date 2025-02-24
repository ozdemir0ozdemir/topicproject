"use strict";

import {SEARCH_BOX_TAG} from "../constant.js";

const HTML_TAG = SEARCH_BOX_TAG;
const SearchBoxPrivate = {

  html: {
    container: undefined,
    input: undefined,
    submit: undefined,
    list: undefined,
  },

  selectedIndex: 0,
  listSize: 0,

  selectionListener: undefined,
  typedListener: undefined,
  notFoundListener: undefined,


  init() {
    // container
    this.html.container = document.createElement("div");
    this.html.container.classList.add("search-box");


    // input
    this.html.input = document.createElement("input");
    this.html.input.setAttribute("type", "text");
    this.html.input.setAttribute("placeholder", "Search topics or create ones...");
    this.html.container.appendChild(this.html.input);

    // submit
    this.html.submit = document.createElement("button")
    this.html.submit.setAttribute("type", "button");
    this.html.submit.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    this.html.container.appendChild(this.html.submit);

    // list
    this.html.list = document.createElement("ul");
    this.html.container.appendChild(this.html.list);
    this.html.list.style.display = "none";


    this.initEvents();
    return this.html;
  },

  initEvents() {
    const focusListener = event => {
      if (event.type === "focusout") {
        setTimeout(() => {
          this.html.list.style.display = "none";
        }, 200);
      }
    };
    this.html.container.addEventListener("focusin", focusListener);
    this.html.container.addEventListener("focusout", focusListener);


    const listClickListener = event => {
      if (this.selectionListener) {
        this.selectionListener(+event.target.getAttribute("data-id"))
        this.blurAndClear();
      }

    };
    this.html.list.addEventListener("click", listClickListener);


    const keyDownListener = event => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        this.selectedIndex = Math.max(-2, --this.selectedIndex);
        if(this.selectedIndex === -2) {
          this.selectedIndex = this.listSize;
        }
        this.selectListItem(this.selectedIndex);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        this.selectedIndex = Math.min(this.listSize + 1, ++this.selectedIndex);
        if(this.selectedIndex === this.listSize + 1) {
          this.selectedIndex = 0;
        }
        this.selectListItem(this.selectedIndex);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const selectedItem = this.getSelectedItem();

        if (this.listSize > 0 && selectedItem && this.selectionListener) {
          this.selectionListener(+selectedItem.getAttribute("data-id"))
          this.blurAndClear();
        }
        else if(!selectedItem && this.notFoundListener) {
          this.notFoundListener(this.html.input.value);
          this.blurAndClear();
        }

      }

    };
    this.html.input.addEventListener('keydown', keyDownListener);

    const keyUpListener = event => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Enter") {
        event.preventDefault();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        this.blurAndClear();
        return;
      }

      if (this.html.input.value.trim().length === 0) {
        this.html.list.style.display = "none";
        this.html.list.innerHTML = "";
        return;
      }

      const input = this.html.input;
      let temp = "";

      for (let i = 0; i < input.value.length; i++) {
        if (input.value.charAt(i).match("[a-zA-Z0-9 ığüşöçĞÜŞİÖÇ]")) {
          temp += input.value.charAt(i);
        }
      }
      input.value = temp;
      if (this.typedListener && temp.trim() !== "") {
        this.typedListener(temp);
      }
    };
    this.html.input.addEventListener('keyup', keyUpListener);
  },

  blurAndClear() {
    this.html.input.blur();
    this.html.input.value = "";
    this.html.list.innerHTML = "";
    this.listSize = 0;
    this.selectListItem(0);
  },

  setSelectionListener(listener) {
    if (typeof listener === "function") {
      this.selectionListener = listener;
    }
  },

  setNotFoundListener(listener) {
    if (typeof listener === "function") {
      this.notFoundListener = listener;
    }
  },

  setTypedListener(listener) {
    if (typeof listener === "function") {
      this.typedListener = listener;
    }
  },

  setList(topicList) {
    if (topicList.content.length <= 0) {
      this.listSize = 0;
      this.html.list.style.display = "none";
      return;
    }

    this.html.list.innerHTML = topicList.content
        .map(topic => this.createListHtmlFromTopic(topic))
        .join("");
    this.html.list.style.display = "block";
    this.listSize = topicList.content.length - 1;
    this.selectListItem(-1);

  },

  selectListItem(number) {
    this.selectedIndex = number;
    const list = this.html.list.children;
    for (let i = 0; i < list.length; i++) {
      const listItem = list.item(i);
      listItem.classList.remove("search-box-select");
      if (i === +number) {
        listItem.classList.add("search-box-select");
      }
    }
  },

  getSelectedItem() {
    if(this.selectedIndex < 0){
      return null;
    }
    return this.html.list.children.item(this.selectedIndex);
  },

  createListHtmlFromTopic(topic) {
    return `<li data-id="${topic.id}">${topic.title}</li>`;
  },
};

const SearchBox = {


  init(parentElement) {
    const sudoElement = parentElement.querySelector(HTML_TAG);
    sudoElement.replaceWith(this.render(SearchBoxPrivate.init()))
  },

  render(html) {
    return html.container;
  },

  setSelectionListener(listener) {
    SearchBoxPrivate.setSelectionListener(listener);
  },

  setTypedListener(listener) {
    SearchBoxPrivate.setTypedListener(listener);
  },

  setNotFoundListener(listener) {
    SearchBoxPrivate.setNotFoundListener(listener);
  },

  setList(topicList) {
    SearchBoxPrivate.setList(topicList);
  },
};

export default SearchBox;