package ozdemir0ozdemir.topicproject.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface TopicTitleRepository extends JpaRepository<TopicTitle, Long> {

	@Query("from TopicTitle order by random() limit 1")
	Optional<TopicTitle> findByRandom();
}
