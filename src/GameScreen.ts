class GameScreen {

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
    ) {
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
    public draw(ctx: CanvasRenderingContext2D) { 
        
    }

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
        xCoordinate: number,
        yCoordinate: number,
        fontSize: number = 30,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
        outline: string = "black",
    ) {
        ctx.font = `${fontSize}px Helvetica`;
        ctx.strokeStyle = outline;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.strokeText(text, xCoordinate, yCoordinate);
        ctx.fillText(text, xCoordinate, yCoordinate);
        
    }
}