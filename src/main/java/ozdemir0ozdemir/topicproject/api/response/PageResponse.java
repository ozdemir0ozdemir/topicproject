package ozdemir0ozdemir.topicproject.api.response;

import java.util.List;
import lombok.Getter;
import org.springframework.data.domain.Page;

/**
 * presents one base pagination (1...n)
 * */
@Getter
public final class PageResponse<T> {

	private final List<T> content;
	private final int currentPage;
	private final int totalPages;

	/**
	 * @param currentPage zero based pagination <br/> will be converted one based
	 * */
	private PageResponse(List<T> content, int currentPage, int totalPages) {
		this.content = content;
		this.currentPage = currentPage + 1;
		this.totalPages = totalPages;
	}

	public static <T> PageResponse<T> of(Page<T> page) {
		return new PageResponse<>(page.getContent(), page.getNumber(), page.getTotalPages());
	}
}
