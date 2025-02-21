package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;

public record TopicDto(Long id, String title, String sanitizedTitle, Date createdAt) {

	static TopicDto from(Topic entity) {
		return new TopicDto(entity.getId(), entity.getTitle(), entity.getSanitizedTitle(), entity.getCreatedAt());
	}
}
