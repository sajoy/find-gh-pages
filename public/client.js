Array.prototype.getRandomItem = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
}

setRandomTheme();

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
  const username = this.user.value;
  fetch(`/pages/${username}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(projects) {
      pages.innerText = '';
      projects.forEach(function(project) {new Project(project);});
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