import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import isBetween from "dayjs/plugin/isBetween"
import tz from "dayjs/plugin/timezone"

dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(tz)
dayjs.tz.setDefault("Asia/Tokyo")

export default dayjs