"use strict";

import MainMaestro from "./main-maestro.js";
import {DATE_FILTER_TAG} from "../constant.js";

const HTML_TAG = DATE_FILTER_TAG;

const DateFilterPrivate = {

  rootElement: undefined,

  inputDateElement: undefined,

  init() {
    this.rootElement = document.createElement("div")
    this.inputDateElement = document.createElement("input");

    this.rootElement.classList.add("date-filter");

    this.inputDateElement.setAttribute("type", "date");
    this.inputDateElement.setAttribute("name", "date");
    this.inputDateElement.setAttribute("id", "date");
    this.inputDateElement.setAttribute("title", "date");

    this.rootElement.appendChild(this.inputDateElement);

    this.inputDateElement.valueAsDate = new Date();
    this.inputDateElement
        .addEventListener("change", () => {
          MainMaestro.setDateFilter(
              this.inputDateElement.valueAsDate.getUTCFullYear(),
              this.inputDateElement.valueAsDate.getUTCMonth() + 1,
              this.inputDateElement.valueAsDate.getUTCDate())
        });
  }

}

const DateFilter = {

  init(parentElement) {
    const sudoElement = parentElement.querySelector(HTML_TAG);
    if(!sudoElement){
      return;
    }
    DateFilterPrivate.init();
    sudoElement.replaceWith(this.render());
  },

  render() {

    return DateFilterPrivate.rootElement;
  }

}

export default DateFilter;