CREATE TABLE IF NOT EXISTS matches (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    seasonId int,
    queueId int,
    gameId VARCHAR(20),
    match_body JSON
);

insert into matches (seasonId,queueId,gameId,match_body) values (22,54,'33847593231','{"key1": "value1", "key2": "value2"}')
