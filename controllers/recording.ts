import * as express from 'express';
import { twiml } from 'twilio';
import { sendEmail } from '../email/email';
import { transcribe } from '../speech/speech';
import { store } from '../storage/upload';
import { getCall } from '../twilio/call';
import { getWav } from '../twilio/recording';

export const PATHS = {
  recordingStatusCallback: "rsc",
  hangup: "hangup"
} as const;

export const twilioStartRecording = (req: express.Request, res: express.Response) => {
	let vr = new twiml.VoiceResponse();
  vr.say("Hi, you've reached Alex's robot voicemail. Please leave a message.");
    
  vr.record({
    maxLength: 120,
    recordingStatusCallback: PATHS.recordingStatusCallback,
    action: PATHS.hangup
  })

  res.send(vr.toString())
}

export const hangup = (req: express.Request, res: express.Response) => {
	let vr = new twiml.VoiceResponse();
  vr.say("Thanks, I'm going to email that to him now. Goodbye human.");
    
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
  
  if (process.env.TWILIO_SID !== AccountSid) {
    console.log("Help, I've been hacked.")
  }

  console.log('downloading call')
  
  const buffer = getWav(RecordingUrl)
  const fcall = getCall(CallSid);
  const stored = store(await buffer, RecordingSid)
  console.log("stored as", stored)
  const t =  transcribe(await stored)
  const call = await fcall;
  console.log(call.from, call.fromFormatted, call.forwardedFrom)
  const email = await sendEmail({ transcription: await t, recording: await buffer, from: call.fromFormatted })
  console.log("sent", email)

  res.send("OKAY COOL")
}