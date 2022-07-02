export interface IName {
    title: string;
    first: string;
    last: string;
}

export interface ICoordinates {
    latitude: string;
    longitude: string;
}

export interface ITimezone {
    offset: string;
    description: string;
}

export interface ILocation {
    street: { name: string, number: number };
    city: string;
    state: string;
    postcode: string;
    coordinates: ICoordinates;
    timezone: ITimezone;
}

export interface ILogin {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface IDob {
    date: Date;
    age: number;
}

export interface IRegistered {
    date: Date;
    age: number;
}

export interface IId {
    name: string;
    value: string;
}

export interface IPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface IUser {
    gender: string;
    name: IName;
    location: ILocation;
    email: string;
    login: ILogin;
    dob: IDob;
    registered: IRegistered;
    phone: string;
    cell: string;
    id: IId;
    picture: IPicture;
    nat: string;
}

export interface IUserLocale {
    gender: string,
    email: string;
    name: string;
    dateOfBirth: string;
    photo: string;
    position: string;
    id: string;
    order?: number;
    age:number;
}