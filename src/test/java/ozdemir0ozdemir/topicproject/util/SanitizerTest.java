package ozdemir0ozdemir.topicproject.util;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class SanitizerTest {

	@ParameterizedTest
	@CsvSource({
		"10 şubat 2025 topicproject'in başlaması,10-subat-2025-topicproject-in-baslamasi",
		"12 şubat 2025 boş ve anlamsız başlık eklemem,12-subat-2025-bos-ve-anlamsiz-baslik-eklemem",
		"13 şubat 2025 canımın ne isteyecek olması,13-subat-2025-canimin-ne-isteyecek-olmasi",
		"yeni başlık,yeni-baslik",
		"yeni+başlık,yeni-baslik",
		"yeni!başlık,yeni-baslik",
		"yeni^başlık,yeni-baslik",
		"yeni'başlık,yeni-baslik",
		"yeni%başlık,yeni-baslik",
		"yeni&başlık,yeni-baslik",
		"yeni(başlık,yeni-baslik",
		"yeni*başlık,yeni-baslik",
		"yeni?başlık,yeni-baslik",
		"yeni[başlık,yeni-baslik",
		"yeni\\başlık,yeni-baslik",
		"yeni~başlık,yeni-baslik",
		"yeni<başlık,yeni-baslik",
	})
	void should_sanitizeTitle(String rawTitle, String exceptedTitle) {
		assertThat(Sanitizer.sanitizeTitle(rawTitle)).isEqualTo(exceptedTitle);
	}
}
