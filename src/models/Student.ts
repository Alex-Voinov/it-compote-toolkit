import IAgent from "./Agent";

export default interface IStudent {
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Mobile: string;
    Birthday: string;
    Status: string;
    LearningTypes: string[];
    Agents: IAgent[]
}