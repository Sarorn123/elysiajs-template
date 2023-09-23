import cookie from "@elysiajs/cookie";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { errorHandler } from "../errors/error";
import { DEFUALT_PATH } from "../config/config";

export const middleware = () => (app: Elysia) => {
    return app
        .use(swagger({
            path: DEFUALT_PATH + "/swagger",
            documentation: {
                info: {
                    title: 'Project Name Documentation',
                    version: '1.0.0',
                    description: 'this is about set up of elysia js from 0 ! 👌❤️'
                }
            }
        }))
        .use(cors({
            credentials: true
        }))
        .use(cookie())
        .use(errorHandler())
        .use(
            jwt({
                name: 'jwt',
                secret: process.env.SECRET ?? ""
            }),
        )
}
