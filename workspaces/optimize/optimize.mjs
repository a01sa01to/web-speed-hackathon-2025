import path from "node:path"
import sharp from "sharp"

const __dirname = import.meta.dirname
const publicImg = path.resolve(__dirname, "..", "..", "public", "images")
console.log(publicImg)


for (let i = 1; i <= 37; ++i) {
  const file = path.resolve(publicImg, `${String(i).padStart(3, "0")}.jpeg`)
  await sharp(file).resize({ width: 200 }).avif().toFile(file.replace(".jpeg", "-sm.avif"))
  await sharp(file).resize({ width: 500 }).avif().toFile(file.replace(".jpeg", "-md.avif"))
  await sharp(file).resize({ width: 1024 }).avif().toFile(file.replace(".jpeg", "-lg.avif"))
}