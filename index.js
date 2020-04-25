//Updates DOM with wiki results
function displayWikiResults(responseJson) {
  let htmlUpdateWiki = `<p>${responseJson.extract}</p>`
  $('.wiki_results').html(htmlUpdateWiki);
  $('.results').removeClass('hidden');
  $('.usage_guide').addClass('hidden');
};

//calls Wiki API and checks for error before passing results to displayWikiResults function
function wikiApiCall(searchTerm) {
  const wikiURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`;
  fetch(wikiURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayWikiResults(responseJson)
    })
    .catch(error => console.log('Something went wrong. Try again later.', error));
};

//youtube results
function displayResults(responseJson) {
  let htmlUpdate = '';
  for (let i = 0; i < responseJson.items.length; i++) {
    htmlUpdate +=
      `
    <div id="snippet">
    <a href='https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}' target='_blank'>
    <img src='${responseJson.items[i].snippet.thumbnails.high.url}' class="video" width= 50%>
    </a>
    <h4>${responseJson.items[i].snippet.title}</h4>
    <br><br>
    </div>
    `
  }
  $('#results-list').html(htmlUpdate);
  // $('.results').removeClass('hidden');
  // $('.usage_guide').addClass('hidden');
};

//fancy way to format the URL query string from an object
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//calls youtube API and calls displayResults function
function gitApiCall(searchTerm) {
  const apiKey = 'AIzaSyBjt1dpL_IVRvFGRq8ToxGCyPmU7RFO1do';
  // const apiKey = 'AIzaSyD1EP6ZMbHiMp_fLWaVB4zbf36IuqIGVSY';
  const searchURL = 'https://www.googleapis.com/youtube/v3/search';
  const params = {
    key: apiKey,
    part: 'snippet',
    q: 'learn about ' + searchTerm, // added 'learn about' which is helping get educational results instead of dumb kids songs
    safeSearch: 'moderate',
    videoCategoryId: 27,
    type: 'video',
    regionCode: 'US',
    order: 'relevance',
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson)
    })
    .catch(error => console.log('Something went wrong. Try again later.', error));
};

//clears HTML when function is called
function clearHTML() {
  $('#results-list').html('');
}

//watches submit button and calls functions for wiki and youtube api
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    gitApiCall(searchTerm);
    wikiApiCall(searchTerm);
  });
}

$(watchForm);
