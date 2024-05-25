import express from 'express'
const app: express.Express = express();
const port = 3000;

//pubilcフォルダ内のファイルも読み込めるようにする。
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})