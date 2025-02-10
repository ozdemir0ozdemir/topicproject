package ozdemir0ozdemir.topicproject.api;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;
import ozdemir0ozdemir.topicproject.model.TopicTitle;
import ozdemir0ozdemir.topicproject.service.TopicManager;

@RestController
@RequestMapping("api/v1/topics")
record TopicController(TopicManager topics) {

    @GetMapping
    List<TopicTitle> getAllTopicTitles() {
        return this.topics.getAllTitles();
    }

    @GetMapping("/definitions/{topicTitleId}")
    List<TopicDefinition> getAllTopicDefinitionsByTopicTitleUId(@PathVariable Long topicTitleId) {
        return this.topics.getDefinitionsByTitleId(topicTitleId);
    }
}
