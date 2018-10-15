Array.prototype.getRandomItem = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
}

class App {
  constructor () {
    this.setRandomTheme();

    this.shapes = new Shapes();
    this.shapes.exitHeader();

    this.attachListeners();
  }

  setRandomTheme () {
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


  attachListeners () {
    this.listenForFocus();
    this.listenForSubmit();
  }

  listenForFocus () {
    const usernameInput = document.querySelector('#user');

    usernameInput.addEventListener('focus', () => {
      this.shapes.enterInput();
    });
  }

  listenForSubmit () {
    const pages = document.querySelector('#pages');
    const searchForm = document.querySelector('#search');

    searchForm.addEventListener('submit', e => {
      e.preventDefault();

      const username = e.target.user.value;
      fetch(`/pages/${username}`)
      .then(response => response.json())
      .then(projects => {
        pages.innerText = '';

        if (projects.length) {
              this.shapes.exitInput();
              projects.forEach(project => new Project(project));
            } else if(projects.message === 'User doesn\'t exist') {
              this.shapes.exitInputAndFrown();
              const emptyProject = {
                name: 'User doesn\'t exist',
                url: '',
                description: `${username} is not on github, enter a valid github username please.`
              };

              new Project(emptyProject);
            } else {
              this.shapes.exitInputAndFrown();
              const emptyProject = {
                name: 'Nothing published',
                url: '',
                description: `${username} hasn't published any repos to gh-pages!`
              };

              new Project(emptyProject);
            }
        });
    });
  }
}

new App();
