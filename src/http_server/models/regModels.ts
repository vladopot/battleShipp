export interface regRequest {
    type: string,
    data: {
        name: string,
        password: string,
    },
    id: number
}

export interface regResponse {
    type: string,
    data: {
            name: string,
            index: number | string,
            error: boolean,
            errorText: string,
    },
    id: number,
}