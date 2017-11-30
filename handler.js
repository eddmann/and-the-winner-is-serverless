'use strict';

const synthesizeName = require('./synthesize-name');
const generateTrack = require('./generate-track');

module.exports.winner = (event, context, callback) => {
  const input = event.queryStringParameters || {};

  synthesizeName(input.name || 'All of us', input.voice)
    .then(generateTrack)
    .then(track => {
      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'audio/mpeg' },
        body: track.toString('base64'),
        isBase64Encoded: true,
      });
    });
};
