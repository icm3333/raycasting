export class Input{
    constructor(){
        this.keys = new Set();

        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("blur", this.onBlur);
    }

    onKeyDown = (event) => {
        this.keys.add(event.code);
    }

    onKeyUp = (event) => {
        this.keys.delete(event.code);
    }

    onBlur = () => {
        this.keys.clear();
    }

    isDown(key){
        return this.keys.has(key);
    }

}