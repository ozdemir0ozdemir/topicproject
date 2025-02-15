package ozdemir0ozdemir.topicproject.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicDefinitionRepository extends JpaRepository<TopicDefinition, Long> {

	@Query("from TopicDefinition td where td.topicTitle.id = :topicTitleId")
	Page<TopicDefinition> findAllByTopicTitleId(Long topicTitleId, Pageable pageable);
}
