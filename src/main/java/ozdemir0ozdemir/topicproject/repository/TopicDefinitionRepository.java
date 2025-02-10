package ozdemir0ozdemir.topicproject.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;

public interface TopicDefinitionRepository extends JpaRepository<TopicDefinition, Long> {

    @Query("from TopicDefinition td where td.topicTitle.id = :topicTitleId")
    List<TopicDefinition> findAllByTopicTitleId(Long topicTitleId);
}
