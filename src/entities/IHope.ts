export class IHope {
    _id: string;
    from: string;
    to: string;
    hope: string
    createdAt: string;
    constructor(
        _id: string,
        from: string,
        to: string,
        hope: string,
        createdAt: string
     ) {
        this._id = _id;
        this.from = from;
        this.to = to;
        this.hope = hope;
        this.createdAt = createdAt;
    }
}