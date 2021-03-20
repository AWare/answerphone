import {Storage}  from '@google-cloud/storage'
import fetch from 'node-fetch'

const storage = new Storage()
const bucket = storage.bucket('answerphone')

export const storeUri = async (uri: string, path: string) => {
  console.log("Storing file.")
  const file = bucket.file(`${path}-${Date.now()}.wav`)
  const download = await fetch(uri)
  if (download.status != 200) {
    throw new Error("not found.")
  }
  const contents = await download.buffer()
  await file.save(contents)

console.log(`gs://${bucket.id}/${file.id}`)
  return `gs://${bucket.id}/${file.id}`
}
