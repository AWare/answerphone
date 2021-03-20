import express from 'express';
import { transcribe } from './speech/speech';
import { storeUri } from './storage/upload';
import { getWavUrl } from './twilio/recording';
require('dotenv').config()

const app = express();
const port = process.env.PORT; 
console.log(process.env)
app.get("/favicon.ico", (req, res) => {
  res.statusCode = 404
  res.send()
})
app.get("/:id", async (req, res) => {
  const r = req.params.id
  console.log("handling", r)
  const uri = getWavUrl(r)
  console.log("getting", uri)
  const stored = await storeUri(uri, r)
  console.log("stored as", stored)
  const t = await transcribe(stored)
  console.log("transcript", t)
  res.send(t)
} );

app.listen( port, () => {
    console.log( `server started ${ port }` );
} );