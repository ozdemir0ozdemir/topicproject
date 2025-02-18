package ozdemir0ozdemir.topicproject.api;

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
	ResponseEntity<Page<TopicTitleWithDefCount>> getAllTopicTitles(
			@RequestParam(name = "page", defaultValue = "1") int page) {

		return ResponseEntity.ok(this.topics.getAllTitlesWithDefCount(Math.max(0, page - 1)));
	}

	@GetMapping("{topicId}")
	ResponseEntity<TopicTitleDto> getTopicById(@PathVariable Long topicId) {
		return ResponseEntity.ok(this.topics.getTitleByTitleId(topicId));
	}

	@GetMapping("{topicTitleId}/definitions")
	ResponseEntity<Page<TopicDefinitionDto>> getAllDefinitionsByTopicId(
			@PathVariable Long topicTitleId, @RequestParam(name = "page", defaultValue = "1") int page) {

		return ResponseEntity.ok(this.topics.getDefinitionsByTitleId(topicTitleId, Math.max(0, page - 1)));
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
