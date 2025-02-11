package ozdemir0ozdemir.topicproject.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
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
@Table(name = "topic_definitions")
public class TopicDefinition {

	@Column(name = "topic_definition_id", updatable = false)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "topic_title_id", referencedColumnName = "topic_title_id", nullable = false)
	private TopicTitle topicTitle;

	@Column(name = "topic_definition", nullable = false)
	private String definition;

	@JsonProperty("topic_title_id")
	public Long getTopicTitleId() {
		return this.topicTitle.getId();
	}
}
