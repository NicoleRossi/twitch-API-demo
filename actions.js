let btnSearch;
let tiSearchTerm;
let searchResults;

function displaySearchResults(results) {
  console.log('actions.js --> displaySearchResults');
  console.log(results);
  
  const streams = results.streams;
  for(let i = 0; i < streams.length; i++) {
    const stream = streams[i];
    const root = document.createElement('article');
    
    const thumbnailContainer = document.createElement('div');
    const summaryContainer = document.createElement('div');
    root.appendChild(thumbnailContainer);
    root.appendChild(summaryContainer);
    
    const thumbnail = new Image();
    thumbnail.src = streams[i].preview.small;
    thumbnailContainer.appendChild(thumbnail);
    
    const title = document.createElement('h3');
    const titleText = document.createTextNode(streams[i].stream_type);
    title.appendChild(titleText);
    summaryContainer.appendChild(title);
    
    const subTitle = document.createElement('h6');
    const subTitleText = document.createTextNode(`${streams[i].game} - ${streams[i].viewers} viewers`);
    subTitle.appendChild(subTitleText);
    summaryContainer.appendChild(subTitle);
    
    const creationDate = new Date(streams[i].created_at);
    console.log(creationDate);
    
    const description = document.createElement('p');
    const descriptionText = document.createTextNode(`FPS = ${streams[i].average_fps}; created at `);
    description.appendChild(descriptionText);
    summaryContainer.appendChild(description);
    
    searchResults.appendChild(root);
  }
}

function queryTwitchAPI(evt) {
  console.log('actions.js --> queryTwitchAPI');
  console.log(`search term = ${tiSearchTerm.value}`);
  
  const tag = document.createElement("script");
  tag.src = `https://api.twitch.tv/kraken/search/streams?query=${escape(tiSearchTerm.value)}&client_id=bxqhnlfew1j1uqihshtrglvfj2m4f1&callback=displaySearchResults&limit=5`;
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
