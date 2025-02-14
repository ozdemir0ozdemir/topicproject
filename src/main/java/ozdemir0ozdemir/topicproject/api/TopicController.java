package ozdemir0ozdemir.topicproject.api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdemir0ozdemir.topicproject.domain.*;

@RestController
@RequestMapping("api/v1/topics")
@CrossOrigin // TODO: DEV ONLY -- DELETED SOON
record TopicController(TopicManager topics) {

	@GetMapping("/random")
	ResponseEntity<TopicTitleDto> getTopicByRandom() {
		return ResponseEntity.ok(this.topics.getTitleByRandom());
	}

	@GetMapping
	ResponseEntity<Page<TopicTitleDto>> getAllTopicTitles(@RequestParam(name = "page", defaultValue = "1") int page) {

		return ResponseEntity.ok(this.topics.getAllTitles(Math.max(0, page - 1)));
	}

	@GetMapping("{topicTitleId}")
	ResponseEntity<TopicTitleDto> getTopicTitleById(@PathVariable String topicTitleId) {
		return ResponseEntity.ok(this.topics.getTitleBySanitizedTitle(topicTitleId));
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
