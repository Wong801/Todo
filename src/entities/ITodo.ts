export class ITodo {
    _id: string;
    title: string;
    desc: string;
    isCompleted: boolean;
    createdAt: string;
    constructor(
        _id: string,
        title: string,
        desc: string,
        isCompleted: boolean,
        createdAt: string
     ) {
        this._id = _id;
        this.title = title;
        this.desc = desc;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt
    }
}