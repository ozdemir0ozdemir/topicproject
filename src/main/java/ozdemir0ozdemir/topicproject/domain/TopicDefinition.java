package ozdemir0ozdemir.topicproject.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "definitions")
class TopicDefinition {

	@Column(name = "definition_id", updatable = false)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "topic_id", referencedColumnName = "topic_id", nullable = false)
	private TopicTitle topicTitle;

	@Column(name = "definition", nullable = false, columnDefinition = "text")
	private String definition;

	@Column(columnDefinition = "timestamp without time zone",
	name = "definition_created_at")
	private Date createdAt;
}
