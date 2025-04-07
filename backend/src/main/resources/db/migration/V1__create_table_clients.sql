CREATE TABLE tb_clients (
    client_id VARCHAR(36) not null primary key,
    name VARCHAR(150) not null,
    email VARCHAR(150) not null,
    phone CHAR(11) not null,
    CONSTRAINT UK_EMAIL  UNIQUE (email),
    CONSTRAINT UK_PHONE  UNIQUE (phone)
);