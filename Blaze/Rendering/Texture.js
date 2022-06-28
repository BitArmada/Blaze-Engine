

class Texture {
    constructor(src) {
        this.image = new Image();
        this.src = src;
        this.image.src = src;
    }
}

export default Texture;