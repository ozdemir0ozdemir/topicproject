package ozdemir0ozdemir.topicproject.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ozdemir0ozdemir.topicproject.model.TopicDefinition;
import ozdemir0ozdemir.topicproject.model.TopicTitle;
import ozdemir0ozdemir.topicproject.service.TopicManager;

@RestController
@RequestMapping("api/v1/topics")
record TopicController(TopicManager topics) {

	@Operation(summary = "Get all topic titles")
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Topic titles found")})
	@GetMapping
	ResponseEntity<List<TopicTitle>> getAllTopicTitles() {
		return ResponseEntity.ok(this.topics.getAllTitles());
	}

	@Operation(summary = "Get all topic definitions by topic title id")
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Topic definitions found")})
	@GetMapping("/definitions/{topicTitleId}")
	ResponseEntity<List<TopicDefinition>> getAllTopicDefinitionsByTopicTitleUId(@PathVariable Long topicTitleId) {
		return ResponseEntity.ok(this.topics.getDefinitionsByTitleId(topicTitleId));
	}
}
