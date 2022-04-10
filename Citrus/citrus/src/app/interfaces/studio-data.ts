export interface StudioData {
    masterName: string,
    masterId: string,
    arrayOfFreeTimes: Array<number>,
    price: number,
    procedureDuration: {
        hour: number,
        minute: number
    }
}
