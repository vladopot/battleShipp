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

export interface winnersUpdateResponce {
    type: string,
    data:
        [
            {
                name: string,
                wins: number,
            }
        ],
    id: 0,
}

export interface createRoom {
    type: string,
    data: string,
    id: number
}

export interface addUsetToRoom {
    type: string,
    data: {
        indexRoom: number | string,
    },
    id: 0,
}

export interface createGame {
    type: string,
    data:
        {
            idGame: number | string,  
            idPlayer: number | string,
        },
    id: 0,
}