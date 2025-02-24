"use strict";

import {DEFINITION_FORM_TAG} from "../constant.js";

/**
 * @author Özdemir Özdemir
 * @email ozdemirozdemir@hotmail.com.tr
 * @github ozdemir0ozdemir
 *
 * @date 2025 February 14
 * @since 1.0
 * @version 1.1
 *
 * Definition Form
 * Can be used only once
 * */

const HTML_TAG = DEFINITION_FORM_TAG;
const PLACEHOLDER = "write something about";

const DefinitionFormPrivate = {

  definitionForm: {
    rootElement: undefined,
    textareaElement: undefined,
    submitElement: undefined,
    listener: undefined
  },


  init() {

    this.definitionForm.rootElement = document.createElement("div");
    this.definitionForm.rootElement.classList.add("definition-form");

    this.definitionForm.textareaElement = document.createElement("textarea");
    this.definitionForm.textareaElement.setAttribute("name", "definition-form-textare");
    this.definitionForm.textareaElement.setAttribute("placeholder", PLACEHOLDER);


    this.definitionForm.submitElement = document.createElement("button");
    this.definitionForm.submitElement.setAttribute("type", "button");
    this.definitionForm.submitElement.innerHTML = "Send"


    this.definitionForm.rootElement.appendChild(this.definitionForm.textareaElement);
    this.definitionForm.rootElement.appendChild(this.definitionForm.submitElement);
    return this.definitionForm;
  },

  setTopicTitle(title) {
    if (title.length > 0
        && title.trim().length > 0) {

      this.setPlaceholder(title);
    }
  },

  setPlaceholder(text) {
    if (!text && text.length === 0) {
      return;
    }

    const sanitizedText = this.sanitizeText(text);

    if (sanitizedText.length === 0) {
      return;
    }

    this.definitionForm.textareaElement.setAttribute(
        "placeholder",
        `${PLACEHOLDER} "${sanitizedText}"`);
  },

  setListener(listener) {
    if (listener && typeof listener === "function") {
      this.definitionForm.listener = listener;
    }
  },

  sanitizeText(text) {
    return text.trim().toLowerCase();
  },

  newDefinitionEntered() {
    this.definitionForm.listener(this.sanitizeText(this.definitionForm.textareaElement.value));
    this.definitionForm.textareaElement.value = "";
  },


};

const DefinitionForm = {

  init(parentElement = document.querySelector("body")) {

    const sudoElement = parentElement
        .querySelector(HTML_TAG);

    if (sudoElement) {
      const definitionForm = DefinitionFormPrivate.init();
      sudoElement.replaceWith(this.render(definitionForm));
    }
  },

  render(definitionForm) {

    definitionForm.textareaElement.addEventListener("keyup", event => {
      if (definitionForm.listener && event.isTrusted && event.key === "Enter" && event.code === "Enter") {
        DefinitionFormPrivate.newDefinitionEntered();
      }
    });

    definitionForm.submitElement.addEventListener("click", event => {
      if (definitionForm.listener && event.isTrusted && event.pointerId === 1) {
        DefinitionFormPrivate.newDefinitionEntered();
      }
    });

    return definitionForm.rootElement;
  },

  setTopicTitle(title) {
    DefinitionFormPrivate.setTopicTitle(title);
  },

  setListener(listener) {
    DefinitionFormPrivate.setListener(listener);
  },

  clear() {
    DefinitionFormPrivate.definitionForm.textareaElement.value = "";
  },
};

export default DefinitionForm;