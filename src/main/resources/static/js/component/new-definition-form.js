"use strict";

const NewDefinitionForm = {

  textarea: undefined,
  submit: undefined,
  submitCallback: undefined,

  init(textarea, submit, submitCallback) {

    this.textarea = textarea;
    this.submit = submit;

    submit.addEventListener("click", () => {
      if (textarea.value) {
        submitCallback(textarea.value);
        textarea.value = "";
      }

    });

    return this;
  },

  updatePlaceholder(title) {
    this.textarea.setAttribute(
        "placeholder",
        `Type to create new definition about "${title}"`);
  },

};

export default NewDefinitionForm;