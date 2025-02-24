package ozdemir0ozdemir.topicproject.api;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdemir0ozdemir.topicproject.api.request.CreateTopic;
import ozdemir0ozdemir.topicproject.api.response.PageResponse;
import ozdemir0ozdemir.topicproject.domain.TopicDto;
import ozdemir0ozdemir.topicproject.domain.TopicProjection;
import ozdemir0ozdemir.topicproject.domain.TopicService;

@RestController
@RequestMapping("api/v1/topics")
@CrossOrigin // TODO: DEV ONLY -- DELETED SOON
@RequiredArgsConstructor
class TopicController {

	private final TopicService service;

	@GetMapping("/random")
	ResponseEntity<TopicDto> getRandomTopic() {
		return ResponseEntity.ok(this.service.getRandomTopic());
	}

	// TODO: Proper Validation
	@GetMapping
	ResponseEntity<PageResponse<TopicProjection>> getAllTopics(
			@RequestParam(defaultValue = "1") int page, @RequestParam String date) {

		List<Integer> dateArray =
				Arrays.stream(date.split("-")).map(Integer::parseInt).toList();
		LocalDate localDate = LocalDate.of(dateArray.get(0), dateArray.get(1), dateArray.get(2));
		return ResponseEntity.ok(this.service.getAllTopics(
				Math.max(0, page - 1), localDate.getYear(), localDate.getMonthValue(), localDate.getDayOfMonth()));
	}

	@GetMapping("/search/{title}")
	ResponseEntity<PageResponse<TopicProjection>> getTopicById(@PathVariable String title) {
		return ResponseEntity.ok(this.service.searchAllBySanitizedTitle(title));
	}


	@GetMapping("/{id}")
	ResponseEntity<TopicDto> getTopicById(@PathVariable Long id) {
		return ResponseEntity.ok(this.service.getTopicById(id));
	}

	@PostMapping
	ResponseEntity<TopicDto> saveNewTopicTitle(@RequestBody CreateTopic request) {
		return ResponseEntity.ok(this.service.saveTopic(request.title()));
	}
}
