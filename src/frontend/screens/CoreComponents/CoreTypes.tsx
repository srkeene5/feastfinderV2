interface Restaurant {
    restaurantID: string,
    restaurantName: string,
    restaurantAddress: string,
    distance: Number,
    menu: string[],
    ubereatsMenuPrice: Number[],
    doordashMenuPrice: Number[],
    grubhubMenuPrice: Number[],
    uberEatsAvailable: boolean,
    doordashAvailable: boolean,
    grubhubAvailable: boolean
}
export type {Restaurant as Restaurant}