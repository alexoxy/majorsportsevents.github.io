module.exports = {
  updatedAt: '2024-07-01T00:00:00Z',
  description: 'Curated list of the five most-followed team sports based on global audience and fandom.',
  sports: [
    {
      id: 'soccer',
      name: 'Association Football',
      shortName: 'Football',
      ranking: 1,
      estimatedFans: '3.5B+',
      continents: ['global'],
      keywords: ['FIFA', 'UEFA', 'CONMEBOL', 'club', 'national teams'],
      competitions: [
        {
          id: 'fifa-world-cup',
          name: 'FIFA World Cup Qualifiers',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'fifa-womens-world-cup',
          name: 'FIFA Women\'s World Cup Qualifiers',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world.women/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'uefa-champions-league',
          name: 'UEFA Champions League',
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'Europe',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'uefa-women-champions-league',
          name: 'UEFA Women\'s Champions League',
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'Europe',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions.women/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'copa-libertadores',
          name: 'CONMEBOL Libertadores',
          level: 'continental',
          region: 'south-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'South America',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/conmebol.libertadores/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'nwsl-championship',
          name: 'NWSL Championship',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'USA',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'cricket',
      name: 'Cricket',
      shortName: 'Cricket',
      ranking: 2,
      estimatedFans: '2.5B+',
      continents: ['asia', 'oceania', 'europe', 'africa'],
      keywords: ['ICC', 'T20', 'Test', 'ODI'],
      competitions: [
        {
          id: 'icc-cricket-world-cup',
          name: 'ICC Cricket World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/icc.cricket.worldcup/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'icc-womens-world-cup',
          name: 'ICC Women\'s Cricket World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/icc.womens.worldcup/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'ipl',
          name: 'Indian Premier League',
          level: 'continental',
          region: 'asia',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'India',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/ipl/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'wpl',
          name: 'Women\'s Premier League',
          level: 'continental',
          region: 'asia',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'India',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/india.wpl/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'field-hockey',
      name: 'Field Hockey',
      shortName: 'Hockey',
      ranking: 3,
      estimatedFans: '2B+',
      continents: ['asia', 'europe', 'oceania'],
      keywords: ['FIH', 'Pro League', 'World Cup'],
      competitions: [
        {
          id: 'fih-pro-league-men',
          name: 'FIH Pro League (Men)',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://fih-prod-cdn.azureedge.net/api/v1/calendar?competitionId=60',
          parser: 'fih-calendar'
        },
        {
          id: 'fih-pro-league-women',
          name: 'FIH Pro League (Women)',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://fih-prod-cdn.azureedge.net/api/v1/calendar?competitionId=61',
          parser: 'fih-calendar'
        },
        {
          id: 'ehl',
          name: 'Euro Hockey League',
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'Europe',
          dataSource: null,
          parser: null
        }
      ]
    },
    {
      id: 'basketball',
      name: 'Basketball',
      shortName: 'Basketball',
      ranking: 4,
      estimatedFans: '2.3B+',
      continents: ['global'],
      keywords: ['FIBA', 'NBA', 'EuroLeague'],
      competitions: [
        {
          id: 'nba',
          name: 'NBA',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'USA/Canada',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'wnba',
          name: 'WNBA',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'USA',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'fiba-world-cup',
          name: 'FIBA Basketball World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/fiba.world/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'fiba-womens-world-cup',
          name: 'FIBA Women\'s Basketball World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/fiba.world.women/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'baseball',
      name: 'Baseball',
      shortName: 'Baseball',
      ranking: 5,
      estimatedFans: '500M+',
      continents: ['north-america', 'asia'],
      keywords: ['MLB', 'NPB', 'World Baseball Classic'],
      competitions: [
        {
          id: 'mlb',
          name: 'Major League Baseball',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'USA/Canada',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'npb',
          name: 'Nippon Professional Baseball',
          level: 'continental',
          region: 'asia',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'Japan',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/baseball/npb/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'wbc',
          name: 'World Baseball Classic',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/baseball/wbc/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    }
  ],
  travelPartners: [
    {
      id: 'booking',
      name: 'Booking.com',
      type: 'hotel',
      baseUrl: 'https://www.booking.com/searchresults.html'
    },
    {
      id: 'skyscanner',
      name: 'Skyscanner',
      type: 'flight',
      baseUrl: 'https://www.skyscanner.net/transport/flights'
    }
  ],
  bettingPartners: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      baseUrl: 'https://www.pinnacle.com',
      apiDocs: 'https://www.pinnacle.com/en/api'
    },
    {
      id: 'the-odds-api',
      name: 'The Odds API',
      baseUrl: 'https://the-odds-api.com',
      apiDocs: 'https://the-odds-api.com/liveapi/guides/v4/'
    }
  ]
};
