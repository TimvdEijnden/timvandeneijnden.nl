window.onload = init;

function NyanCat() {

  this.__construct = function() {
    this.stage = new createjs.Stage("stageCanvas");
    this.stage.mouseEventsEnabled = true;
    this.preload();
  }

  this.preload = function() {
    var assetsPath = "assets/";
    var manifest = [{
      src: assetsPath + "music.mp3",
      id: 'music'
    }, {
      src: assetsPath + "animation.png",
      id: 'animation'
    }];
    this.preloader = new createjs.LoadQueue();
    this.preloader.useXHR = false;
    this.preloader.installPlugin(createjs.Sound);
    this.preloader.on("complete", this.preloadComplete, this);
    this.preloader.loadManifest(manifest, true);

  }

  this.preloadComplete = function() {
    var spriteSheetData = {
      "frames": [
        [128, 128, 128, 128, 0, 0, 0],
        [256, 256, 128, 128, 0, 0, 0],
        [128, 256, 128, 128, 0, 0, 0],
        [0, 256, 128, 128, 0, 0, 0],
        [384, 128, 128, 128, 0, 0, 0],
        [256, 128, 128, 128, 0, 0, 0],
        [384, 256, 128, 128, 0, 0, 0],
        [0, 128, 128, 128, 0, 0, 0],
        [384, 0, 128, 128, 0, 0, 0],
        [256, 0, 128, 128, 0, 0, 0],
        [128, 0, 128, 128, 0, 0, 0],
        [0, 0, 128, 128, 0, 0, 0]
      ],
      "animations": {
        "all": {
          "frames": [11]
        },
        "NyanCat": {
          "frames": [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
        }
      },
      images: [this.preloader.getResult('animation')]
    }

    this.container = new createjs.Container();
    this.ss = new createjs.SpriteSheet(spriteSheetData);
    this.ani = new createjs.Sprite(this.ss);
    this.ani.scaleX = 4;
    this.ani.scaleY = 4;

    createjs.Ticker.on("tick", this.tick, this);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setInterval(30);

    this.container.addChild(this.ani);
    this.stage.addChild(this.container);
    this.ani.gotoAndPlay("NyanCat");

    if (createjs.Sound.BrowserDetect && createjs.Sound.BrowserDetect.hasOwnProperty('isIOS') && createjs.Sound.BrowserDetect.isIOS) {
      createjs.Sound.registerPlugins([WebAudioPlugin, createjs.HTMLAudioPlugin]);
      this.container.onClick = proxy(this.playSound, this);
    } else {
      this.playSound();
    }
  }

  this.playSound = function() {
    var soundSrc = 'music';
    var instance = createjs.Sound.play(soundSrc);
  }

  this.tick = function() {
    this.stage.update();
  }

  this.__construct();
}

function init() {
  window.nyancat = new NyanCat();
}


window.proxy = function(method, scope) {
  return function() {
    return method.apply(scope, arguments);
  }
}
