
// function resultsHTML(responseJson){
//   console.log(responseJson.items[0].snippet.thumbnails.high.url)
//   return
//   `<img src='${responseJson.items[0].snippet.thumbnails.high.url}'>`
// }

function displayResults(responseJson){
console.log(responseJson);
console.log(responseJson.items[0].id.videoId);  
console.log(responseJson.items[0].snippet.thumbnails.high.url)
let htmlUpdate = `<img src='${responseJson.items[0].snippet.thumbnails.high.url}'>`
console.log(htmlUpdate)
$('#results-list').html(htmlUpdate);
};


// https://www.youtube.com/watch?v=rCtm5ZAy9Eo
function gitApiCall(searchTerm) {
  const apiKey = 'AIzaSyD1EP6ZMbHiMp_fLWaVB4zbf36IuqIGVSY';
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=igneous%20rocks&safeSearch=moderate&key=AIzaSyD1EP6ZMbHiMp_fLWaVB4zbf36IuqIGVSY&videoCategoryId=27&type=video`)
    .then(response => {
        if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson => 
      displayResults(responseJson))
   .catch(error => console.log('Something went wrong. Try again later.',error));
};


function clearHTML(){
  $('#results-list').html('');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    clearHTML();
    gitApiCall(searchTerm);
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