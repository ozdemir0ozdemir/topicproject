package ozdemir0ozdemir.topicproject;

import org.springframework.boot.SpringApplication;

public class TestTopicprojectApplication {

	public static void main(String[] args) {
		SpringApplication
				.from(TopicprojectApplication::main)
				.with(TestcontainersConfiguration.class)
				.run(args);
	}

}
