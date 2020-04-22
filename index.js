function displayWikiResults(responseJson) {

  let htmlUpdateWiki =
  `
  <p>${responseJson.extract}</p>
  `

  $('.wiki_results').html(htmlUpdateWiki);
  $('.results').removeClass('hidden');
  $('.usage_guide').addClass('hidden');
};



function wikiApiCall(searchTerm) {
  // const wikiBaseURL = 'https://en.wikipedia.org/w/api.php';
  const wikiParams = {
    // format: 'json',
    // action: 'query',
    // prop: 'extracts',
    // redirects: 1,
    // titles: searchTerm,
    // origin: '*',
    // exintro: '',
    // explaintext: '',
  };

  const wikiURL =`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`

  // const wikiQueryString = formatQueryParams(wikiParams);
  // const wikiURL = wikiBaseURL + '?' + wikiQueryString;
  console.log(wikiURL);

  fetch(wikiURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      console.log(responseJson);
      console.log(responseJson.extract);
      displayWikiResults(responseJson)

    })
    .catch(error => console.log('Something went wrong. Try again later.', error));
};




function resultsHTML(responseJson) {
  return `<img src='${responseJson.items[0].snippet.thumbnails.high.url}'>`
};

function displayResults(responseJson) {
  let htmlUpdate = '';
  console.log(responseJson);
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
    
/*`<section class='videos'>
  
  <p>${responseJson.items[i].snippet.title}</p>
  
  <a href='https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}' target='_blank'>
  <img src='${responseJson.items[i].snippet.thumbnails.high.url}' class='video' width= 20%> 
  </a>
</section> `*/



  }
  $('#results-list').html(htmlUpdate);
  $('.results').removeClass('hidden');
  $('.usage_guide').addClass('hidden');
};

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
// CAUQAA




function gitApiCall(searchTerm) {
  const apiKey = 'AIzaSyD1EP6ZMbHiMp_fLWaVB4zbf36IuqIGVSY';
  const searchURL = 'https://www.googleapis.com/youtube/v3/search';
  const params = {
    key: apiKey,
    part: 'snippet',
    q: 'learn about ' + searchTerm, // added 'learn about' which is helping get educational results instead of dumb kids songs
    safeSearch: 'moderate',
    videoCategoryId: 27,
    type: 'video',
    // pageToken: nextPageToken,

    regionCode:'US',
    order: 'relevance', // tried searching by viewcount, which got some bad kid videos with 100 mil views. relevance seems to be the best search, when added with Learn about
    // Tried adding video duration to medium, did not seem to help filter out bad results.
    // videoDuration:'medium'
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
      // let nextPageToken = responseJson.nextPageToken;
      displayResults(responseJson)
    
    })
    .catch(error => console.log('Something went wrong. Try again later.', error));
};


function clearHTML() {
  $('#results-list').html('');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    //clearHTML();
    gitApiCall(searchTerm);
    wikiApiCall(searchTerm);
  });
}

$(watchForm);



// 1 User types in search 
// 2 User clicks submit
// 3 We watch for event
// 4 We save search variable
// 5 We add variable to FETCH request and get 5 youtube search displayResults
// 6 We get videoID from youtube search results
// 7 We get thumbnail URL from youtube search results
// 8 We add thumbnail picture to DOM as link
// 9 We add think to thumbnail with video URL

// add extra radial buttons and search parameters