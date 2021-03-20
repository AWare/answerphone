require('dotenv').config()

import express from 'express';
import { sendEmail } from './email/email';
import { transcribe } from './speech/speech';
import { store } from './storage/upload';
import { getWav } from './twilio/recording';
import bodyParser from 'body-parser';
import { hangup, PATHS, recordingStatusCallback, twilioStartRecording } from './controllers/recording';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT; 

app.get("/favicon.ico", (req, res) => {
  res.statusCode = 404
  res.send()
})
// app.get("/:id", async (req, res) => {
//   const r = req.params.id
//   console.log("handling", r)
//   const buffer = await getWav(r)
//   console.log("getting", r)
//   const stored = await store(buffer, r)
//   console.log("stored as", stored)
//   const t = await transcribe(stored)
//   console.log("transcript", t)
//   const email = await sendEmail(t, buffer)
//   res.send(t)
// } );

app.get('/call', twilioStartRecording)
app.get(`/${PATHS.recordingStatusCallback}`, recordingStatusCallback)
app.get(`/${PATHS.hangup}`, hangup)
app.listen( port, () => {
    console.log( `server started ${ port }` );
} );