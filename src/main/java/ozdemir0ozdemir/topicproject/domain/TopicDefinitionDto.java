package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;

public record TopicDefinitionDto(Long id, String definition, Long topicTitleId, Date createdAt) {

	static TopicDefinitionDto from(TopicDefinition entity) {
		return new TopicDefinitionDto(
				entity.getId(), entity.getDefinition(), entity.getTopicTitle().getId(), entity.getCreatedAt());
	}
}
