import { globSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const __dirname = import.meta.dirname
const publicImg = path.resolve(__dirname, "..", "..", "public", "logos")
console.log(publicImg)

const files = globSync(`${publicImg}/*.png`)
console.log(files)

files.forEach(async (file) => {
  await sharp(file).avif().toFile(file.replace(".png", ".avif"))
})