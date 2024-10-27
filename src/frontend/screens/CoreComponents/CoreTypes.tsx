interface Restaurant {
    restaurantID: string;
    restaurantName: string;
    restaurantAddress: string;
    distance: number;
    menu: string[];
    ubereatsMenuPrice: number[];
    doordashMenuPrice: number[];
    grubhubMenuPrice: number[];
    ubereatsAvailable: boolean;
    doordashAvailable: boolean;
    grubhubAvailable: boolean;
    mapUrl?: string; // Added as optional
}
export type {Restaurant as Restaurant}