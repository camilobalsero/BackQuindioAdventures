class ChaletImages {
    _id_chalet: number;
    _image: Buffer;

    constructor(id_chalet: number, image: Buffer) {
        this._id_chalet = id_chalet;
        this._image = image;
    }

    get image(): Buffer{
        return this._image
    }
}

export default ChaletImages;
