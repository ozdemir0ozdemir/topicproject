package ozdemir0ozdemir.topicproject;

import org.springframework.boot.SpringApplication;
import ozdemir0ozdemir.topicproject.domain.ExampleDataCreator;

public class TopicProjectWithTestcontainersApp {

	public static void main(String[] args) {
		SpringApplication.from(TopicprojectApplication::main)
				.with(TestcontainersConfiguration.class)
				.with(ExampleDataCreator.class)
				.run(args);
	}
}
