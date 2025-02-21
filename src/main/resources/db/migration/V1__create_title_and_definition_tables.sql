create sequence topics_id_seq start 100000 increment by 1;
create sequence definitions_id_seq start 100000 increment by 1;

create table topics
(
    topic_id        bigint primary key default nextval('topics_id_seq'),
    title           varchar(70)                 not null,
    sanitized_title varchar(70)                 not null,
    created_at      timestamp without time zone not null
);

create table definitions
(
    definition_id bigint primary key default nextval('definitions_id_seq'),
    topic_id      bigint                      not null,
    definition    text                        not null,
    created_at    timestamp without time zone not null,
    constraint fk_topic_id foreign key (topic_id) references topics (topic_id)
);