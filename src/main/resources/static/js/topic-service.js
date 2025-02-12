const apiUrl = "http://localhost:8080/api/v1";


export const TopicService = {

  async getAllTopicTitles() {
    try {
      const response = await fetch(`${apiUrl}/topics`);
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.log("Hata: ", error);
      return null;
    }
  },

  async getAllDefinitionsByTopicTitleId(topicTitleId) {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicTitleId}/definitions`);
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
        body: JSON.stringify({'title': topicTitle})
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
        body: JSON.stringify({
          'topicTitle': topic,
          'definition': definition,
          'topic_title_id': topic.id,
        })
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