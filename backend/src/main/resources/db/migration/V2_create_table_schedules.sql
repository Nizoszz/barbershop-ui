CREATE TABLE tb_schedules (
    schedule_id VARCHAR(36) not null primary key,
    start_at timestamp not null,
    end_at timestamp not null,
    client_id VARCHAR(36) not null,
    CONSTRAINT UK_SCHEDULE_INTERVAL  UNIQUE (start_at, end_at),
    CONSTRAINT FK_CLIENTS_SCHEDULES FOREIGN KEY(client_id) REFERENCES tb_clients(client_id)
);