package ozdemir0ozdemir.topicproject.domain;

public record TopicDefinitionDto(Long id, String definition, Long topicTitleId) {

    static TopicDefinitionDto from(TopicDefinition entity) {
        return new TopicDefinitionDto(entity.getId(), entity.getDefinition(), entity.getTopicTitle().getId());
    }
}
