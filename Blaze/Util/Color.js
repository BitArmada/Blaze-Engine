

class Color {
    constructor(red = 0, green = 0, blue = 0, alpha = 0){
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }

    toArray(){
        return [this.r, this.g, this.b, this.a];
    }

    /** getters */

    get red() {
        return this.r;
    }

    get green() {
        return this.g;
    }

    get blue() {
        return this.g;
    }

    get alpha() {
        return this.g;
    }

    /** setters */

    set red(r) {
        this.r = r;
    }

    set green(g) {
        this.g = g;
    }

    set blue(b) {
        this.b = b;
    }

    set alpha(a) {
        this.a = a;
    }
}

export default Color;