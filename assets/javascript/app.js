$(document).ready(function(){

var disneyMovies = ["The Little Mermaid", "Aladdin", "Ratatouille", "The Lion King", "Toy Story", "Beauty and the Beast", "Up" ];

function renderButtons(){
  $('#button-view').empty();
  for (var i = 0; i < disneyMovies.length; i++){
    var renderBtns = $('<button>');
    renderBtns.text(disneyMovies[i]);
    renderBtns.attr('data-name', disneyMovies[i]);
    renderBtns.addClass('btn btn-primary movieBtn');
    $('#button-view').append(renderBtns);
  }
}

$('#add-movie').click(function(){
  event.preventDefault();
  var userInput = $('#movie-input').val().trim();
  //console.log(userInput);
  disneyMovies.push(userInput);
  //console.log(disneyMovies);
  renderButtons();
});

function displayGifs(){
  var movie = $(this).attr('data-name');
  console.log(movie);
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC";

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
        image.attr('src', result[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(image);

        $('#movie-view').prepend(gifDiv);
      }
    });
}







$(document).on("click", ".movieBtn", displayGifs);
renderButtons();
});