import { customAlphabet } from "nanoid";
import Url from "./models/Url";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 7);

export default async function generateUniqueShortId() {
  let code: string;
  let exists = true;
  do {
    code = nanoid();
    exists = !!(await Url.exists({ shortId: code }));
  } while(exists);
  return code;
}