// Imports the Google Cloud client library
import speech from "@google-cloud/speech";

// Creates a client
const client = new speech.SpeechClient();

export const transcribe = async (uri: string) => {
  const audio = {
    uri,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 8000,
    languageCode: "en-GB",
  } as const;
  const request = {
    audio: audio,
    config: config,
  };
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  return transcription;
};
