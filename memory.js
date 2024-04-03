var cards = ["Kyle.png", "Butters.png", "Stan.png", "Tolkien.png", "Kenny.png", "Stan.png", "Cartman.png", "Kyle.png", "Tolkien.png", "Kenny.png", "Cartman.png", "Butters.png"];
var cardElements = document.querySelectorAll('.card');

var oneVisible = false;
var turnCounter = 0;
var visibleNr;
var lock = false;
var pairsLeft = 6;

shuffle(cards);

cardElements.forEach((card, index) => {
    $(card).css('background-image', 'url(img/SouthPark.png)').addClass('card').removeClass('cardA').css('opacity', '1');
    card.addEventListener("click", function() { 
        revealCard(index); 
    });
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function revealCard(nr) {
    var opacityValue = $('#c'+nr).css('opacity');
    
    if (opacityValue != 0 && lock == false) {
        lock = true;
    
        var obraz = "url(img/" + cards[nr] + ")";
        
        $('#c'+nr).css('background-image', obraz);
        $('#c'+nr).addClass('cardA').removeClass('card');
        
        if(oneVisible == false) {
            oneVisible = true;
            visibleNr = nr;
            lock = false;
        } else {
            if(cards[visibleNr] == cards[nr]) {
                setTimeout(function() { hide2Cards(nr, visibleNr) }, 750);
            } else {
                setTimeout(function() { restore2Cards(nr, visibleNr) }, 1000);
            }
            
            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible = false;
        }
    }
}

function hide2Cards(nr1, nr2) {
    $('#c'+nr1).css('opacity', '0');
    $('#c'+nr2).css('opacity', '0');
    
    pairsLeft--;
    
    if(pairsLeft == 0) {
        var winMessage = '<div class="win-message"><img src="img/southpark.png.webp" alt="You win!"><br>You win!<br>Done in '+turnCounter+' turns</div><br><br> Thanks for playing!';
        $('.board').html(winMessage);
    }
    
    lock = false;

    $('#restart-button').on('click', function() {
        resetGame();
    });
}

function restore2Cards(nr1, nr2) {
    $('#c'+nr1+', #c'+nr2).css('background-image', 'url(img/SouthPark.png)').addClass('card').removeClass('cardA');
    
    lock = false;
}

$('#restart-button').on('click', function() {
    resetGame();
});

function resetGame() {
    shuffle(cards);
    cardElements.forEach((card, index) => {
        $(card).css('background-image', 'url(img/SouthPark.png)').addClass('card').removeClass('cardA').css('opacity', '1');
    });
    $('.score').html('Turn counter: 0');
    oneVisible = false;
    turnCounter = 0;
    pairsLeft = 6;
    lock = false;
}
