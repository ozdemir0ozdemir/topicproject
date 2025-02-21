package ozdemir0ozdemir.topicproject.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

interface DefinitionRepository extends JpaRepository<Definition, Long> {

	@Query("""
	from Definition d 
	where d.topic.id = :topicId 
	and d.createdAt >= :startDate
	and d.createdAt < :endDate
	order by d.createdAt asc
	""")
	Page<Definition> findAllByTopicId(Long topicId, Date startDate, Date endDate, Pageable pageable);
}
