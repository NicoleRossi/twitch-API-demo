let btnSearch;
let tiSearchTerm;
let searchResults;
let twitchAPI;

function queryTwitchAPI(evt) {
  console.log('actions.js --> queryTwitchAPI');
  console.log(`search term = ${tiSearchTerm.value}`);
  console.log(twitchAPI);
  twitchAPI.searchFor(tiSearchTerm.value);
}

function setupEventListeners (evt) {
  window.removeEventListener('load', setupEventListeners);
  
  console.log('actions.js --> setupEventListeners');
  
  twitchAPI = new TwitchAPI();
  
  btnSearch = document.getElementById('search_btn');
  tiSearchTerm = document.getElementById('search_term');
  searchResults = document.getElementById('search_results');
  
  btnSearch.addEventListener('mouseup', queryTwitchAPI);
}

window.addEventListener('load', setupEventListeners);
