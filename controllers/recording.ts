import * as express from 'express';
import { twiml } from 'twilio';
import { sendEmail } from '../email/email';
import { transcribe } from '../speech/speech';
import { store } from '../storage/upload';
import { getWav } from '../twilio/recording';

export const PATHS = {
  recordingStatusCallback: "rsc",
  hangup: "hangup"
} as const;

export const twilioStartRecording = (req: express.Request, res: express.Response) => {
	let vr = new twiml.VoiceResponse();
  vr.say('leave a message');
    
  vr.record({
    maxLength: 120,
    recordingStatusCallback: PATHS.recordingStatusCallback,
    action: PATHS.hangup
  })

  res.send(vr.toString())
}

export const hangup = (req: express.Request, res: express.Response) => {
	let vr = new twiml.VoiceResponse();
  vr.say('thanks, goodbye.');
    
  vr.hangup()
  res.send(vr.toString())
}

export const recordingStatusCallback = async (req: express.Request, res: express.Response) => {
 
  const {
    AccountSid,
    CallSid,
    RecordingSid,
    RecordingUrl,
    RecordingStatus,
    RecordingDuration,  
  } = req.body as Record<string, string>
  
console.log('downloading call')
  const buffer = await getWav(RecordingUrl)
  const stored = await store(buffer, RecordingSid)
  console.log("stored as", stored)
  const t = await transcribe(stored)
  console.log("transcript", t)
  const email = await sendEmail(t, buffer)
  console.log("sent", email)
  // console.log(JSON.stringify(req.body)s)

  res.send("OKAY COOL")
}