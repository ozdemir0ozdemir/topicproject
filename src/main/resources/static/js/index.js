"use strict";

import MainMaestro from "./component/main-maestro.js";
import TopicService from "./api/topic-service.js";
import SearchBox from "./component/search-box.js";

MainMaestro.init();


SearchBox.init(document.querySelector("body"));
SearchBox.setSelectionListener(id => {
  console.log(id);
});

let sbInterval = 0;
SearchBox.setTypedListener(term => {
  clearTimeout(sbInterval);
  sbInterval = setTimeout(() => {
      if(term.trim().length === 0){
        return;
      }
      TopicService.searchTopicsByTitle(term)
          .then(topics => SearchBox.setList(topics));
  }, 50);
});

SearchBox.setNotFoundListener(term => {
  // TODO: Suggest to create new topic
  console.log("\"" , term , "\" is not found");
});