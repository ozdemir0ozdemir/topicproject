package ozdemir0ozdemir.topicproject.domain;

import java.time.Clock;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ozdemir0ozdemir.topicproject.api.response.PageResponse;
import ozdemir0ozdemir.topicproject.util.Sanitizer;

@Service
@RequiredArgsConstructor
public class TopicService {

	private final TopicRepository topicRepository;
	private final Clock clock;

	public TopicDto saveTopic(String title) {
		Topic topic = new Topic()
				.setTitle(title)
				.setSanitizedTitle(Sanitizer.sanitizeTitle(title))
				.setCreatedAt(Date.from(Instant.now(clock)));
		this.topicRepository.saveAndFlush(topic);

		return TopicDto.from(topic);
	}

	public TopicDto getTopicById(Long id) {
		return this.topicRepository
				.findById(id)
				.map(TopicDto::from)
				.orElseThrow(() -> new RuntimeException("Topic with id " + id + " searched, but not founded"));
	}

	public TopicDto getRandomTopic() {
		return this.topicRepository
				.findByRandom()
				.map(TopicDto::from)
				.orElseThrow(() -> new RuntimeException("No topic title found"));
	}

	/**
	 * @param page  is the page number
	 * @param month is zero based (0-11)
	 */
	public PageResponse<TopicProjection> getAllTopics(int page, Integer year, Integer month, Integer day) {
		Calendar calendar = Calendar.getInstance();

		calendar.set(year, month, day, 0, 0, 0);
		Date startDate = calendar.getTime();

		calendar.set(Calendar.DAY_OF_MONTH, day + 1);
		Date endDate = calendar.getTime();

		return PageResponse.of(
				this.topicRepository.findAllTopicDefinedByDay(startDate, endDate, PageRequest.of(page, 25)));
	}

	Topic getReferenceById(Long topicId) {
		return this.topicRepository.getReferenceById(topicId);
	}
}
