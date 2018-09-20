CREATE TABLE IF NOT EXISTS products (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pr_name VARCHAR(50),
    pr_description VARCHAR(200),
    quantity int,
    code VARCHAR(8)
);

insert into products (pr_name,pr_description,quantity) values ('potato','potato description',8);
insert into products (pr_name,pr_description,quantity) values ('tomato','tomato description',18)
