package ozdemir0ozdemir.topicproject.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicDefinitionRepository extends JpaRepository<TopicDefinition, Long> {

	@Query("from TopicDefinition td where td.topicTitle.id = :topicTitleId")
	List<TopicDefinition> findAllByTopicTitleId(Long topicTitleId);
}
