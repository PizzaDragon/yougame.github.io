class GameObject {
    //add the global GameObject attributes.
    protected xPos: number;
    protected yPos: number;
    protected img: HTMLImageElement;

    /**
    * Construct a new object.
    *
    * @param imgUrl url of the image to load
    * @param xPos X coordinate of its starting position
    * @param yPos y coordinate of its starting position
   */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
    ) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    /**
   * Let the object draw itself on the correct position on the given
   * CanvasRenderingContext2D.
   *
   * @param ctx The CanvasRenderingContext2D to draw to
   */
    public draw(ctx: CanvasRenderingContext2D) {

        // We want the center of the image to be the position of this objectgi
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
            ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            ctx.fillRect(x, y, this.img.naturalWidth, this.img.naturalHeight);
        }

    }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    protected loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }

    /**
     * constructs a function to handle the dialogue options
     * 
     * @param dialogue1 
     * @param dialogue2 
     * @param dialogue3 
     * @param character1 
     * @param character2 
     */
    public writeDialogueOptions(
        dialogue1: string,
        dialogue2: string,
        dialogue3: string,
        character1: HTMLImageElement,
        character2: HTMLImageElement        
    ){
        //only if else here


    }
}