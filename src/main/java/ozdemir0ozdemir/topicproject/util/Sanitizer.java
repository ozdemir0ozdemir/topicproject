package ozdemir0ozdemir.topicproject.util;

import java.util.Locale;

public class Sanitizer {

	public static String sanitizeTitle(String rawTitle) {

		return rawTitle.toLowerCase(Locale.ENGLISH)
				.replaceAll("[ !'^+%&/()=?_#${}\\[\\]\\\\@~`,;.:<>|*]", "-")
				.replaceAll("ı", "i")
				.replaceAll("ğ", "g")
				.replaceAll("ü", "u")
				.replaceAll("ş", "s")
				.replaceAll("ö", "o")
				.replaceAll("ç", "c");
	}
}
