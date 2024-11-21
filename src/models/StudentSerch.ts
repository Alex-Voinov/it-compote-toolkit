import IStudent from "./Student";

export default interface IStudentSerch {
    status: string;
    studentsData: IStudent | IStudent[] | null
}