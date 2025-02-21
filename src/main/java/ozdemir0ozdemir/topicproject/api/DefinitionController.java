package ozdemir0ozdemir.topicproject.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdemir0ozdemir.topicproject.api.request.CreateDefinition;
import ozdemir0ozdemir.topicproject.api.response.PageResponse;
import ozdemir0ozdemir.topicproject.domain.DefinitionDto;
import ozdemir0ozdemir.topicproject.domain.DefinitionService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/topics/{topicId}/definitions")
@CrossOrigin // TODO: DEV ONLY -- DELETED SOON
@RequiredArgsConstructor
class DefinitionController {

    private final DefinitionService service;

    @GetMapping
    ResponseEntity<PageResponse<DefinitionDto>> getAllDefinitionsByTopicId(
            @PathVariable Long topicId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "date") String dateString) {

        List<Integer> dateArray = Arrays
                .stream(dateString.split("-"))
                .map(Integer::parseInt).toList();
        LocalDate localDate = LocalDate.of(dateArray.get(0), dateArray.get(1), dateArray.get(2));

        return ResponseEntity.ok(this.service
                .getDefinitionsByTitleId(
                        topicId,
                        Math.max(0, page - 1),
                        localDate.getYear(),
                        localDate.getMonthValue(),
                        localDate.getDayOfMonth()));
    }

    @PostMapping
    ResponseEntity<DefinitionDto> saveNewTopicDefinition(
            @PathVariable Long topicId, @RequestBody CreateDefinition request) {
        return ResponseEntity.ok(this.service.saveDefinition(topicId, request.definition()));
    }
}
