package ozdemir0ozdemir.topicproject.domain;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicTitleRepository extends JpaRepository<TopicTitle, Long> {

	@Query("from TopicTitle order by random() limit 1")
	Optional<TopicTitle> findByRandom();

	@Query("from TopicTitle tt where tt.topicTitleSanitized = :topicTitleIdentifier")
	Optional<TopicTitle> findByTopicTitleIdentifier(String topicTitleIdentifier);

	@Query(
			"""
		select tt.id as id, tt.title as title, tt.topicTitleSanitized as topicTitleSanitized, count(td.id) as totalDefinition
		from TopicTitle as tt
		left join TopicDefinition as td on td.topicTitle.id = tt.id
		group by tt.id
		order by tt.createdAt desc, tt.id
	""")
	Page<TopicTitleWithDefCount> findAllTopic(Pageable pageable);
}
