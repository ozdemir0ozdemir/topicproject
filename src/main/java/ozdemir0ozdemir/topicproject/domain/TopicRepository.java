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

	@Query("""
	select t.id id, t.title title, t.sanitizedTitle sanitizedTitle, count(d.id) totalDefinition from Topic t
	left join Definition d on d.topic.id = t.id and d.createdAt between :startDate and :endDate
	group by t.id
	having count(d.id) > 0
	""")
	Page<TopicProjection> findAllTopicDefinedByDay(Date startDate, Date endDate, Pageable pageable);
}
