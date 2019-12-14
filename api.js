var allcoins = [];
var coins = [];
var default_page = "panel1";
var selected_coins=[];

$(function() {
  $( document ).ajaxStart(function() {
    $( "#loading" ).show();
  });
  $("[id*='panel']").hide();
  $("#" + default_page).show();
  homePage(allcoins);

  $(".panel-button").on("click", function() {
    var panelId = $(this).data("panelid");
    console.log("panelId: " + panelId);
    $("[id*='panel']").hide();
    $("#" + panelId).show();

    switch (panelId) {
      case "panel3":
        // code block
        alert("About!");
        break;
      case "panel2":
        // code block
        alert("Live!");
        livePage();
        break;
      default:
        // code block
        alert("Home!");
        homePage(allcoins);
    }
  });
});

function homePage(cardData) {
  let sitetitel="Currency WebSite";
  var div_home = $("#cont1");
  var back_img = $(`<div class="parallax" id="back_img"></div>`);
  var page_titel = $(`<div class="img_titel"><span class="border">${sitetitel}</span> </div>`);
  div_home.append(back_img).append(page_titel);

  if (cardData.length == 0) {
    getCurrencys(cardData);
  }
}

function createCards(cardData) {
  // console.log("createCards");
  console.log(cardData);  
  for (let i = 0; i < 90; i++) {
      createCard(cardData[i]);
  }
}

function getCurrencys(allcoins) {
  var coins = [];
  $(".cover").show();
  $.ajax({
    type: "GET",
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function(allcoins) {
     
      $(".cover").hide();
      if (allcoins.length > 0) {
        createCards(allcoins);
      }
    }
  });
}

function createCard(coin){
  var div_card = $("#card-wrapper");
  var card = $(
    `<div class='col-md-3 outer-card card' style="width: 18rem;" key = ${coin.id}></div>`
  );

  var body = $('<div class="card-body"></div>');
  var first_row = $('<div class="row"></div>');
  
  var symbol = $(
    `<div class="card-title" style="width: 50%;"><h4> ${coin.symbol}<h4></div>`
  );
  var card_switch = $(
    `<div class="myslider" style="width: 50%;"><label class="switch"><input type="checkbox" ><span class="slider round"></span></label></div>`
  );
  var name = $(`<div class="card-text">${coin.name}</div>`);
  var infobtn = $(` <button class="btn btn-primary" id="info_btn">More Info</button>`);
  infobtn.on('click',function(coin){
    info_coin={};
    $.ajax({
      type: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coin.name}`,
      success: function(info_coin) {
        console.log(info_coin);
        moreInfoCreate(info_coin);  
      }
    });    
  });

  $(first_row)
    .append(symbol)
    .append(card_switch);
  $(body)
    .append(first_row)
    .append(name)
    .append(infobtn);
  $(card).append(body);
  div_card.append(card);
}

function getCoin() {
  let searchcoin = {};
  let search = $("#search").val();
  if (search.length < 3) {
    alert("Search Phrase too Short...");
    return;
  }
  $.ajax({
    type: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${search}`,
    success: function(searchcoin) {
      console.log(searchcoin);
      $("#card-wrapper").html("");
      console.log(searchcoin);
      createCard(searchcoin); 
      
    }
  });
}

function printCurArray(array) {
  console.log( array);
  console.log("startin to print array");
  for (let i = 0; i < 100; i++) {
    let coin = array[i];
  }
}

function moreInfoCreate(coin) {
  var more_info_div= $(`<a href="#demo" data-toggle="collapse" style="text-align:center">Coin Info</a>`);
  var coin_info=$(`<div id="demo" class="collapse">${coin.name}</div>`);

  card.insertAfter(more_info_div).insertAfter(coin_info);
}

