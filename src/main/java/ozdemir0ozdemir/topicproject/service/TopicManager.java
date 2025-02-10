package ozdemir0ozdemir.topicproject.service;

import lombok.RequiredArgsConstructor;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;
import ozdemir0ozdemir.topicproject.model.TopicTitle;
import ozdemir0ozdemir.topicproject.repository.TopicDefinitionRepository;
import ozdemir0ozdemir.topicproject.repository.TopicTitleRepository;

import java.util.List;

@RequiredArgsConstructor
public class TopicManager {

    private final TopicTitleRepository topicTitleRepository;
    private final TopicDefinitionRepository topicDefinitionRepository;

    public List<TopicTitle> getTitles() {
        return this.topicTitleRepository.findAll();
    }

    public List<TopicDefinition> getDefinitionsByTitleId(Long topicTitleId) {
        return this.topicDefinitionRepository.findAllByTopicTitleId(topicTitleId);
    }
}
