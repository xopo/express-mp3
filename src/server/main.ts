import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import { getFolders, getFiles } from './helpers/db';

const port = 3034;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

export const filesLocation = 'files/mp3/'

app.all('*', (req, res, next) => {
    const {originalUrl, params, query, body} = req;
    console.log(JSON.stringify({originalUrl, params, query, body}));
    next();
})

//app.use(express.static(path.resolve('./public')));
app.post('/mp3/context', (req, res) => {
    console.log('bibi /mp3/api/context')
    res.status(200).json('fuck shit');
})

app.post("/api/content", async (req, res) => {
  console.log('bibi /api/context')
  if (req.method === 'POST') {
      console.log('-- db get folders and files')
      const folders = await getFolders();
      const files =  await getFiles();
      res.status(200).json({
          folder: filesLocation,
          content: {
              folders,
              files
          }
      });
    }
  // res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
