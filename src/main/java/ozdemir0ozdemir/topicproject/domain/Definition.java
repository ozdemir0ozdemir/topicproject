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
@Table(name = "definitions")
class Definition {

	@Column(name = "definition_id", updatable = false)
	@Id
	@SequenceGenerator(name = "definitions_id_gen", sequenceName = "definitions_id_seq", initialValue = 100000, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "definitions_id_gen")
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "topic_id", referencedColumnName = "topic_id", nullable = false)
	private Topic topic;

	@Column(name = "definition", nullable = false, columnDefinition = "text")
	private String definition;

	@Column(columnDefinition = "timestamp without time zone", name = "created_at")
	private Date createdAt;
}
