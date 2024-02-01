import fs from "fs";
import archieml from "archieml";
import googleDocs from "../google.config.js";

const CWD = process.cwd();

const fetchGoogle = async ({ id, gid }) => {
  const base = "https://docs.google.com";
  const post = gid
    ? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
    : `document/d/${id}/export?format=txt`;
  const url = `${base}/${post}`;

  try {
    console.log("Fetching content from google...");
    const response = await fetch(url);
    const text = await response.text();
    if (gid) return text;

    const parsed = archieml.load(text);
    // console.log(parsed);

    const str = JSON.stringify(parsed);
    return str;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

(async () => {
  for (let d of googleDocs) {
    try {
      const str = await fetchGoogle(d);
      const file = `${CWD}/${d.filepath}`;
      fs.writeFileSync(file, str);
    } catch (err) {
      console.log(err);
    }
  }
})();

console.log("Fetching completed");
