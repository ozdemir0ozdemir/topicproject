"use strict";

const TopicRequest = {

  newTitle(title) {
    return {'title': title};
  },

  newDefinition(definition) {
    return {'definition': definition};
  }

};

export default TopicRequest;