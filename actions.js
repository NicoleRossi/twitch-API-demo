let btnSearch;
let tiSearchTerm;
let searchResults;

function foo() {
  console.log('actions.js --> foo');
}

function queryTwitchAPI(evt) {
  console.log('actions.js --> queryTwitchAPI');
  console.log(`search term = ${tiSearchTerm.value}`);
  
  const tag = document.createElement("script");
  tag.src = `https://api.twitch.tv/kraken/search/streams?query=${escape(tiSearchTerm.value)}&client_id=bxqhnlfew1j1uqihshtrglvfj2m4f1`;
  document.getElementsByTagName("head")[0].appendChild(tag);
}

function setupEventListeners (evt) {
  window.removeEventListener('load', setupEventListeners);
  
  console.log('actions.js --> setupEventListeners');
  
  btnSearch = document.getElementById('search_btn');
  tiSearchTerm = document.getElementById('search_term');
  searchResults = document.getElementById('search_results');
  
  btnSearch.addEventListener('mouseup', queryTwitchAPI);
}

window.addEventListener('load', setupEventListeners);
