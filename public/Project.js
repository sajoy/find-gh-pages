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