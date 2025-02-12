package ozdemir0ozdemir.topicproject.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdemir0ozdemir.topicproject.domain.TopicDefinition;
import ozdemir0ozdemir.topicproject.domain.TopicTitle;
import ozdemir0ozdemir.topicproject.domain.TopicManager;

import java.util.List;

@RestController
@RequestMapping("api/v1/topics")
@CrossOrigin // TODO: DEV ONLY -- DELETED SOON
record TopicController(TopicManager topics) {

	@GetMapping
	ResponseEntity<List<TopicTitle>> getAllTopicTitles() {
		return ResponseEntity.ok(this.topics.getAllTitles());
	}

	@GetMapping("{topicTitleId}/definitions")
	ResponseEntity<List<TopicDefinition>> getAllTopicDefinitionsByTopicTitleUId(@PathVariable Long topicTitleId) {
		return ResponseEntity.ok(this.topics.getDefinitionsByTitleId(topicTitleId));
	}

	@PostMapping
	ResponseEntity<TopicTitle> saveNewTopicTitle(@RequestBody TopicTitle title) {
		return ResponseEntity.ok(this.topics.saveTitle(title));
	}

	@PostMapping("{topicTitleId}/definitions")
	ResponseEntity<TopicDefinition> saveNewTopicDefinition(
			@PathVariable Long topicTitleId, @RequestBody TopicDefinition def) {
		def.setTopicTitle(this.topics.getTitleByTitleId(topicTitleId));
		return ResponseEntity.ok(this.topics.saveDefinition(def));
	}
}
