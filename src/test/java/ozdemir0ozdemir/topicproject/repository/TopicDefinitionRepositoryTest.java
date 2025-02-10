package ozdemir0ozdemir.topicproject.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;
import ozdemir0ozdemir.topicproject.model.TopicTitle;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TopicDefinitionRepositoryTest {

    @Container
    @ServiceConnection
    static final PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    TopicTitleRepository titleRepository;

    @Autowired
    TopicDefinitionRepository definitionRepository;

    @BeforeEach
    public void setUp() {
        TopicTitle title1 = new TopicTitle();
        title1.setTitle("10 şubat 2025 topicproject\'in başlaması");

        title1 = titleRepository.save(title1);


        TopicDefinition definition = new TopicDefinition()
                .setTopicTitle(title1)
                .setDefinition("Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");

        definitionRepository.save(definition);
    }

    @AfterEach
    public void tearDown() {
        definitionRepository.deleteAll();
        titleRepository.deleteAll();
    }

    @Test
    void should_titleAndDefinitionBeFound() {
        assertThat(postgres.isRunning()).isTrue();

        List<TopicTitle> titles = titleRepository.findAll();
        assertThat(titles).hasSize(1);

        TopicTitle title = titles.getFirst();
        assertThat(title).isNotNull();
        assertThat(title.getTitle()).isEqualTo("10 şubat 2025 topicproject\'in başlaması");

        List<TopicDefinition> definitions = definitionRepository.findAllByTopicTitleId(title.getId());
        assertThat(definitions).hasSize(1);

        TopicDefinition definition = definitions.getFirst();
        assertThat(definition).isNotNull();
        assertThat(definition.getDefinition())
                .isEqualTo("Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");
    }

}