package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicRepository extends JpaRepository<Topic, Long> {

	@Query("from Topic order by random() limit 1")
	Optional<Topic> findByRandom();

	@Query(
			value =
					"""
	select t.id id, t.title title, t.sanitizedTitle sanitizedTitle, count(d.defId) totalDefinition
	from (select d.id defId ,d.topic.id topicId from Definition d where d.createdAt >= :startDate and d.createdAt < :endDate) d
	left join Topic t on t.id = d.topicId
	group by t.id
	""")
	Page<TopicProjection> findAllTopicDefinedByDay(Date startDate, Date endDate, Pageable pageable);
}
