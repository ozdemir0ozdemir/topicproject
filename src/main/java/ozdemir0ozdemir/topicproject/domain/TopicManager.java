package ozdemir0ozdemir.topicproject.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ozdemir0ozdemir.topicproject.util.Sanitizer;

import java.time.Clock;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TopicManager {

	private final TopicTitleRepository topicTitleRepository;
	private final TopicDefinitionRepository topicDefinitionRepository;
	private final Clock clock;

	public TopicTitleDto saveTitle(String topicTitle) {
		var tt = new TopicTitle()
				.setTitle(topicTitle)
				.setTopicTitleSanitized(Sanitizer.sanitizeTitle(topicTitle))
				.setCreatedAt(Date.from(Instant.now(clock)));
		tt = this.topicTitleRepository.save(tt);

		return TopicTitleDto.from(tt);
	}

	public TopicDefinitionDto saveDefinition(Long topicTitleId, String topicDefinition) {
		var td = new TopicDefinition()
				.setTopicTitle(this.topicTitleRepository.getReferenceById(topicTitleId))
				.setDefinition(topicDefinition)
				.setCreatedAt(Date.from(Instant.now(clock)));

		td = this.topicDefinitionRepository.save(td);
		return TopicDefinitionDto.from(td);
	}

	public TopicTitleDto getTitleByTitleId(Long titleId) {
		return this.topicTitleRepository
				.findById(titleId)
				.map(TopicTitleDto::from)
				.orElseThrow(
						() -> new RuntimeException("Topic title with id " + titleId + " searched, but not founded"));
	}

	public TopicTitleDto getTitleBySanitizedTitle(String topicTitleIdentifier) {
		return this.topicTitleRepository
				.findByTopicTitleIdentifier(topicTitleIdentifier)
				.map(TopicTitleDto::from)
				.orElseThrow(() -> new RuntimeException(
						"Topic title with id " + topicTitleIdentifier + " searched, but not founded"));
	}

	public TopicTitleDto getTitleByRandom() {
		return this.topicTitleRepository
				.findByRandom()
				.map(TopicTitleDto::from)
				.orElseThrow(() -> new RuntimeException("No topic title found"));
	}

	public Page<TopicTitleDto> getAllTitles(int page) {
		return this.topicTitleRepository.findAll(PageRequest.of(page, 25)).map(TopicTitleDto::from);
	}

	public Page<TopicTitleWithDefCount> getAllTitlesWithDefCount(int page) {
		return this.topicTitleRepository.findAllTopic(PageRequest.of(page, 25));
	}

	public Page<TopicDefinitionDto> getDefinitionsByTitleId(Long topicTitleId, int page) {
		return this.topicDefinitionRepository
				.findAllByTopicTitleId(topicTitleId, PageRequest.of(page, 10))
				.map(TopicDefinitionDto::from);
	}
}
