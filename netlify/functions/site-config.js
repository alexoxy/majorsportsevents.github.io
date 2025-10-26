const config = require('../../data/sports-config');

exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600'
  },
  body: JSON.stringify({
    updatedAt: config.updatedAt,
    description: config.description,
    sports: config.sports,
    travelPartners: config.travelPartners,
    bettingPartners: config.bettingPartners
  })
});
