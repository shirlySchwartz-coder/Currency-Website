var allcoins = [];
var coins = [];

$(function() {
  allcoins = getCurrencys();
  console.log("allCoins : " + allcoins);

  var content = "My New Text";
  $("#c1").show().siblings().hide("slow");
  if ($("#c1")&& allcoins>0) {
    homePage(allcoins);
  }
});

function homePage(cardData) {
  $("#card-wrapper").append(`<div>"Some appended text."</div>`);

  alert("Loading");
  //console.log("allCoins : " + allCoins);

  if (allCoins.length > 0) {
    createCards(allCoins);
  }
}

function createCards(cardData) {
   // console.log("createCards");
  console.log(cardData);
  var div_card = $("#card-wrapper");
  for (let i = 0; i < 90; i++) {
    var card = $(`<div class='col-md-4 outer-card' key = ${cardData[i].id}></div>`);

    var inner_card = $("<div class='card'></div>");
    var id = $(`<div class='title'> <strong>ID: </strong>${cardData[i].id}</div>`);
    var symbol = $(`<div class='title'><strong>Symbol: </strong>${cardData[i].symbol}</div>`);
    var name = $(`<div class='title'><strong>Name: </strong>${cardData[i].name}</div>`);

    $(inner_card).append(id).append(symbol).append(name);
    $(card).append(inner_card);
    div_card.append(card);
  }
}

function getCurrencys() {
  var coins = [];
  $.ajax({
    type: "GET",
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function(coins) {
      console.log('1'+coins);
      if (coins.length > 0) {
        allcoins = coins ;
        createCards(allcoins);
      }
    }
  });
  //return allcoins;
}

function printCurArray(array) {
  console.log("Array:" + array);
  for (let i = 0; i < 100; i++) {
    $.each(coins, function(i, coins) {
      console.log(coins[i]);
    });
  }
}
