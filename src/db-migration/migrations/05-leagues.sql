CREATE TABLE IF NOT EXISTS leagues (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    leagueId VARCHAR(100),
    leagues_body JSON
);

insert into leagues (leagueId,leagues_body) values ('asdf-tweyts-asdgsh','{"key1": "value1", "key2": "value2"}')
