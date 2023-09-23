import { t } from "elysia";

export const signInDTO = t.Object({
    email: t.String(),
    password: t.String()
})

export const registerDTO = t.Object({
    email: t.String(),
    first_name: t.String(),
    last_name: t.String(),
    password: t.String()
})