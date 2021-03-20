import * as express from 'express';
import { twiml } from 'twilio';

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

export const recordingStatusCallback = (req: express.Request, res: express.Response) => {
  console.log(JSON.stringify(req.body))
  res.send("OKAY COOL")
}