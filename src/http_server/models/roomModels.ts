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