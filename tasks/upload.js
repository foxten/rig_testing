import fs from "fs";
import path from "path";
import pc from "picocolors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import deploymentConfigs from "../config.js";

const { org } = deploymentConfigs;
const client = new S3Client({region: "us-east-1"});
const maxSize = Math.pow(1024, 2) * 5; //5 MB -- if you need to change this, feel free

const bucket = org === "wbez" ? "wbez-cdn" : "cdn.suntimes.com"

let directory = "src/images";

let images = fs.readdir(`${directory}/upload`, async (err, imgFiles) => {
    for (const image of imgFiles.filter(i => i !== '.gitkeep')) {
        let ext = path.extname(image).slice(1);
        let type = ext === "jpg" ? "jpeg" : ext;
        let blob = fs.readFileSync(`${directory}/upload/${image}`)
        let sizeCheck = fs.statSync(`${directory}/upload/${image}`).size > maxSize;
        const command = new PutObjectCommand({
        Bucket: bucket,
        Key: `interactives/${image}`,
        Body: blob,
        ContentType: `image/${type}`,
      });

      try {
        if (!sizeCheck){ 
          const response = await client.send(command);
          // move file once successfully uploaded to s3 
          fs.rename(`${directory}/upload/${image}`,`${directory}/archive/${image}`, (err) => {
            if(err) throw err;
            console.log(pc.green(`${image} archived`))
            })
        } else {
          console.error(pc.red(`The ${image} file is too large. Please try uploading a smaller asset, or updating the max file size.`));
        }
      } catch (err) {
        console.error(err);
      }
    }
});
