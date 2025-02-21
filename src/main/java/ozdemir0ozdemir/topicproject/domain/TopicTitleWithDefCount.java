package ozdemir0ozdemir.topicproject.domain;

import java.util.Date;

public interface TopicTitleWithDefCount {

	Long getId();

	String getTitle();

	String getTopicTitleSanitized();

	Integer getTotalDefinition();

	Date getCreationDate();
}
