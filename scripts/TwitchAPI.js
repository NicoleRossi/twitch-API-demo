class TwitchAPI {
  constructor() {
    console.log('new TwitchAPI');
    this.request = new XMLHttpRequest();
    this.requestListener = this.requestListener.bind(this);
  }
  
  searchFor(searchTerm) {
    console.log('TwitchAPI --> init: bxqhnlfew1j1uqihshtrglvfj2m4f1');
    
    const {
      request,
      requestListener,
    } = this;
    
    request.addEventListener("load", requestListener);
    request.open("GET", `https://api.twitch.tv/kraken/search/streams?q=${searchTerm}`);
    request.send();
  }

  requestListener(evt) {
    for(let prop in evt) {
      console.log(`evt[${prop}] = ${evt[prop]}`);
    }
  }
}
