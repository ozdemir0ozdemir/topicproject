"use strict";

import TopicRequest from "./topic-request.js";

const apiUrl = "http://localhost:8080/api/v1";

const TopicService = {

  async getAllTopicTitles(page) {
    try {
      const response = await fetch(`${apiUrl}/topics?page=${page}`);
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

  async getAllDefinitionsByTopicId(topicId) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/definitions`);
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
    try {
      const response = await fetch(`${apiUrl}/topics`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(TopicRequest.newTitle(topicTitle))
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

}

export default TopicService;