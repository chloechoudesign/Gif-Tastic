$(document).ready(function(){

var disneyMovies = ["The Little Mermaid", "Aladdin", "Ratatouille", "The Lion King", "Toy Story", "Beauty and the Beast", "Up" ];

function renderButtons(){
  $('#button-view').empty();
  for (var i = 0; i < disneyMovies.length; i++){
    var renderBtns = $('<button>');
    renderBtns.text(disneyMovies[i]);
    renderBtns.addClass('btn btn-primary');
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






renderButtons();
});