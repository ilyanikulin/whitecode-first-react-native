import { readJsonFile } from "./utils.js";
import path from "path";
import faker from "faker";

export default (expressServer) => {
  expressServer.get("/news", (req, res) => {
    let news = readJsonFile(path.resolve("./mock/dev-db.json"), "news");
    if (Array.isArray(news)) {
      news = news.map((item) => {
        return {
          ...item,
          name: faker.lorem.words(),
          content: faker.lorem.paragraphs(),
          image: faker.image.imageUrl(400, 400, "people"),
        };
      });
    }
    res.json(news);
  });
};
