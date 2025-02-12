package ozdemir0ozdemir.topicproject.domain;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicManager {

	private final TopicTitleRepository topicTitleRepository;
	private final TopicDefinitionRepository topicDefinitionRepository;

	public TopicTitleDto saveTitle(String topicTitle) {
		var tt = new TopicTitle()
				.setTitle(topicTitle);
		tt = this.topicTitleRepository.save(tt);

		return TopicTitleDto.from(tt);
	}

	public TopicDefinitionDto saveDefinition(Long topicTitleId, String topicDefinition) {
		var td = new TopicDefinition()
				.setTopicTitle(this.topicTitleRepository.getReferenceById(topicTitleId))
				.setDefinition(topicDefinition);

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

	public List<TopicTitleDto> getAllTitles() {
		return this.topicTitleRepository
				.findAll().stream()
				.map(TopicTitleDto::from)
				.toList();
	}

	public List<TopicDefinitionDto> getDefinitionsByTitleId(Long topicTitleId) {
		return this.topicDefinitionRepository
				.findAllByTopicTitleId(topicTitleId).stream()
				.map(TopicDefinitionDto::from)
				.toList();
	}

}
