export interface ClientData {
    master: string,
    masterId: number,
    services: string[],
    date: Date,
    time: {
        hour: number,
        minute: number
    }
    name: string,
    surname: string,
    phoneNumber: string,
    comments: string
}
