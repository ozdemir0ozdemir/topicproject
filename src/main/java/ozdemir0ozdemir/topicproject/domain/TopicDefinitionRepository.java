package ozdemir0ozdemir.topicproject.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicDefinitionRepository extends JpaRepository<TopicDefinition, Long> {

	@Query("from TopicDefinition td where td.topicTitle.id = :topicTitleId")
	Page<TopicDefinition> findAllByTopicTitleId(Long topicTitleId, Pageable pageable);

	@Query("""
	select tt.id as id, tt.title as title, tt.topicTitleSanitized as topicTitleSanitized, count(td.id) as totalDefinition
	from TopicDefinition as td
	left join TopicTitle as tt on td.topicTitle.id = tt.id
	group by tt.id
	order by tt.id
	""")
	Page<TopicTitleWithDefCount> findAllTopic(Pageable pageable);
}
