export class ErrorHandler extends Error {

    public statusCode: number;

    constructor (message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode;

        this.stack = new Error(message).stack;
    }
}

export const handleError = (error: any) => {
    if (error instanceof ErrorHandler) {
        return { message: error.message, statusCode: error.statusCode };
    }

    return { message: "Internal Server Error", statusCode: 500 }
}