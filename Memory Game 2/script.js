cardArray=[
    {text: "A", image: "images/1.jpg"},
    {text: "A", image: "images/1.jpg"},
    {text: "B", image: "images/2.jpg"},
    {text: "B", image: "images/2.jpg"},
    {text: "C", image: "images/3.jpg"},
    {text: "C", image: "images/3.jpg"},
    {text: "D", image: "images/4.jpg"},
    {text: "D", image: "images/4.jpg"},
    {text: "E", image: "images/5.jpg"},
    {text: "E", image: "images/5.jpg"},
    {text: "F", image: "images/6.jpg"},
    {text: "F", image: "images/6.jpg"}

];

clickedCard=[];
cardsDone=[];
matchedCard=[];

clicks=24;

var shuffleDeck=function(){
  var currentIndex = cardArray.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = cardArray[currentIndex];
    cardArray[currentIndex] = cardArray[randomIndex];
    cardArray[randomIndex] = temporaryValue;
  }
}

shuffleDeck();
var board=document.getElementById("board");

function game(){
  console.log(cardsDone.length);
  if (clicks>0){
    clicks--;
    document.getElementById('counter').innerHTML=clicks.toString();
    var card = this;
    if (clickedCard.length < 2){
      card.classList.add("image");
      card.classList.add("match"); // add class of match to all cards
      clickedCard.push(card.innerHTML);
      matchedCard.push(card);

      //// compares cards that are clicked on
      if (clickedCard.length === 2){
        if (clickedCard[0] === clickedCard[1]){
            cardsDone.push(clickedCard[0]);
            cardsDone.push(clickedCard[1]);              
            clickedCard=[];
            matchedCard=[];
        } else {
          setTimeout(turnOffAllCards, 1000);
          for (i=0; i<matchedCard.length; i++){
            matchedCard[i].style.animation = "flipInY 0.5s linear 1";
            matchedCard[i].classList.remove("match");

          }
          matchedCard=[];

        }
      } 
    } 
  } else {
    document.getElementById('counter').innerHTML= "Clicks are over! Try again next time!";
  }
  if (cardsDone.length == 12) {
    document.getElementById('counter').innerHTML= "Yay! You matched all the cards!";
    done();
  }
}

for(var i=0; i<cardArray.length; i++){

  var cardsBack=document.createElement("div");
  cardsBack.classList.add("card");
  board.appendChild(cardsBack);

  var images=document.createElement("img");
  images.src = cardArray[i].image;
  images.className="image";
  cardsBack.appendChild(images);



  // Change color of cards on click
  cardsBack.addEventListener("click", game, true); 
} 

function turnOffAllCards(){
  var frontCards = document.querySelectorAll("div.image:not(.match)");
  for(var i = 0; i < frontCards.length; i++){
    frontCards[i].classList.remove("image");
    clickedCard=[];

  }

}

function done() {
    for(var i=0; i<cardArray.length; i++){
      cardArray[i].removeEventListener("click", game, true);
    }
}