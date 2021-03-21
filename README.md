# answerphone

Answerphone is an answerphone, it transcribes and emails your answerphone messages to your email.

## requirements

This needs a twilio account and access to Google's Speech Recognition API, it was built to use Google Cloud Run- which provides access to the Speech API.

If you want to use this, here's my twilio referal link: www.twilio.com/referral/PqTySq

## installation

1. Set up twilio number.
2. Set up google cloud account.
3. Fork this repo, and deploy to cloud run.
4. Set up all the env variables in '.env.sample'
5. Set call webhook to your url + '/call'
6. Call your twilio number and test it.
7. Use [call forwarding codes](https://en.wikipedia.org/wiki/Call_forwarding) to set this to your answerphone.
8. Pay twilio and make the trial account message go away.
