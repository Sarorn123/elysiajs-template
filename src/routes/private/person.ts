import Elysia, { NotFoundError } from "elysia";
import { db } from "../../db/database";
import { APIResponse } from "../../lib/response-interceptor";

export const personRoute = new Elysia({
    prefix: "/person",
});

personRoute
    .get('', async () => {
        const persons = await db
            .selectFrom('person')
            .selectAll()
            .execute()

        return APIResponse(persons, "ok")
    })
personRoute
    .get('/person/:id', async ({ params: { id } }) => {
        const persons = await db
            .selectFrom('person')
            .where("id", "=", +id)
            .selectAll()
            .executeTakeFirst()
        if(!persons) throw new NotFoundError()
        return APIResponse(persons, "ok")

    })



