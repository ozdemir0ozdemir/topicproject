package ozdemir0ozdemir.topicproject.domain;

import jakarta.persistence.*;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "topics")
class Topic {

	@Column(name = "topic_id", updatable = false)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title")
	private String title;

	@Column(name = "sanitized_title")
	private String sanitizedTitle;

	@Column(columnDefinition = "timestamp without time zone", name = "created_at")
	private Date createdAt;
}
