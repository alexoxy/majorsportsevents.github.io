// Placeholder for generate-ics Netlify Function
exports.handler = async function(event) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'inline; filename="placeholder.ics"'
    },
    body: 'BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR'
  };
};