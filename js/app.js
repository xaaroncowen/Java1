'use strict';

Item.allItems = [];


//PLAY
var totClicks;
totClicks=0;
//END PLAY



var resultsList = document.getElementById('results_list');

var allImages = [img1, img2, img3];

function Item(name, displayName, filePath) {
  this.name = name;
  this.displayName = displayName;
  this.filePath = filePath;
  this.showCount = 0;
  this.clickCount = 0;
  this.displayedAs = 'none';
  Item.allItems.push(this);
}

//initialize all the images

var bag = new Item('bag','Bag','img/bag.jpg');
var banana = new Item('banana', 'Banana', 'img/banana.jpg');
var bathroom = new Item('bathroom','Bathroom', 'img/bathroom.jpg');
var boots = new Item('boots', 'Boots', 'img/boots.jpg');
var breakfast = new Item('breakfast', 'Breakfast', 'img/breakfast.jpg');
var bubblegum = new Item('bubblegum','Bubble Gum', 'img/bubblegum.jpg');
var chair = new Item('chair', 'Chair', 'img/chair.jpg');
var cthulhu = new Item('cthulhu','Cthulhu','img/cthulhu.jpg');
var dogDuck = new Item('dog_duck','Dog Duck','img/dog-duck.jpg');
var dragon = new Item('dragon','Dragon','img/dragon.jpg');
var pen = new Item('pen','Pen','img/pen.jpg');
var petSweep = new Item('pet_sweep','Pet Sweep','img/pet-sweep.jpg');
var scissors = new Item('scissors', 'Scissors','img/scissors.jpg');
var shark = new Item('shark','Shark','img/shark.jpg');
var sweep = new Item('sweep','Sweep','img/sweep.png');
var tauntaun = new Item('tauntaun','Tauntaun','img/tauntaun.jpg');
var unicorn = new Item('unicorn','Unicorn','img/unicorn.jpg');
var usb = new Item('usb','USB','img/usb.gif');
var waterCan = new Item('water_can','Water Can','img/water-can.jpg');
var wineGlass = new Item('wine_glass','Wine Glass','img/wine-glass.jpg');

console.log('START')
document.getElementById('img1').addEventListener('click', function(){
  chooseItem(event.target.id);
});
document.getElementById('img2').addEventListener('click', function(){
  chooseItem(event.target.id);
});
document.getElementById('img3').addEventListener('click', function(){
  chooseItem(event.target.id);
});

function endMouseclick(e){
  if (totClicks === 25 ){
    console.log ('f************************uck = 25');
    break
    document.getElementById('img1').removeEventListener('click', chooseItem(event.target.id));
    document.getElementById('img2').removeEventListener('click', chooseItem(event.target.id));
    document.getElementById('img3').removeEventListener('click', chooseItem(event.target.id));
    console.log('END REMOVE EVENT LISTENER');
  }
}

// event.target.id is the img# receved from user click, then it is sent through the ChoosItem() function as var inTarget
function chooseItem(inTarget){

  for (var chooseCounter = 0; chooseCounter < Item.allItems.length; chooseCounter++) {
    if (Item.allItems[chooseCounter].displayedAs === inTarget) {
      //console.log('Item.allItems[chooseCounter].displayedAs = ' + Item.allItems[chooseCounter].displayedAs);
      //console.log('chooseCounter = ' + chooseCounter);
      Item.allItems[chooseCounter].clickCount++;
      //console.log('Item.allItems[chooseCounter].clickCount = ' + Item.allItems[chooseCounter].clickCount);
      break;
    }
  }
  refreshItems();
  console.log('WITHIN FUNCTION ChooseItem');
}
//console.log('ShowCount = ' + Item.showCount);
function displayNewItem(inImg){
  var canDisplay = false;
  while (canDisplay === false) {
    var randomPic = Math.floor(Math.random() * Item.allItems.length);
    if (Item.allItems[randomPic].displayedAs === 'none') {
      canDisplay = true;
      Item.allItems[randomPic].displayedAs = inImg.id;
      //how does javascript know inImg is an HTML object, where is .id and .src defined in Javascript??
      //console.log('inImg = ' + inImg)
      //console.log('inImg.id = ' + inImg.id)
      Item.allItems[randomPic].showCount++;
      inImg.src = Item.allItems[randomPic].filePath;
      //console.log(Item.allItems[randomPic]);
    }
  }
}

function refreshItems() {
  //first set everything to undisplayed
  var totalClicks = 0;
  for (var itemCounter = 0; itemCounter < Item.allItems.length; itemCounter++){
    if (Item.allItems[itemCounter].displayedAs === 'last') {
      Item.allItems[itemCounter].displayedAs = 'none';
      console.log('Item.allItems[itemCounter].displayedAs.slice(0,3) BEFORE LOOP = ' + Item.allItems[itemCounter].displayedAs.slice(0,3));
    } //else if (Item.allItems[itemCounter].displayedAs.slice(0,3) === 'img') {
    else if (Item.allItems[itemCounter].displayedAs !== 'none') {
      console.log(totalClicks);
      console.log('Item.allItems[itemCounter].displayedAs ' + Item.allItems[itemCounter].displayedAs);
      console.log('Item.allItems[itemCounter].displayedAs.slice(0,3) INSIDE LOOP = ' + Item.allItems[itemCounter].displayedAs.slice(0,3));
      Item.allItems[itemCounter].displayedAs = 'last';
    }
    totalClicks = totalClicks + Item.allItems[itemCounter].clickCount;
    totClicks=totalClicks;
  }
  for (var imageCounter = 0; imageCounter < allImages.length; imageCounter++) {
    if (totalClicks === 25) {
      console.log('totalClicks = 25? = ' + totalClicks);
      console.log('INSIDE LOOP ##################');
      endMouseclick();
      
      //img1.removeEventListener('click', chooseItem(event.target.id));
      //allImages[imageCounter].removeEventListener('click', function(){
      //  chooseItem(event.target.id);
      //});
    } else {
      displayNewItem(allImages[imageCounter]);
    }
  }
  if (totalClicks === 25) {
    console.log('END');
    displayResults();
  }
}

function displayResults(){
  for (var resultsCounter = 0; resultsCounter < Item.allItems.length; resultsCounter++) {
    var resultsText = document.createTextNode(`${Item.allItems[resultsCounter].clickCount} votes for ${Item.allItems[resultsCounter].displayName}`);
    var resultsNode = document.createElement('li');
    resultsNode.appendChild(resultsText);
    resultsList.appendChild(resultsNode);
  }
}

refreshItems();


