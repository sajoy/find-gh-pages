Array.prototype.getRandomItem = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
}

class Shapes {
  constructor () {

    // fall from above into input
    let tl2 = this.fallIntoInput = anime.timeline({
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
        tl2.pause();
      }
    });

    // fall from input to below
    let tl3 = this.fallFromInput = anime.timeline({
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
        tl3.pause();
      }
    });


      
    // fall from header
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

  exitHeader () {
    this.fallFromHeader.play();
  }

  enterInput () {
    this.fallIntoInput.play();
  }

  exitInput () {
    this.fallFromInput.play();
  }

}

const shapes = new Shapes();
setRandomTheme();
shapes.exitHeader();

function setRandomTheme() {
  const colors = [
    '#EC0B43', // red
    '#3772FF', // blue
    '#A600FF', // purple
    '#A2D729', // green
    '#E365C1', // pink
  ];

  const root = document.querySelector('body');
  root.style.setProperty('--theme-color', colors.getRandomItem());
}

const pages = document.querySelector('#pages');

const searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  shapes.exitInput();

  const username = this.user.value;
  fetch(`/pages/${username}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(projects) {
      pages.innerText = '';
      
      if (projects.length) {
        projects.forEach(function(project) {new Project(project);});
      } else {
        const emptyProject =  {
          name: 'null',
          url: '',
          description: `${username} hasn't published any repos to gh-pages!`
        };
        
        new Project(emptyProject);
      }      
    });
});

const usernameInput = document.querySelector('#user');
usernameInput.addEventListener('focus', function (e) {
  shapes.enterInput();
});

class Project {
  constructor ({name, url, description}) {
    this.name = name;
    this.url = url;
    this.description = description;
    
    this.ele = document.createElement('li');
    
    // TODO - use a <template>
    this.addToDom();
  }

  addToDom () {
    this.createTitle();
    this.createDescription();
    this.createLink();
    
    pages.appendChild(this.ele);
  }
  
  createTitle () {
    const title = document.createElement('h1');
    title.innerText = this.name;
    title.classList.add('spiky-header');
    title.setAttribute('data-content', this.name);
    
    this.ele.appendChild(title);
  }
  
  createDescription () {
    if (!this.description) return;
    const desc = document.createElement('p');
    desc.innerText = this.description;
    
    this.ele.appendChild(desc);
  }
    
  createLink () {
    const link = document.createElement('a');
    link.href = this.url;
    link.innerText = this.url;
    link.setAttribute('title', `Visit ${this.name}`);
    
    this.ele.appendChild(link);
  }
  
}