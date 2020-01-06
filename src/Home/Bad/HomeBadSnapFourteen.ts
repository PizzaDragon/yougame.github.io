/// <reference path = '../../GameScreen.ts' />
class HomeBadSnapFourteen extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
    private youImage: HTMLImageElement;
    private dialogueBar: HTMLImageElement;
    private snapchatImage: HTMLImageElement;
   
   
   
   
    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener
   
    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);
   
   
        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        this.snapchatImage = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap14.png"
    }
   
    /**
     * method to initialize the screen
     */
    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true
        }
    }
   
    public draw(ctx: CanvasRenderingContext2D) {
        //Loads images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.snapchatImage, this.canvas.width/3, 0, this.canvas.width/3, this.canvas.height)        
        
       
   
    }
 }