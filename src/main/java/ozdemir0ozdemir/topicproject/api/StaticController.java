package ozdemir0ozdemir.topicproject.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class StaticController {

    private static final Logger log = LoggerFactory.getLogger(StaticController.class);

    @GetMapping({"/topics/{topic}/definitions"})
    String topic(@PathVariable String topic) {
        return "index";
    }

}
