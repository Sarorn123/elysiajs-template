import { Elysia } from "elysia";
import { authRoute } from "./routes/auth";
import { middleware } from "./middleware/middleware";
import { DEFUALT_PATH } from "./config/config";
import { privateRoute } from "./routes/private";

const app = new Elysia()
  .get("/", () => "Power By Elysia ❤️")
  .use(middleware())
  .group(DEFUALT_PATH, app => app
    .use(authRoute)
    .use(privateRoute())
  )

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
