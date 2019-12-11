/**
 * class MainCharacter handles global character attributes like: name, style, etc....
 */
/// <reference path="GameObject.ts"/>
class MainCharacter extends GameObject {

    private keyboardListener: KeyboardListener;

    // /**
    //  * Construct a new Character object.
    //  *
    //  * @param imgUrl url of the image to load
    //  * @param xPos X coordinate of its starting position
    //  * @param yPos y coordinate of its starting position
    //  */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        keyboardListener: KeyboardListener,

    ) {
        super(imgUrl, xPos, yPos);
        this.loadImage(imgUrl);
        this.keyboardListener = keyboardListener;
    }

}