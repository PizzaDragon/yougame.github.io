class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.currentScreen = new SchoolParty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFirstDialogue(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new SchoolPartyFollowUpNeutral(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)) {
            this.currentScreen = new SchoolPartyFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
    }
}
let init = () => {
    const You = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameObject {
    constructor(imgUrl, xPos, yPos, keyboardListener) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.keyboardListener = keyboardListener;
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
            ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            ctx.fillRect(x, y, this.img.naturalWidth, this.img.naturalHeight);
        }
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class GameScreen {
    constructor(game, canvas, ctx, img, keyboardlistener) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = img;
        this.keyboardListener = keyboardlistener;
    }
    draw(ctx) { }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadImage(source, callback) {
        this.img = new Image();
        this.img.src = source;
        return this.img;
    }
    drawBackgroundToScreen(img) {
        let x = 0;
        let y = 0;
        this.ctx.drawImage(img, x, y);
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyPress = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
        window.addEventListener("keypress", this.keyPress);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
    isKeyPreaa(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ONE = 49;
KeyboardListener.KEY_TWO = 50;
KeyboardListener.KEY_THREE = 51;
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_ENTER = 13;
class MainCharacter extends GameObject {
    constructor(imgUrl, xPos, yPos, keyboardListener) {
        super(imgUrl, xPos, yPos, keyboardListener);
        this.loadImage(imgUrl);
    }
}
class SchoolParty extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "FEESTSCENE", 140, this.canvas.width / 2, 300);
        this.writeTextToCanvas(ctx, 'Je bent op een feestje met Emily en wat mensen van school', 50, this.canvas.width / 2, 460);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", 30, this.canvas.width / 2, 550);
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 20, 240, 20);
        const backgroundImage = "./assets/images/background/SchoolPartyBackground.jpg";
        this.loadImage(backgroundImage, this.drawBackgroundToScreen);
    }
}
class SchoolPartyFirstDialogue extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "*Je staat te dansen met een jongen en hij gaat tegen je praten*", 50, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "*Hij leunt naar je toe en vraagt je snapchat*", 50, this.canvas.width / 2, 420);
        this.writeTextToCanvas(ctx, "Je geeft je snap(toets 1)", 30, this.canvas.width / 2, 460);
        this.writeTextToCanvas(ctx, "Je zegt niks (toets 2)", 30, this.canvas.width / 2, 510);
        this.writeTextToCanvas(ctx, "Je geeft hem je snap niet en wijst hem af (toets 3)", 30, this.canvas.width / 2, 550);
    }
}
class SchoolPartyFollowUpBad extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/SchoolPartyBackground.jpg";
        this.characterImage = new Image();
        this.characterImage.src = "./assets/images/characters/Kees1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0);
        this.ctx.drawImage(this.characterImage, 500, 500);
        this.writeTextToCanvas(ctx, "Je kijkt naar hem, geeft hem een glimlach en geeft hem je snapchat.", 50, this.canvas.width / 2, 200);
        this.writeTextToCanvas(ctx, "Jij: Je mag hem alleen hebben als je belooft dat je niet zal lachen ", 30, this.canvas.width / 2, 400);
        this.writeTextToCanvas(ctx, "Hij: Ja oke, ik beloof dat ik niet zal lachen. ", 30, this.canvas.width / 2, 430);
        this.writeTextToCanvas(ctx, "Jij: Oke vooruit dan maar, alsjeblieft", 30, this.canvas.width / 2, 460);
        this.writeTextToCanvas(ctx, "Jij: Ey maar mn ma is er dus ik ga naar huis", 30, this.canvas.width / 2, 490);
        this.writeTextToCanvas(ctx, "Hij: Ja sgoed, spreek je op snap", 30, this.canvas.width / 2, 520);
    }
}
class SchoolPartyFollowUpGood extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "Je zegt nee en wijst hem af", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Nee, ik ken je nog niet goed genoeg, dus ik wil je mijn snap niet geven", 30, this.canvas.width / 2, 470);
        this.writeTextToCanvas(ctx, "Hij: Wat? Hoezo niet? We dansen toch al heel de avond, wat doe je stom?", 30, this.canvas.width / 2, 500);
        this.writeTextToCanvas(ctx, "Jij: Ja sorry hoor, ik geef mijn snap gewoon niet aan mensen die ik niet ken, is dat een probleem ofzo?", 30, this.canvas.width / 2, 530);
        this.writeTextToCanvas(ctx, "Hij: Ja, dat is een probleem ja, je kent me toch? Maar laat maar zitten, rotkind dat je bent. Ik snap dat je vriendloos bent.", 30, this.canvas.width / 2, 560);
    }
}
class SchoolPartyFollowUpNeutral extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, 'Je zegt niks', 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Emily: Hey, valt deze jongen je soms lastig? Kom, dan gaan we wat te drinken halen.", 30, this.canvas.width / 2, 470);
    }
}
class StartScreen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener) {
        super(game, canvas, ctx, img, keyboardListener);
        this.shouldStartLevel = false;
        this.characterImage = new Image();
        this.characterImage.src = "./assets/images/characters/karakter2.png";
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/images/background/startscreen.jpg';
        this.phoneImage = new Image();
        this.phoneImage.src = "./assets/images/attributes/Mobile.png";
        this.snapchatImage = new Image();
        this.snapchatImage.src = "./assets/images/attributes/Snap.png";
        this.instagramImage = new Image();
        this.instagramImage.src = './assets/images/attributes/Insta.png';
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    adjust(game) {
        if (this.shouldStartLevel) {
            game.switchScreen();
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "You", 200, this.canvas.width / 2, 500);
        this.writeTextToCanvas(ctx, "DRUK OP ENTER OM TE SPELEN", 30, this.canvas.width / 2, 700);
    }
}
//# sourceMappingURL=app.js.map