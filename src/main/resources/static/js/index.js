"use strict";

import MainMaestro from "./component/main-maestro.js";
import SearchBar from "./component/search-bar.js";
import TopicService from "./api/topic-service.js";

MainMaestro.init();

SearchBar.init();
SearchBar.setListener("topic", title => {
  // TODO: First search topic then suggest to create new topic
  TopicService
      .saveNewTopicTitle(title)
      .then(topic => console.log("New topic saved: DO SOMETHING!!! : ", topic));
});

const tempDiv = document.createElement("div");
for(let i = 1; i <=3; i++) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("data-id", i);
  button.innerHTML = "button " + i;
  tempDiv.appendChild(button);
};

document.querySelector("header")
    .appendChild(tempDiv);

tempDiv.addEventListener("click", event => {
  const dataId = event.target.getAttribute("data-id");

  if(event.isTrusted && event.target.localName === "button" && dataId) {
    window.history.pushState({data: dataId}, "", "/topics/"+dataId+"/definitions");
    guessRoute();
  }
});

window.addEventListener("popstate", event => {
  // event.state !== null | undefined
  // event.state.data !== null | undefined
  guessRoute();

});

function guessRoute() {
  const route = window.location.pathname;
  if(route.search("/topics/[0-9]+/definitions") === 0){
    console.log(route);
    console.log("Route captured");
  }
}

