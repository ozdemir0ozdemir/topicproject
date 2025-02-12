package ozdemir0ozdemir.topicproject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ozdemir0ozdemir.topicproject.entity.TopicDefinition;
import ozdemir0ozdemir.topicproject.entity.TopicTitle;
import ozdemir0ozdemir.topicproject.service.TopicManager;

@Configuration
public class ExampleDataCreator {

	@Bean
	CommandLineRunner runner(TopicManager topics) {
		return args -> {
			TopicTitle title1 = new TopicTitle();
			title1.setTitle("10 şubat 2025 topicproject\'in başlaması");

			title1 = topics.saveTitle(title1);

			TopicDefinition definition = new TopicDefinition()
					.setTopicTitle(title1)
					.setDefinition("Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");

			topics.saveDefinition(definition);
		};
	}
}
