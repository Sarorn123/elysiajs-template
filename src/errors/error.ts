import Elysia from "elysia"
import { APIResponse } from "../lib/response-interceptor"

export class UnAuthenticationError extends Error {
    constructor() {
        super()
    }
}

export class CustomError extends Error {
    constructor(public message: string) {
        super(message)
    }
}

export const errorHandler = () => (app: Elysia) => {
    app.addError({
        UN_AUTHENTICATION_ERROR: UnAuthenticationError,
        CUSTOM_ERROR: CustomError
    })
    app.onError(({ code, set, error }) => {

        // @ts-ignore
        if (code === 'CUSTOM_ERROR') {
            // @ts-ignore
            set.status = 400
            // @ts-ignore
            return APIResponse(null, error.message)
        }

        if (code === 'NOT_FOUND') {
            set.status = 404
            return APIResponse(null, 'Not Found :(')
        }

        // @ts-ignore
        if (code === "UN_AUTHENTICATION_ERROR") {
            // @ts-ignore
            set.status = 401
            return APIResponse(null, 'UnAuthentication :(')
        }

        if (code === 'INTERNAL_SERVER_ERROR') {
            set.status = 500
            return APIResponse(null, 'INTERNAL Server Error :(')
        }

        if (code === 'VALIDATION') {
            set.status = 400
            return APIResponse(null, 'VALIDATION Error :(')
        }

        if (code === 'UNKNOWN') {
            set.status = 500
            return APIResponse(null, 'UNKNOWN Error :(')
        }
    })
    return app;
}

