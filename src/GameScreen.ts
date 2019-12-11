class GameScreen{

    //Add basic attributes to GameScreen class
    protected readonly game: Game;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D;
    protected img: HTMLImageElement;
    protected keyboardListener: KeyboardListener


    //Add the global constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardlistener: KeyboardListener
        ){
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = img;
        this.keyboardListener = keyboardlistener;
    
    }

    /**
     * 
     * method to draw the canvas to the screen
     */
    public draw(ctx:CanvasRenderingContext2D){}

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    protected writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "blue",
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    public loadImage(source: string,  callback: (img: HTMLImageElement) => void) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }

    /**
     * method to draw the background image to the current screen
     */
    public drawBackgroundToScreen(img: HTMLImageElement) {
        let x = 0;
        let y = 0;
        this.ctx.drawImage(img, x, y);
    }

       


}