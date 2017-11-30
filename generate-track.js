'use strict';

const fs = require('fs');
const tempfile = require('tempfile');
const childProcess = require('child_process');

const { SOX_EXEC, INTRO_FILE, OUTRO_FILE } = process.env;

module.exports = (nameAudio) => {
  const nameTempFile = tempfile('.mp3');
  fs.writeFileSync(nameTempFile, nameAudio);

  const trackTempFile = tempfile('.mp3');
  childProcess.execFileSync(SOX_EXEC, [ INTRO_FILE, nameTempFile, OUTRO_FILE, trackTempFile ]);

  return fs.readFileSync(trackTempFile);
};
