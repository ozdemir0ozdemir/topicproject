package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;

public record TopicTitleDto(Long id, String title, String sanitizedTitle, Date createdAt) {

	static TopicTitleDto from(TopicTitle entity) {
		return new TopicTitleDto(entity.getTopicId(), entity.getTopicTitle(), entity.getTopicTitleSanitized(), entity.getCreatedAt());
	}
}
