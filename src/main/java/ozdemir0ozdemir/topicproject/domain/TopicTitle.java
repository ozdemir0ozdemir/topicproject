package ozdemir0ozdemir.topicproject.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.Clock;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "topics")
class TopicTitle {

	@Column(name = "topic_id", updatable = false)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long topicId;

	@Column(name = "topic_title")
	private String topicTitle;

	@Column(name = "topic_sanitized_title")
	private String topicTitleSanitized;

	@Column(columnDefinition = "timestamp without time zone",
	name = "topic_created_at")
	private Date createdAt;

}
