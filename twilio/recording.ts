import fetch from 'node-fetch'

export const getWavUrl = (sid: string) => `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${sid}`

export const getWav = async (url: string) => {
  const download = await fetch(url)
  if (download.status != 200) {
    throw new Error("not found.")
  }
  return download.buffer()
}