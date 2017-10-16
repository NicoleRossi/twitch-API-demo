class TwitchAPI {
  constructor() {
    console.log('new TwitchAPI');
    this.request = new XMLHttpRequest();
    this.request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    this.request.setRequestHeader('Client-ID', 'bxqhnlfew1j1uqihshtrglvfj2m4f1');
    this.request.withCredentials = true;
    this.requestListener = this.requestListener.bind(this);
  }
  
  searchFor(searchTerm) {
    console.log('TwitchAPI --> searchFor');
    
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
    
    for(let prop in this.request) {
      console.log(`this.request[${prop}] = ${this.request[prop]}`);
    }
  }
}
