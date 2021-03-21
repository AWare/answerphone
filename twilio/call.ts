import twilio from "twilio";
import { CallInstance } from "twilio/lib/rest/api/v2010/account/call";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

export const getCall = (sid: string):Promise<CallInstance> => client.calls(sid).fetch()