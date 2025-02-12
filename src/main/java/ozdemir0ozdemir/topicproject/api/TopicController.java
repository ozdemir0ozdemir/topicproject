package ozdemir0ozdemir.topicproject.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdemir0ozdemir.topicproject.domain.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/topics")
@CrossOrigin // TODO: DEV ONLY -- DELETED SOON
record TopicController(TopicManager topics) {

	@GetMapping
	ResponseEntity<List<TopicTitleDto>> getAllTopicTitles() {
		return ResponseEntity.ok(this.topics.getAllTitles());
	}

	@GetMapping("{topicTitleId}/definitions")
	ResponseEntity<List<TopicDefinitionDto>> getAllTopicDefinitionsByTopicTitleUId(@PathVariable Long topicTitleId) {
		return ResponseEntity.ok(this.topics.getDefinitionsByTitleId(topicTitleId));
	}

	@PostMapping
	ResponseEntity<TopicTitleDto> saveNewTopicTitle(@RequestBody NewTopicTitleRequest req) {
		return ResponseEntity.ok(this.topics.saveTitle(req.title()));
	}

	@PostMapping("{topicTitleId}/definitions")
	ResponseEntity<TopicDefinitionDto> saveNewTopicDefinition(
			@PathVariable Long topicTitleId, @RequestBody NewTopicDefinitionRequest req) {
		return ResponseEntity.ok(this.topics.saveDefinition(topicTitleId, req.definition()));
	}
}
