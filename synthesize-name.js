'use strict';

const AWS = require('aws-sdk');

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const polly = new AWS.Polly();

const getRandomVoice = () => new Promise((res, rej) => {
  polly.describeVoices({}, function(err, { Voices }) {
    if (err) rej(err)
    else res(random(Voices).Id);
  });
});

const synthesizeSpeech = (text, voice) => new Promise((res, rej) => {
  const params = {
    OutputFormat: 'mp3',
    SampleRate: '22050',
    Text: text,
    TextType: 'text',
    VoiceId: voice,
  };

  polly.synthesizeSpeech(params, function(err, speech) {
    if (err) rej(err)
    else res(speech.AudioStream);
  });
});

module.exports = (name, voice = undefined) =>
  Promise.resolve(voice || getRandomVoice())
    .then(voice => synthesizeSpeech(name, voice));
