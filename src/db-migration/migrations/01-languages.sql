CREATE TABLE IF NOT EXISTS languages (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(6),
    title VARCHAR(100),
    is_default boolean,
    active boolean
);

insert into languages (code,title,is_default,active) values ('en','English',true,true);
insert into languages (code,title,active) values ('de','German',true);
insert into languages (code,title,active) values ('ro-RO','Romanian (Romania)',true)
