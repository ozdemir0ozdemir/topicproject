package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface TopicTitleRepository extends JpaRepository<TopicTitle, Long> {

	@Query("from TopicTitle order by random() limit 1")
	Optional<TopicTitle> findByRandom();

	@Query("from TopicTitle tt where tt.topicTitleSanitized = :topicTitleIdentifier")
	Optional<TopicTitle> findByTopicTitleIdentifier(String topicTitleIdentifier);

	@Query(
			"""
		select tt.topicId as id, tt.topicTitle as title, tt.topicTitleSanitized as topicTitleSanitized, tt.createdAt as creationDate, count(td.id) as totalDefinition
		from TopicTitle as tt
		left join TopicDefinition as td on td.topicTitle.topicId = tt.topicId
		group by tt.topicId
		order by tt.createdAt desc, tt.topicId
	""")
	Page<TopicTitleWithDefCount> findAllTopic(Pageable pageable);

	@Query(
			"""
		select tt.topicId as id, tt.topicTitle as title, tt.topicTitleSanitized as topicTitleSanitized, tt.createdAt as creationDate, count(td.id) as totalDefinition
		from TopicTitle as tt
		left join TopicDefinition as td on td.topicTitle.topicId = tt.topicId
		group by tt.topicId
		having tt.createdAt >= :filterStartDate and tt.createdAt < :filterEndDate
		order by tt.createdAt desc, tt.topicId
	""")
	Page<TopicTitleWithDefCount> findAllTopicDateFiltered(
			@Param("filterStartDate") Date filterStartDate,
			@Param("filterEndDate") Date filterEndDate,
			Pageable pageable);
}
