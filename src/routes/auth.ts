import Elysia from "elysia"
import { APIResponse } from "../lib/response-interceptor";
import { CustomError, UnAuthenticationError } from "../errors/error";
import { db } from "../db/database";
import { registerDTO, signInDTO } from "../dto/auth.dto";

export const authRoute = new Elysia({
    prefix: "/auth"
});

// @ts-ignore
authRoute.post('/register', async ({ body }) => {
    try {
        const { password } = body;
        const hash = await Bun.password.hash(password);
        const result = await db
            .insertInto('user')
            .values({ ...body, password: hash })
            .returning("user.email")
            .executeTakeFirst()
        return APIResponse(result, "ok");
    } catch (err: any) {
        throw new CustomError(err.message)
    }

}, {
    body: registerDTO,
    beforeHandle: async ({ body }) => {
        const user = await db
            .selectFrom('user')
            .where('email', '=', body.email)
            .executeTakeFirst()

        if (user) throw new CustomError("Email taken !")
    }
});


// @ts-ignore
authRoute.post('/sign-in', async ({ jwt, setCookie, params, body }) => {

    const user = await db
        .selectFrom('user')
        .selectAll()
        .where('email', '=', body.email)
        .executeTakeFirst()

    if (!user) throw new UnAuthenticationError()
    const verify_password = await Bun.password.verify(body.password, user.password);
    if (!verify_password) throw new CustomError("Password not correct !")
    delete user.password

    setCookie('auth', await jwt.sign({ ...params, ...user }), {
        httpOnly: true,
        maxAge: 7 * 86400,
    })

    return APIResponse(user, "ok");

}, {
    body: signInDTO,
});


// @ts-ignore
authRoute.post('/sign-out', async ({ setCookie }) => {

    setCookie('auth', {} , {
        httpOnly: true,
        maxAge: 0,
    })

    return APIResponse(null, "ok");

});