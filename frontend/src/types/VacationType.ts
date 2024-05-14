export type VacationType = {
    _id: string;
    locationCountry: string;
    locationCity: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
    usersFollowed: Array<string>;
}

export type VacationsType = {
    locationCountry: string;
    usersFollowed: Array<string>;
}