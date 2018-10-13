Array.prototype.getRandomItem = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
}

class Shapes {
  constructor () {
    // build a timeline of entire thing and pause and play as it progresses
    this.timeline = anime.timeline({autoplay: false});
    this.timeline.add({
      targets: '#shapes .circle',
      translateY: 100,
      translateX: 80
    })
    .add({
      targets: '#shapes .circle',
      translateY: 300,
      translateX: 20
    });
  }

  exitHeader () {
    this.timeline.play();
    setTimeout(this.timeline.pause, 800);
    console.log('exiting header');
  }

  enterInput () {
    console.log('entering input');
    this.timeline.play();
  }

  exitInput () {
    console.log('exiting input');
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
  shapes.enterInput();
  const username = this.user.value;
  fetch(`/pages/${username}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(projects) {
      shapes.exitInput();
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