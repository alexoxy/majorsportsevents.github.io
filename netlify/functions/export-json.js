const { getEventsWithCache, buildJson } = require('./shared/events');

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const { events, updatedAt } = await getEventsWithCache(params);
    const payload = buildJson(events);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="majorsports-events.json"',
        'X-Data-Updated-At': new Date(updatedAt).toISOString()
      },
      body: payload
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to export JSON', message: error.message })
    };
  }
};
