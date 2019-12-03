var allcoins = [];
var coins = [];

$(function() {
  allcoins = getCurrencys();
  console.log("allCoins : " + allcoins);

  var content = "My New Text";
  $("#c1").show().siblings().hide("slow");
  if ($("#c1") && allcoins > 0) {
    homePage(allcoins);
  }
});

function loadHomePage(){
    $('.nav-link').addEventListner.on('click',function(id){
        alert(id);
    })
    var back_img= $('<img src="./media/DSC_0915c.jpg"/>');
}
function homePage(cardData) {
   
    $('#cont1').append(back_img);
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
    var card = $(
      `<div class='col-md-4 outer-card card' style="width: 18rem;" key = ${cardData[i].id}></div>`
    );

    var body = $('<div class="card-body"></div>');
    var first_row = $('<div class="row"></div>');
    var card_switch = $(`<label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>`);
    var symbol = $(
      `<div class="card-title"><h4> ${cardData[i].symbol}<h4></div>`
    );
    var name = $(`<div class="card-text">${cardData[i].name}</div>`);
    var btn = $(` <button class="btn btn-primary">More Info</button>`);

    $(first_row).append(symbol).append(card_switch);
    $(body)
      .append(first_row)
      .append(name)
      .append(btn);
    $(card).append(body);
    div_card.append(card);
  }
}

function getCurrencys() {
  var coins = [];
  $.ajax({
    type: "GET",
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function(coins) {
      console.log("1" + coins);
      if (coins.length > 0) {
        allcoins = coins;
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
