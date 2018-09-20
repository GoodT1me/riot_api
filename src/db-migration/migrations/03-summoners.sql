CREATE TABLE IF NOT EXISTS summoners (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profileIconId int,
    summoner_name VARCHAR(30),
    summonerLevel int,
    accountId int,
    region VARCHAR(4),
    revisionDate VARCHAR(15)
);

-- insert into summoners (profileIconId,summoner_name,summonerLevel,accountId,revisionDate) values (3556,'Index',68,200177113,1534785075000)
