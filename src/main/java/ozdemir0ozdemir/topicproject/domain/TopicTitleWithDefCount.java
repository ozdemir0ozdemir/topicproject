package ozdemir0ozdemir.topicproject.domain;

public interface TopicTitleWithDefCount {

	Long getId();

	String getTitle();

	String getTopicTitleSanitized();

	Integer getTotalDefinition();
}
