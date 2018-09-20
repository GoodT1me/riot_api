CREATE TABLE IF NOT EXISTS champ_rotations (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    region_tag VARCHAR(6),
    champ_rotation_body JSON
);

insert into champ_rotations (region_tag,champ_rotation_body) values ('ru1','{"key1": "value1", "key2": "value2"}')
