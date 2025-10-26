const { getEventsWithCache } = require('./shared/events');

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const { events, cached, updatedAt } = await getEventsWithCache(params);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      },
      body: JSON.stringify({
        cached,
        updatedAt: new Date(updatedAt).toISOString(),
        total: events.length,
        events
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to fetch events',
        message: error.message
      })
    };
  }
};
