package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;

public record DefinitionDto(Long id, String definition, Long topicTitleId, Date createdAt) {

	static DefinitionDto from(Definition entity) {
		return new DefinitionDto(
				entity.getId(), entity.getDefinition(), entity.getTopic().getId(), entity.getCreatedAt());
	}
}
