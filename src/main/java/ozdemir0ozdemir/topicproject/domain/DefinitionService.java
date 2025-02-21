package ozdemir0ozdemir.topicproject.domain;

import java.time.Clock;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ozdemir0ozdemir.topicproject.api.response.PageResponse;

@Service
@RequiredArgsConstructor
public class DefinitionService {

	private final DefinitionRepository repository;
	private final TopicService topicService;
	private final Clock clock;

	public DefinitionDto saveDefinition(Long topicId, String definitionText) {
		Definition definition = new Definition()
				.setTopic(this.topicService.getReferenceById(topicId))
				.setDefinition(definitionText)
				.setCreatedAt(Date.from(Instant.now(clock)));

		definition = this.repository.save(definition);
		return DefinitionDto.from(definition);
	}

	public PageResponse<DefinitionDto> getDefinitionsByTitleId(Long topicId, int page, int year, int month, int day) {
		Calendar calendar = Calendar.getInstance();

		calendar.set(year, month, day, 0, 0, 0);
		Date startDate = calendar.getTime();

		calendar.set(Calendar.DAY_OF_MONTH, day + 1);
		Date endDate = calendar.getTime();

		return PageResponse.of(this.repository
				.findAllByTopicId(topicId, startDate, endDate, PageRequest.of(page, 10))
				.map(DefinitionDto::from));
	}
}
