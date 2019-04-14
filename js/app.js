'use strict';

Item.allItems = [];


var totClicks;
totClicks=0;

//var pic1;
//var pic2;
//var pic3;

var resultsList = document.getElementById('results_list');

var allImages = [pic1, pic2, pic3];

function Item(name, path) {
  this.name = name;
  this.path = path;
  this.showCount = 0;
  this.clickCount = 0;
  this.displayedStatus = 'none';
  Item.allItems.push(this);
}

//push name and path data into Item

new Item('Bag','img/bag.jpg');
new Item('Banana', 'img/banana.jpg');
new Item('Bathroom', 'img/bathroom.jpg');
new Item('Boots', 'img/boots.jpg');
new Item('Breakfast', 'img/breakfast.jpg');
new Item('Bubble Gum', 'img/bubblegum.jpg');
new Item('Chair', 'img/chair.jpg');
new Item('Cthulhu','img/cthulhu.jpg');
new Item('Dog Duck','img/dog-duck.jpg');
new Item('Dragon','img/dragon.jpg');
new Item('Pen','img/pen.jpg');
new Item('Pet Sweep','img/pet-sweep.jpg');
new Item('Scissors','img/scissors.jpg');
new Item('Shark','img/shark.jpg');
new Item('Sweep','img/sweep.png');
new Item('Tauntaun','img/tauntaun.jpg');
new Item('Unicorn','img/unicorn.jpg');
new Item('USB','img/usb.gif');
new Item('Water Can','img/water-can.jpg');
new Item('Wine Glass','img/wine-glass.jpg');


document.getElementById('pic1').addEventListener('click', function(){
  chooseItem(event.target.id);
});
document.getElementById('pic2').addEventListener('click', function(){
  chooseItem(event.target.id);
});
document.getElementById('pic3').addEventListener('click', function(){
  chooseItem(event.target.id);
});


// event.target.id is the img# receved from user click, then it is sent through the chooseItem() function as var chosenItem
function chooseItem(chosenItem){

  for (var i = 0; i < Item.allItems.length; i++) {
    if (Item.allItems[i].displayedStatus === chosenItem) {
      //console.log('Item.allItems[i].displayedStatus = ' + Item.allItems[i].displayedStatus);
      //console.log('i = ' + i);
      Item.allItems[i].clickCount++;
      //console.log('Item.allItems[i].clickCount = ' + Item.allItems[i].clickCount);
      break;
    }
  }
  //prevents refreshItems from being called within chooseItem function which fixed looping problem after 25th click has been made where it continuously called showresults()
  if (totClicks !== 26) {
    refreshItems();
  }
}

function showNewItem(inImg){
  var display = false;
  while (display === false) {
    var randomPic = Math.floor(Math.random() * Item.allItems.length);
    if (Item.allItems[randomPic].displayedStatus === 'none') {
      display = true;
      Item.allItems[randomPic].displayedStatus = inImg.id;
      //how does javascript know inImg is an HTML object, where is .id and .src defined in Javascript??
      Item.allItems[randomPic].showCount++;
      inImg.src = Item.allItems[randomPic].path;
    }
  }
}

function refreshItems() {
  var totalClicks = 0;
  for (var j = 0; j < Item.allItems.length; j++){
    if (Item.allItems[j].displayedStatus === 'last') {
      Item.allItems[j].displayedStatus = 'none';
    }
    else if (Item.allItems[j].displayedStatus !== 'none') {
      Item.allItems[j].displayedStatus = 'last';
    }
    totalClicks = totalClicks + Item.allItems[j].clickCount;
    totClicks = totalClicks;
  }
  for (var k = 0; k < allImages.length; k++) {
    if (totalClicks === 25) {
      console.log('totalClicks = 25? = ' + totalClicks);
    } else {
      showNewItem(allImages[k]);
    }
  }
  if (totalClicks === 25) {
    totClicks++;
    showResults();
  }
}

function showResults(){
  for (var i = 0; i < Item.allItems.length; i++) {
    var resultsText = document.createTextNode(`${Item.allItems[i].clickCount} Vote(s) for ${Item.allItems[i].name}`);
    var resultsNode = document.createElement('li');
    resultsNode.appendChild(resultsText);
    resultsList.appendChild(resultsNode);
  }
}
refreshItems();

