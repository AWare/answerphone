import express from 'express';
import { transcribe } from './speech/speech';
import { storeUri } from './storage/upload';
import { getWavUrl } from './twilio/recording';
require('dotenv').config()

const app = express();
const port = process.env.PORT; 
console.log(process.env)
app.get("/:id", async (req, res) => {
  console.log("EHHLLO")
  const r = req.params.id
  const uri = getWavUrl(r)
  const stored = await storeUri(uri, r)
  const t = await transcribe(stored)
  res.send(t)
} );

app.listen( port, () => {
    console.log( `server started ${ port }` );
} );