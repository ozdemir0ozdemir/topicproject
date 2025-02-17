package ozdemir0ozdemir.topicproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

@Configuration
class ClockConfig {

    @Bean
    Clock returnClock() {
        return Clock.systemUTC();
    }
}
