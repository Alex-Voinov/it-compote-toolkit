import IAgent from "./Agent";
import IDiscipline from "./Discipline";

export default interface IStudent {
    ClientId: number;
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Mobile: string;
    Birthday: string;
    Status: string;
    LearningTypes: string[];
    Agents: IAgent[];
    Disciplines: IDiscipline[];
}