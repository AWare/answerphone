require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import { hangup, PATHS, recordingStatusCallback, twilioStartRecording } from './controllers/recording';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT; 

app.get("/favicon.ico", (req, res) => {
  res.statusCode = 404
  res.send()
})

app.get('/call', twilioStartRecording)
app.post(`/${PATHS.recordingStatusCallback}`, recordingStatusCallback)
app.post(`/${PATHS.hangup}`, hangup)
app.listen( port, () => {
    console.log( `server started ${ port }` );
} );