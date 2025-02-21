package ozdemir0ozdemir.topicproject.route;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class StaticController {

	@GetMapping({"/topics/{topic}/definitions"})
	String topic(@PathVariable String topic) {
		return "index";
	}
}
