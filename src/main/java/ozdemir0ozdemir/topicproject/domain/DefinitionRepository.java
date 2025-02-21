package ozdemir0ozdemir.topicproject.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface DefinitionRepository extends JpaRepository<Definition, Long> {

	@Query("from Definition d where d.topic.id = :topicId order by d.createdAt asc")
	Page<Definition> findAllByTopicId(Long topicId, Pageable pageable);
}
