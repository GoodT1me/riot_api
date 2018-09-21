import UserModule from './user'
import LanguageModule from './language'
import ProductModule from './product'
import SummonerModule from './summoner'
import PositionModule from './league-v3/position'
import LeagueModule from './league-v3/league'
import MatchlistModule from './match-v3/matchlist'
import MatchModule from './match-v3/match'
import TimelineModule from './match-v3/timeline'
import StatusModule from './lol-status-v3/status'
import ChampRotationModule from './champion-v3/champ_rotation'
import authenticate from '../utilities/security'
import SummonerBusinessService from './summoner/summoner.business';

const bodyParser = require('body-parser');

export default (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(
    '/api/*',
    (req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');

      next();
    },
  );

  // Public or mixed endpoints
  app.get('/api/health', (req, res) => res.status(200).send());
  app.get('/', (req, res) => res.status(200).send());

  // Private endpoints
  app.use('/api/users', authenticate(), UserModule);
  app.use('/api/languages', authenticate(), LanguageModule);
  app.use('/api/products', authenticate(), ProductModule);
  app.use('/api/:region/summoners', authenticate(), SummonerModule);
  app.use('/api/positions', authenticate(), PositionModule);
  app.use('/api/leagues', authenticate(), LeagueModule);
  app.use('/api/matchlists', authenticate(), MatchlistModule);
  app.use('/api/matches', authenticate(), MatchModule);
  app.use('/api/timelines', authenticate(), TimelineModule);
  app.use('/api/statuses', authenticate(), StatusModule);
  app.use('/api/champ-rotations', authenticate(), ChampRotationModule);
};
