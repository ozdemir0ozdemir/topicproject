package ozdemir0ozdemir.topicproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;
import ozdemir0ozdemir.topicproject.model.TopicTitle;
import ozdemir0ozdemir.topicproject.repository.TopicDefinitionRepository;
import ozdemir0ozdemir.topicproject.repository.TopicTitleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicManager {

    private final TopicTitleRepository topicTitleRepository;
    private final TopicDefinitionRepository topicDefinitionRepository;


    public TopicTitle saveTitle(TopicTitle title) {
        title.setId(null);
        return this.topicTitleRepository.save(title);
    }

    public TopicDefinition saveDefinition(TopicDefinition definition) {
        definition.setId(null);
        return this.topicDefinitionRepository.save(definition);
    }

    public List<TopicTitle> getAllTitles() {
        return this.topicTitleRepository.findAll();
    }

    public List<TopicDefinition> getDefinitionsByTitleId(Long topicTitleId) {
        return this.topicDefinitionRepository.findAllByTopicTitleId(topicTitleId);
    }
}
