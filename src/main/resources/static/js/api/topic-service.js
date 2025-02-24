"use strict";

import TopicRequest from "./topic-request.js";

const apiUrl = "http://localhost:8080/api/v1";

const TopicService = {

  async getAllTopicTitles(page, year, month, day) {
    try {
      const response = await fetch(`${apiUrl}/topics?page=${page}&date=${year}-${month}-${day}`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async getTopicByRandom() {
    try {
      const response = await fetch(`${apiUrl}/topics/random`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async getTopicById(topicId) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async getFilteredDefinitionsByTopicId(topicId, page, year, month, day) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/definitions?page=${page}&date=${year}-${month}-${day}`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async getAllDefinitionsByTopicId(topicId, page) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/definitions?page=${page}`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async saveNewTopicTitle(topicTitle) {
    if(!topicTitle && topicTitle.trim().length <= 0){
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/topics`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(TopicRequest.newTitle(topicTitle.trim().toLowerCase()))
      });
      if (!response.ok) {
        throw new Error(`Error: ${topicTitle} cannot be saved`);
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async saveNewTopicDefinition(topic, definition) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topic.id}/definitions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(TopicRequest.newDefinition(definition))
      });
      if (!response.ok) {
        throw new Error(`Error: definition cannot be saved`);
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async searchTopicsByTitle(title) {
    try {
      const response = await fetch(`${apiUrl}/topics/search/${title}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      if (!response.ok) {
        throw new Error(`Error: cannot be searched`);
      }
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  },



}

export default TopicService;