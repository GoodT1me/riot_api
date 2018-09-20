CREATE TABLE IF NOT EXISTS positions (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    queueType VARCHAR(40),
    hotStreak boolean,
    wins int,
    veteran boolean,
    losses int,
    playerOrTeamId VARCHAR(10),
    leagueName VARCHAR(100),
    playerOrTeamName VARCHAR(30),
    inactive boolean,
    flex_rank VARCHAR(4),
    freshBlood boolean,
    leagueId VARCHAR(100),
    tier VARCHAR(20),
    leaguePoints int
);

insert into positions (queueType,hotStreak,wins,veteran,losses,playerOrTeamId,leagueName,playerOrTeamName,inactive,flex_rank,freshBlood,leagueId,tier,leaguePoints)
values ('RANKED_SOLO_5x5',false,12,true,12,'746382','league name trat','Index',false,'II',false,'847uweqwr-2342wt-wetwe','SILVER',42)
