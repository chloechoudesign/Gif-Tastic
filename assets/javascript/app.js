$(document).ready(function(){

var tvShows = ["Mad Men", "Modern Family", "Breaking Bad", "The Office", "The Simpsons", "Prison break", "How I Met Your Mother", "Stranger Things", "Game of Thrones", "Sherlock", "Westworld", "This is Us", "Friends", "The Walking Dead", "The Big Bang Thoery", "House of Cards", "Narcos", "That '70s Show"];

function renderButtons(){
  $('#button-view').empty();
  for (var i = 0; i < tvShows.length; i++){
    var renderBtns = $('<button>');
    renderBtns.text(tvShows[i]);
    renderBtns.attr('data-name', tvShows[i]);
    renderBtns.addClass('movieBtn');
    $('#button-view').append(renderBtns);
  }
}

$('#add-movie').click(function(){
  event.preventDefault();
  var userInput = $('#movie-input').val().trim();
  //console.log(userInput);
  tvShows.push(userInput);
  //console.log(tvShows);
  renderButtons();
});

function displayGifs(){
  $('#movie-view').empty();

  var movie = $(this).attr('data-name');
  console.log(movie);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC";

  $.ajax({
    url: queryURL, 
    method: 'GET'
  })
    .done(function(response){
      
      var result = response.data;
      console.log(result);

      for (var i = 0; i < result.length; i++){
        var gifDiv = $('<div class="item">');
        var rating = result[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        var image = $('<img>');
        image.attr('src', result[i].images.fixed_height_still.url);
        image.addClass('gif');
        image.attr('data-state', 'still');
        image.attr('data-animate', result[i].images.fixed_height.url);
        image.attr('data-still', result[i].images.fixed_height_still.url);
        
        gifDiv.prepend(p);
        gifDiv.prepend(image);

        $('#movie-view').prepend(gifDiv);
      }
    });
}

function checkState() {
   var state = $(this).attr('data-state');
   console.log(state);

  if (state === 'still'){
    var animateURL = $(this).attr('data-animate');
    $(this).attr('src', animateURL);
    $(this).attr('data-state', 'animate');
  } else {
    var stillURL = $(this).attr('data-still');
    $(this).attr('src', stillURL);
    $(this).attr('data-state', 'still');
  }
}


$(document).on("click", ".gif", checkState);
$(document).on("click", ".movieBtn", displayGifs);
renderButtons();
});