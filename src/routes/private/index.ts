import Elysia from "elysia";
import { UnAuthenticationError } from "../../errors/error";
import { personRoute } from "./person";

export const privateRoute = () => (app: Elysia): Elysia => {
    return app.group("", {
        // @ts-ignore
        beforeHandle: async ({ jwt, cookie: { auth } }) => {
            const decoded = await jwt.verify(auth)
            if (!decoded) {
                throw new UnAuthenticationError()
            }
        }
    }, app => app
        // all private route here
        .use(personRoute)

    )
}
