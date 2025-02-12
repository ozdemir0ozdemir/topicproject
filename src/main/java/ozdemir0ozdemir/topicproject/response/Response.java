package ozdemir0ozdemir.topicproject.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class Response<T> {

    private T payload;

    private Response(T payload) {
        this.payload = payload;
    }

    // Static factory methods
    public static <T> Response<T> of(T payload) {
        return new Response<>(payload);
    }

}
