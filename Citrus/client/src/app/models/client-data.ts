export class ClientData {
    master: string = ''
    masterId: number = 0
    masterWasSelected: boolean = false
    service: string = ''
    date: Date = new Date
    time: {
        hour: number,
        minute: number
    } = {
        hour: 0,
        minute: 0
    }
    name: string = ''
    surname: string = ''
    phoneNumber: string = ''
    comments: string = ''
}
