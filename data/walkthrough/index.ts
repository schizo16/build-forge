import er from "./elden-ring.json"
import ds1 from "./dark-souls-1.json"
import ds2 from "./dark-souls-2.json"
import ds3 from "./dark-souls-3.json"
import bb from "./bloodborne.json"

export const walkthroughs: Record<string, typeof er> = {
  "elden-ring": er as typeof er,
  "dark-souls-1": ds1 as typeof er,
  "dark-souls-2": ds2 as typeof er,
  "dark-souls-3": ds3 as typeof er,
  "bloodborne": bb as typeof er,
}
