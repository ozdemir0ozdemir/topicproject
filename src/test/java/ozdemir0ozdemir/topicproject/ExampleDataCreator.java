package ozdemir0ozdemir.topicproject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ozdemir0ozdemir.topicproject.domain.TopicManager;
import ozdemir0ozdemir.topicproject.domain.TopicTitleDto;

@Configuration
public class ExampleDataCreator {

	@Bean
	CommandLineRunner runner(TopicManager topics) {
		return args -> {
			TopicTitleDto title = topics.saveTitle("10 şubat 2025 topicproject\'in başlaması");
			topics.saveDefinition(
					title.id(), "Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");
		};
	}
}
