package ozdemir0ozdemir.topicproject.domain;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TopicTitleRepositoryTest {

    @Container
    @ServiceConnection
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    private TopicTitleRepository topicTitleRepository;


    private static final ZonedDateTime now = ZonedDateTime.of(
            2025,1,10,
            0,0,0,
            0, ZoneId.of("UTC")
    );

    private final Clock clock = new Clock() {
        @Override
        public ZoneId getZone() {
            return now.getZone();
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return now.toInstant();
        }
    };


    @BeforeEach
    void beforeEach() {
        TopicTitle tt_yesterday = new TopicTitle(
                null,
                "yesterdays title",
                "yesterdays-title",
                Date.from(Instant.now(clock).minus(1, ChronoUnit.DAYS))
        );

        TopicTitle tt_today = new TopicTitle(
                null,
                "todays title",
                "todays-title",
                Date.from(Instant.now(clock))
        );

        topicTitleRepository.save(tt_yesterday);
        topicTitleRepository.save(tt_today);
    }

    @AfterEach
    void afterEach() {
        topicTitleRepository.deleteAll();
    }

    @Test
    void should_findAllTopics_ByCreationDate() {
        Calendar calendar = Calendar.getInstance();

        calendar.set(now.getYear(), now.getMonthValue() - 1, now.getDayOfMonth() - 1, 0, 0, 0);
        Date yesterdayDate =  calendar.getTime();

        calendar.set(Calendar.DAY_OF_MONTH, now.getDayOfMonth());
        Date todayDate =  calendar.getTime();

        calendar.set(Calendar.DAY_OF_MONTH, now.getDayOfMonth() + 1);
        Date tomorrowDate =  calendar.getTime();

        Page<TopicTitleWithDefCount> pageYesterday = topicTitleRepository
                .findAllTopicDateFiltered(
                        yesterdayDate,
                        todayDate,
                        PageRequest.of(0, 10)
                );

        assertThat(pageYesterday.getTotalElements()).isEqualTo(1);
        TopicTitleWithDefCount topicYesterday = pageYesterday.getContent().getFirst();
        assertThat(topicYesterday.getTopicTitleSanitized()).isEqualTo("yesterdays-title");


        Page<TopicTitleWithDefCount> pageToday = topicTitleRepository
                .findAllTopicDateFiltered(
                        todayDate,
                        tomorrowDate,
                        PageRequest.of(0, 10)
                );

        assertThat(pageToday.getTotalElements()).isEqualTo(1);
        TopicTitleWithDefCount topicToday = pageToday.getContent().getFirst();
        assertThat(topicToday.getTopicTitleSanitized()).isEqualTo("todays-title");
    }

}