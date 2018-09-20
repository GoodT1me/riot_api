CREATE TABLE IF NOT EXISTS timelines (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gameId int,
    timeline_body JSON
);

insert into timelines (gameId,timeline_body) values (11,'{"key1": "value1", "key2": "value2"}')
