package ozdemir0ozdemir.topicproject.domain;

public record TopicTitleDto(Long id, String title, String sanitizedTitle) {

	static TopicTitleDto from(TopicTitle entity) {
		return new TopicTitleDto(entity.getId(), entity.getTitle(), entity.getTopicTitleSanitized());
	}
}
