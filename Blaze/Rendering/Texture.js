import Renderer from './WebGL/Renderer.js';

var gl;

class Texture {
    constructor(src) {
        gl = Renderer.gl;
        this.image = new Image();
        this.src = src;

        this.glTexture = gl.createTexture();
        // load defualt texture while image loadScene
        this.loadDefualtTexture();

        if(src){
            this.image.onload = this.onload.bind(this);
            this.image.src = src;
        }
    }
    loadDefualtTexture(){
        // load 1 pixel

        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

        const pixel = new Uint8Array([255, 255, 255, 255]);  // opaque white

        gl.texImage2D(
            gl.TEXTURE_2D, 
            0, // level
            gl.RGBA, // internal format
            1,  // width 
            1, // height
            0, // border 
            gl.RGBA, // src format
            gl.UNSIGNED_BYTE, // src type
            pixel
        );

    }
    onload(){
        gl.bindTexture(
            gl.TEXTURE_2D, 
            this.glTexture
        );

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA, 
            gl.UNSIGNED_BYTE, 
            this.image
        );

        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(this.image.width) && isPowerOf2(this.image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    }
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

export default Texture;