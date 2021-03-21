import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucket = storage.bucket("answerphone");

export const store = async (buffer: Buffer, path: string) => {
  console.log("Storing file.");
  const file = bucket.file(`${path}-${Date.now()}.wav`);

  await file.save(buffer);

  console.log(`gs://${bucket.id}/${file.id}`);
  return `gs://${bucket.id}/${file.id}`;
};
