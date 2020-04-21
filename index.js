function resultsHTML(responseJson){
  return
  `<img src='${responseJson.items[0].snippet.thumbnails.high.url}'>`
};

function displayResults(responseJson) {
  let htmlUpdate ='';
  for (let i=0;i<responseJson.items.length;i++){

  htmlUpdate +=
    `
<a href='https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}' target='_blank'>
<img src='${responseJson.items[i].snippet.thumbnails.high.url}' width= 15%>
</a>
`}
  $('#results-list').html(htmlUpdate);
  $('.results').removeClass('hidden');
  $('.usage_guide').addClass('hidden');
};

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}




function gitApiCall(searchTerm) {
  const apiKey = 'AIzaSyD1EP6ZMbHiMp_fLWaVB4zbf36IuqIGVSY';
  const searchURL = 'https://www.googleapis.com/youtube/v3/search';
  const params = {
    key: apiKey,
    part: 'snippet',
    q: searchTerm,
    safeSearch: 'moderate',
    videoCategoryId: 27,
    type: 'video',
    order: 'viewCount'
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
   fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayResults(responseJson))
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
    navBar();
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