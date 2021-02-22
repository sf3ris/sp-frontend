export interface IAttendance {
    _id: string;
    date: string;
    athletes_ids: string[];
    members_ids: string[];
    title: string;
    type?: string;
}
