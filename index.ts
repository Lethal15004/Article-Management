import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
dotenv.config();//Thêm config cho dotenv

//Import connect database
import connectDataBase from "./config/database";

const app: Express = express();
const port: number = 3000;


connectDataBase();

// Rest API
import Article from "./model/article.model";
app.get("/articles", async (req: Request, res: Response) => {
  const articles=await Article.find({
    deleted:false
  });
  res.json({
    articles: articles
  });
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});