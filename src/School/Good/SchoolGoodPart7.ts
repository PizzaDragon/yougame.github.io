/// <reference path='../../GameScreen.ts'/>
class SchoolGoodPart7 extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
    private youImage: HTMLImageElement;
    private dialogueBar: HTMLImageElement;




    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener,
        name: string
    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener, name);


        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.keesImage.src = "./assets/images/characters/Kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
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
        this.ctx.drawImage(this.keesImage, -200, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.7, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Kees: Ja? Dit was absoluut niet nodig geweest als je gewoon je mond hield en luisterde.", this.canvas.width / 2, this.canvas.height - 290);
        this.writeTextToCanvas(ctx, "Kees: Maar aangezien je niks meer dan een dom, irritant rotkind bent zal ik ervoor zorgen", this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, "dat niemand ooit meer met jou zal spreken. Niemand gaat met een vriendloze loser als jou om", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, "als ik tegen Emily vertel hoe jij over haar roddelt. Wees maar stil of ik stomp je in elkaar.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `${this.name}: Bah, wat kan jij toch zeiken, jij manipulatieve, vuile aartsleugena-`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Kees: HOUD JE BEK DICHT. *Kees begint dreigend te naderen met een opgeheven vuist*", this.canvas.width/2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Je probeert wat te zeggen, maar merkt dat Emily verderop staat met een telefooncamera gericht op jullie.", this.canvas.width/2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height - 10);
    }

}