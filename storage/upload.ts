import {Storage}  from '@google-cloud/storage'
import fetch from 'node-fetch'

const storage = new Storage()
const bucket = storage.bucket('answerphone')

export const storeUri = async (uri: string, path: string) => {
  console.log("STORE")
  const file = bucket.file(`${path}-${Date.now()}.wav`)
  const stream = file.createWriteStream()
  const download = await fetch(uri)
  const contents = await download.buffer()
  await file.save(contents)

console.log(`gs://${bucket.id}/${file.id}`)
  return `gs://${bucket.id}/${file.id}`
}
