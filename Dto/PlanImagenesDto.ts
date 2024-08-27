class PlanImages {
    _id_plan: number;
    _image: Buffer;

    constructor(id_plan: number, image: Buffer) {
        this._id_plan = id_plan;
        this._image = image;
    }

    get image(): Buffer{
        return this._image
    }
}

export default PlanImages;
