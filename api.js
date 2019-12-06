var allcoins = [];
var coins = [];
var default_page = "panel1";


$(function() {
   
  $("[id*='panel']").hide();
  $("#" + default_page).show();
  homePage(allcoins);
    

  $(".panel-button").on("click", function() {
    var panelId = $(this).data("panelid");
    console.log("panelId: " +panelId)
    $("[id*='panel']").hide();
    $("#" + panelId).show();

    switch(panelId) {
      case 'panel3':
        // code block
        alert("About!");
        break;
      case 'panel2':
        // code block
        alert("Live!");
        break;
      default:
        // code block
        alert("Home!");
        homePage(allcoins);
    }

  });
  

});



function homePage(cardData) {
  var div_home=$('#cont1');
  var back_img = $(`<div class="parallax" id="back_img">`);
  var hr= $('<hr>');
  div_home.append(back_img).append(hr);

  if (cardData.length==0){
    var progresBar= $(
    `<div class="progress">
      <div class="progress-bar" style="width:70%">
    </div>
  </div>`);
    alert("Loading");
    
     getCurrencys(allcoins);
  }
 else{
  
   // createCards(allcoins);
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
    var card_switch = $(
    `<div class="myslider"><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label></div>`
     );
    var symbol = $(
      `<div class="card-title"><h4> ${cardData[i].symbol}<h4></div>`
    );
    var name = $(`<div class="card-text">${cardData[i].name}</div>`);
    var btn = $(` <button class="btn btn-primary">More Info</button>`);

    $(first_row)
      .append(symbol)
      .append(card_switch);
    $(body)
      .append(first_row)
      .append(name)
      .append(btn);
    $(card).append(body);
    div_card.append(card);
  }
}

function getCurrencys(allcoins) {
  var coins = [];
  $.ajax({
    type: "GET",
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function(allcoins) {
      //console.log("1" + coins);
      if (allcoins.length > 0) {
        allcoins = allcoins;
        createCards(allcoins);
      }
    }
  });
  //return allcoins;
}
function getCoin() {
  let searchcoin={};
  let search = $('#search').val();
  if (search.length < 3) {
      alert("Search Phrase too Short...");
      return;
  }
  $.ajax({
    type: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${search}`,
    success: function(searchcoin) {
      console.log( searchcoin);
      
    }
  });
 
}
function printCurArray(array) {
  console.log("Array:" + array);
  for (let i = 0; i < 100; i++) {
    $.each(coins, function(i, coins) {
      console.log(coins[i]);
    });
  }
}
