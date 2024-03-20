import fs from "fs"
import axios from "axios"
import { redirect } from "next/dist/server/api-utils"
// import { downloadVideo } from "@/lib/utils"

export function extractAudio(filePath : string){
    const command = `ffmpeg -i ${filePath} -f mp3 -ab 192000 -vn audio.mp3`
    const exec = require('child_process').exec;
    exec(command, (error : string, stdout : string, stderr : string) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
    });
}
export async function downloadVideo(url: string, path: string) {

    // await axios.get(url, {responseType: 'blob'}).then((res) => {  })
    // const link = document.createElement("a")
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    })
    const writer = fs.createWriteStream(path)
    response.data.pipe(writer)
    extractAudio(path)
    console.log(response)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
  }

export async function POST(req: Request) {

    const body = await req.json()
    console.log(body.videoId)

    const videoPath = `static/uploads/${body.videoId}/${body.videoId}.mp4`;
    const url = `https://meeting.foxivision.net/api/share/${body.videoId}`


    if (!fs.existsSync(`static/uploads/${body.videoId}`)) {
        fs.mkdirSync(`static/uploads/${body.videoId}`, { recursive: true });
        downloadVideo(url, videoPath).then(() => {
            console.log('Video downloaded successfully!');
            return new Response('Video downloaded successfully!')
          })
          .catch(error => {
            console.error('Error downloading video:', error);
          });
    }
    else {
        return new Response('Video File already exists in the server')
    }

    return new Response('Success!')

}