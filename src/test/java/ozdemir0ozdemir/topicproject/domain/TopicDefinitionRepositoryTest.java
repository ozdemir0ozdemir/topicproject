package ozdemir0ozdemir.topicproject.domain;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TopicDefinitionRepositoryTest {

	@Container
	@ServiceConnection
	static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

	@Autowired
	TopicTitleRepository titleRepository;

	@Autowired
	TopicDefinitionRepository definitionRepository;

	private TopicTitle title;
	private TopicDefinition definition;

	@BeforeEach
	public void setUp() {
		title = new TopicTitle();
		title.setTitle("10 şubat 2025 topicproject\'in başlaması");

		title = titleRepository.save(title);

		definition = new TopicDefinition()
				.setTopicTitle(title)
				.setDefinition("Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");

		definitionRepository.save(definition);
	}

	@AfterEach
	public void tearDown() {
		definitionRepository.deleteAll();
		titleRepository.deleteAll();
	}
}
