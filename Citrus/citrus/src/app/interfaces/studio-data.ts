export interface StudioData {
    masterName: string,
    masterId: number,
    arrayOfFreeTimes: Array<number>,
    price: number,
    procedureDuration: {
        hour: number,
        minute: number
    }
}
