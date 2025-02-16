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
 * Definition Form
 * Can be used only once
 * */

const HTML_TAG = "DefinitionForm";
const PLACEHOLDER = "Write something about";

const DefinitionFormPrivate = {

  definitionForm: {
    rootElement: undefined,
    textareaElement: undefined,
    submitElement: undefined,
    listener: undefined
  },

  topic: {
    id: undefined,
    title: undefined
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

  setTopic(topic) {
    if (topic.id
        && topic.id > 0
        && topic.title.length > 0
        && topic.title.trim().length > 0) {

      this.topic.id = topic.id;
      this.topic.title = topic.title;
      this.setPlaceholder(topic.title);
    }
  },

  setPlaceholder(text) {
    if (!text && text.length === 0) {
      return;
    }

    const sanitizedText = text.trim().toLowerCase();

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
  }


};

const DefinitionForm = {

  init(parentElement = document.querySelector("body")) {

    const sudoElement = parentElement
        .querySelector(HTML_TAG);

    if(sudoElement){
      const definitionForm = DefinitionFormPrivate.init();
      sudoElement.replaceWith(this.render(definitionForm));
    }
  },

  render(definitionForm) {

    definitionForm.textareaElement.addEventListener("keyup", event => {
      if (definitionForm.listener && event.isTrusted && event.key === "Enter" && event.code === "Enter") {

        definitionForm.listener(DefinitionFormPrivate.topic,
            DefinitionFormPrivate.sanitizeText(definitionForm.textareaElement.value));

        definitionForm.textareaElement.value = "";
      }
    });

    definitionForm.submitElement.addEventListener("click", event => {
      if (definitionForm.listener && event.isTrusted && event.pointerId === 1) {

        definitionForm.listener(DefinitionFormPrivate.topic,
            DefinitionFormPrivate.sanitizeText(definitionForm.textareaElement.value));

        definitionForm.textareaElement.value = "";
      }
    });

    return definitionForm.rootElement;
  },

  setTopic(topic) {
    DefinitionFormPrivate.setTopic(topic);
  },

  setListener(listener) {
    DefinitionFormPrivate.setListener(listener);
  },

};

export default DefinitionForm;