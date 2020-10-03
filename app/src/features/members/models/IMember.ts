export interface IMember {
    _id : string;
    name : string;
    last_name : string;
    birth_date : string;
    birth_place : string;
    fiscal_code : string;
    address : string;
    zip_code : string;
    city : string;
    province : string;
    gender: string;
    //gender : keyof typeof Gender;
    phone : string;
    email : string;
}

enum Gender {
    M = "M",
    F = "F"
}