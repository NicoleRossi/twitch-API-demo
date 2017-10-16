let btnSearch;
let tiSearchTerm;
let searchResults;

function setupEventListeners (evt) {
  window.removeEventListner('load', setupEventListeners);
  
  console.log('actions.js --> setupEventListeners');
  
  btnSearch = document.getElementById('search_btn');
  tiSearchTerm = document.getElementById('search_term');
  searchResults = document.getElementById('search_results');
}

window.addEventListner('load', setupEventListeners);
