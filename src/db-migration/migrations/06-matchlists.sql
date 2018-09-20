CREATE TABLE IF NOT EXISTS matchlists (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    accountId VARCHAR(14),
    matchlist_body JSON
);

insert into matchlists (accountId,matchlist_body) values ('6476387599','{"key1": "value1", "key2": "value2"}')
