import { Agv } from './agv.model';

export class WorkArea {
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get agvList(): Agv[] {
        return this._agvList;
    }
    public set agvList(value) {
        this._agvList = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }



    constructor(private _id: number,private _name: string,private _agvList: Agv[]) {
    }


}
