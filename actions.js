(function () {
  let btnSearch;
  let btnNext;
  let btnPrev;
  let searchTerm;
  let searchResults;
  let totalSearchResults;
  let pageLocation;
  let topMostHeadTag;
  let callbackName = 'displayTwitchAPISearchResults_9410'; // to do: replace 9410 with a random number or string
  let offset = 0;
  let maxResults = 5;
  let totalResults;

  function prependZeros(number) {
    if (number < 10) return `0${number}`;
    return `${number}`;
  }

  window[callbackName] = function (results) {
    console.log(results);
    
    const streams = results.streams;

    totalResults = results._total;
    
    totalSearchResults.textContent = `Total results:  ${totalResults}`;

    let totalPages = Math.ceil(totalResults / maxResults);
    if (totalPages === 0) totalPages = 1;
    let currPage = (offset / maxResults) + 1;
    pageLocation.textContent = `${currPage} / ${totalPages}`;

    if (currPage === totalPages) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'flex';
    }

    if (currPage === 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'flex';
    }
    
    const children = searchResults.childNodes;
    if (children.length > 1) {
      for (let i = children.length - 1; i > 1; i--) {
        searchResults.removeChild(children[i]);
      }
    }
    
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
      const subTitleText = document.createTextNode(`${streams[i].game} -- ${streams[i].viewers} viewers`);
      subTitle.appendChild(subTitleText);
      summaryContainer.appendChild(subTitle);
      
      const creationDate = new Date(streams[i].created_at);
      const year = creationDate.getFullYear();
      const month = prependZeros(creationDate.getMonth()+1);
      const day = prependZeros(creationDate.getDate());
      const hours = prependZeros(creationDate.getHours());
      const minutes = prependZeros(creationDate.getMinutes());
      const creationDateStr = `${year}.${month}.${day} at ${hours}:${minutes}`;
      
      const description = document.createElement('p');
      const descriptionText = document.createTextNode(`FPS = ${Math.round(streams[i].average_fps)}; created on ${creationDateStr}`);
      description.appendChild(descriptionText);
      summaryContainer.appendChild(description);
      
      searchResults.appendChild(root);
    }
  }

  function queryTwitchAPI(offset) {
    const newJSONP = document.createElement("script");
    newJSONP.src = `https://api.twitch.tv/kraken/search/streams?query=${escape(searchTerm.value)}&client_id=bxqhnlfew1j1uqihshtrglvfj2m4f1&callback=${callbackName}&limit=${maxResults}&offset=${offset}`;
    topMostHeadTag.appendChild(newJSONP);
  }

  function getNextGroupOfStreams() {
    offset += maxResults;

    if (offset > totalResults || searchResults.childNodes.length < 6) {
      offset -= maxResults;
      return;
    }

    queryTwitchAPI(offset);
  }

  function getPreviousGroupOfStreams() {
    offset -= maxResults;

    if (offset < 0) {
      offset = 0;
      return;
    }

    queryTwitchAPI(offset);
  }

  function newSearchOnTwitchAPI (evt) {
    offset = 0;
    queryTwitchAPI(offset);
  }

  function setupEventListeners (evt) {
    window.removeEventListener('load', setupEventListeners);

    btnNext = document.getElementById('next_btn');
    btnPrev = document.getElementById('prev_btn');
    btnSearch = document.getElementById('search_btn');
    searchTerm = document.getElementById('search_term');
    searchResults = document.getElementById('search_results');
    totalSearchResults = document.getElementById('hit_count');
    pageLocation = document.getElementById('page_location');
    topMostHeadTag = document.getElementsByTagName("head")[0];
    
    btnSearch.addEventListener('click', newSearchOnTwitchAPI);
    btnNext.addEventListener('click', getNextGroupOfStreams);
    btnPrev.addEventListener('click', getPreviousGroupOfStreams);
  }

  window.addEventListener('load', setupEventListeners);
})();
