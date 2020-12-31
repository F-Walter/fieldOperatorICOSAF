export class Order {
    public get order_ts_end(): Date {
        return this._order_ts_end;
    }
    public set order_ts_end(value: Date) {
        this._order_ts_end = value;
    }
    public get order_work_area_id(): Number {
        return this._order_work_area_id;
    }
    public set order_work_area_id(value: Number) {
        this._order_work_area_id = value;
    }
    public get order_status_id(): Number {
        return this._order_status_id;
    }
    public set order_status_id(value: Number) {
        this._order_status_id = value;
    }
    public get order_ts(): Date {
        return this._order_ts;
    }
    public set order_ts(value: Date) {
        this._order_ts = value;
    }
    public get order_uc(): String {
        return this._order_uc;
    }
    public set order_uc(value: String) {
        this._order_uc = value;
    }
    public get order_description(): String {
        return this._order_description;
    }
    public set order_description(value: String) {
        this._order_description = value;
    }
    public get order_id(): Number {
        return this._order_id;
    }
    public set order_id(value: Number) {
        this._order_id = value;
    }


    constructor(
        private _order_id: Number,
        private _order_description: String,
        private _order_uc: String,
        private _order_ts: Date,
        private _order_status_id: Number,
        private _order_work_area_id: Number,
        private _order_ts_end: Date) {
    }
}