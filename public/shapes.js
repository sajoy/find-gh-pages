class Shapes {
  constructor () {
    this.setupFallIntoInput();
    this.setupFallFromInputEmpty();
    this.setupFallFromInput();
    this.setupFallFromHeader(); 
  }

  exitHeader () {
    this.fallFromHeader.play();
  }

  enterInput () {
    this.fallIntoInput.play();
  }

  exitInput () {
    this.fallFromInput.restart();
  }

  exitInputAndFrown () {
    this.fallFromInputEmpty.restart();
  }

  setupFallFromInputEmpty () {
    // fall from input to below into a sad face
    let tl = this.fallFromInputEmpty = anime.timeline({
      autoplay: false,
      duration: 600,
    });

    this.fallFromInputEmpty.add({
      targets: '#shapes .one',
      delay: 1000,
      translateY: [250, 360],
      translateX: [100, 20],
      offset: '-=400'
    })
    .add({
      targets: '#shapes .eight',
      translateY: [250, 430],
      translateX: [65, 65],
      offset: '-=200',
    })
    .add({
      targets: '#shapes .two',
      translateY: [250, 480],
      translateX: [150, 210],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .three',
      translateY: [250, 410],
      translateX: [120, 100],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .four',
      translateY: [250, 410],
      translateX: [180, 150],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .five',
      translateY: [250, 460],
      translateX: [50, 50],
      offset: '-=300',
    })
    .add({
      targets: '#shapes .six',
      translateY: [250, 350],
      translateX: [200, 230],
      offset: '-=300'
    })
    .add({
      targets: '#shapes .seven',
      translateY: [250, 440],
      translateX: [145, 180],
      offset: '-=250',
      complete: function(anim) {
        tl.pause();
      }
    });

  }

  setupFallIntoInput () {
    // fall from above into input
    let tl = this.fallIntoInput = anime.timeline({
      autoplay: false,
      duration: 600,
    });

    this.fallIntoInput.add({
      targets: '#shapes .one',
      translateY: [90, 250],
      translateX: [100, 100],
      offset: '-=450'
    })
    .add({
      targets: '#shapes .eight',
      translateY: [110, 250],
      translateX: [65, 65],
      offset: '-=450',
    })
    .add({
      targets: '#shapes .two',
      translateY: [130, 250],
      translateX: [150, 150],
      offset: '-=450',
    })
    .add({
      targets: '#shapes .three',
      translateY: [170, 250],
      translateX: [120, 120],
      offset: '-=500',
    })
    .add({
      targets: '#shapes .four',
      translateY: [150, 250],
      translateX: [180, 180],
      offset: '-=500',
    })
    .add({
      targets: '#shapes .five',
      translateY: [60, 250],
      translateX: [50, 50],
      offset: '-=520',
    })
    .add({
      targets: '#shapes .six',
      translateY: [80, 250],
      translateX: [200, 200],
      offset: '-=520'
    })
    .add({
      targets: '#shapes .seven',
      translateY: [80, 250],
      translateX: [145, 145],
      offset: '-=550',
      complete: function(anim) {
        tl.pause();
      }
    });
  }

  setupFallFromInput () {
    // fall from input to below
    let tl = this.fallFromInput = anime.timeline({
      autoplay: false,
      duration: 600,
    });

    this.fallFromInput.add({
      targets: '#shapes .one',
      delay: 1000,
      translateY: [250, 460],
      translateX: [100, 120],
      offset: '-=400'
    })
    .add({
      targets: '#shapes .eight',
      translateY: [250, 320],
      translateX: [65, 65],
      offset: '-=200',
    })
    .add({
      targets: '#shapes .two',
      translateY: [250, 500],
      translateX: [150, 220],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .three',
      translateY: [250, 380],
      translateX: [120, 80],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .four',
      translateY: [250, 340],
      translateX: [180, 200],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .five',
      translateY: [250, 420],
      translateX: [50, 50],
      offset: '-=300',
    })
    .add({
      targets: '#shapes .six',
      translateY: [250, 400],
      translateX: [200, 200],
      offset: '-=300'
    })
    .add({
      targets: '#shapes .seven',
      translateY: [250, 410],
      translateX: [145, 145],
      offset: '-=250',
      complete: function(anim) {
        tl.pause();
      }
    });

  }

  setupFallFromHeader () {
    let tl = this.fallFromHeader = anime.timeline({
      autoplay: false,
      duration: 600,
    });
    
    this.fallFromHeader.add({
      targets: '#shapes .one',
      delay: 1000,
      translateY: [0, 90],
      translateX: [100, 100],
      offset: '-=400'
    })
    .add({
      targets: '#shapes .two',
      translateY: [0, 130],
      translateX: [150, 150],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .three',
      translateY: [0, 170],
      translateX: [120, 120],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .four',
      translateY: [0, 150],
      translateX: [180, 180],
      offset: '-=400',
    })
    .add({
      targets: '#shapes .five',
      translateY: [0, 60],
      translateX: [50, 50],
      offset: '-=300',
    })
    .add({
      targets: '#shapes .six',
      translateY: [0, 80],
      translateX: [200, 200],
      offset: '-=300'
    })
    .add({
      targets: '#shapes .seven',
      translateY: [0, 80],
      translateX: [145, 145],
      offset: '-=250',
    })
    .add({
      targets: '#shapes .eight',
      translateY: [0, 220],
      duration: 1200,
      translateX: [65, 65],
      offset: '-=200',
      complete: function(anim) {
        tl.pause();
      }
    });
  }
}