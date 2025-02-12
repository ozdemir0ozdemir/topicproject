package ozdemir0ozdemir.topicproject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ozdemir0ozdemir.topicproject.domain.TopicManager;
import ozdemir0ozdemir.topicproject.domain.TopicTitleDto;

@Configuration
public class ExampleDataCreator {

	@Bean
	CommandLineRunner runner(TopicManager topics) {
		return args -> {
			TopicTitleDto title = topics.saveTitle("10 şubat 2025 topicproject\'in başlaması");
			TopicTitleDto title2 = topics.saveTitle("12 şubat 2025 boş ve anlamsız başlık eklemem");
			TopicTitleDto title3 = topics.saveTitle("13 şubat 2025 canımın ne isteyecek olması");
			topics.saveDefinition(
					title.id(), "Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");
			topics.saveDefinition(title.id(), "işte bir başlık için ikinci yazıyı da yazdım");
			topics.saveDefinition(title2.id(), "boş ve anlamsız başlıklar için boş ve anlamsız yazılar");
			topics.saveDefinition(
					title3.id(),
					"henüz bilinemeyen fakat bu kodu geliştirmenin içinde bulunacağı varsayılan doğa olayı");
			topics.saveDefinition(title3.id(), "belki biraz yüzüklerin efendisi kitabı da okunabilir.");
			topics.saveDefinition(
					title3.id(),
					"basliklardaki-BüYüK-vE-KüÇüK-hArFlErİ-tamaman-küçük-şekilde-çevir-ve-turkce-karakterleri-kaydetme-sakin");
		};
	}
}
