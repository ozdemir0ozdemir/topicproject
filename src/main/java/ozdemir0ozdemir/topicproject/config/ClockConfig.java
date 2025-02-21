package ozdemir0ozdemir.topicproject.config;

import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class ClockConfig {

	@Bean
	Clock returnClock() {
		return Clock.systemUTC();
	}
}
