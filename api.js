var allcoins = [];
var coins = [];
var default_page = "panel1";
var selected_coins = [];

$(function() {
  $(document).ajaxStart(function() {
    $("#loading").show();
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
  var selected_coins = null;
  
  let sitetitel = "Currency WebSite";
  var div_home = $("#cont1");
  var back_img = $(`<div class="parallax" id="back_img"></div>`);
  var page_titel = $(
    `<div class="img_titel"><span class="border">${sitetitel}</span> </div>`
  );
  div_home.append(back_img).append(page_titel);

  if (cardData.length == 0) {
    getCurrencys(cardData);
  }
  
}

function createCards(cardData) {
  // console.log("createCards");
  //console.log(cardData);
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

function createCard(coin) {
 // var card_id= coin.id;
  //console.log(card_id);
  var div_card = $("#card-wrapper");
  var card = $(
    `<div class='col-md-3 outer-card card' style="width: 18rem;" cardkey = ${coin.id} id=${coin.id}></div>`
  );
  //console.log(coin.id);

  var body = $('<div class="card-body"></div>');
  var first_row = $('<div class="row"></div>');

  var symbol = $(
    `<div class="card-title" style="width: 50%;"><h4> ${coin.symbol}<h4></div>`
  );
  
  var div_switch=$('<div class="myslider" style="width: 50%;"></div>');
  var label_switch=$('<label class="switch" ></label>');
  var input_switch =$('<input type="checkbox" key="${coin.id}" id="switchSlider" >');
  var span_switch=$('<span class="slider round"></span>');

  
  $('input').change(function(){
    if(this.checked==true ){
      addToSelected(this,coin.id,coin.symbol);
    }
  });

  $(label_switch).append(input_switch);
  $(label_switch).append(span_switch);

  $(div_switch).append(label_switch);
  

  var name = $(`<div class="card-text">${coin.name}</div>`);

  var infobtn = $(
    ` <button class="btn btn-primary collapsible"  id="info_btn">More Info</button>`
  );
  var infoWrapper = $(`<div class="content"></div>`);
  infobtn.on("click", function() {
    var time = Date.now();
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      console.log("hide");
    } else {
      content.style.display = "block";
      console.log("show");
      console.log(time);
      getInfoOnCoin(infoWrapper, coin.id, time);
    }
  });

  $(first_row)
    .append(symbol)
    .append(div_switch);
  $(body)
    .append(first_row)
    .append(name)
    .append(infobtn)
    .append(infoWrapper);
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
  console.log(array);
  console.log("startin to print array");
  for (let i = 0; i < 100; i++) {
    let coin = array[i];
  }
}

function getInfoOnCoin(infoWrapper, coinId, now) {
  $("#infoWrapper").html("");
  $.ajax({
    type: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
    success: function(infoCoin) {
      console.log(infoCoin);
      var coin_img = $(
        `<img src="${infoCoin.image.large}" id="coin_img" srcset="">`
      );
      var coin_vs_USD = $(
        `<div><label>USD: </label>${infoCoin.market_data.current_price.usd}"$" </div>`
      );
      var coin_vs_EUR = $(
        `<div><label>EUR: </label>${infoCoin.market_data.current_price.eur} </div>`
      );
      var coin_vs_ILS = $(
        `<div><label>ILS: </label>${infoCoin.market_data.current_price.ils} </div>`
      );

      infoWrapper
        .append(coin_img)
        .append(coin_vs_USD)
        .append(coin_vs_EUR)
        .append(coin_vs_ILS);
      var now = new Date();
      console.log(now.toUTCString());
    }
  });
}

function addToSelected(coin,coinid,coinsymbol){
  console.log(coin,coinid,coinsymbol);
}

/*function myfunc() {
    var checked_coin= $(this);
    console.log(this);
   alert(checked_coin);
    
 
}*/
/*  $(".card").on("change",'input',  function() {
    console.log(e.id);
    selected_coins.push(id);
    
  });
  //selected_coins.push(selcoin.id);
  //console.log(selected_coins);
}*/
