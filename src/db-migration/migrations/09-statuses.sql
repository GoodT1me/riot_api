CREATE TABLE IF NOT EXISTS statuses (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    server_name VARCHAR(50),
    region_tag VARCHAR(6),
    hostname VARCHAR(30),
    status_body JSON
);

insert into statuses (server_name,region_tag,hostname,status_body) values ('Russia','ru1','prod.ru.lol.riotgames.com','{"key1": "value1", "key2": "value2"}')
