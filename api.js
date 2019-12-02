console.log("Hello Shirly");
var allCoins = [];


$(function () {
   
    var content= "My New Text";
   

    $('.panel-button').on('click',function(){
        var panelId= $(this).attr('data-panelid');
        $('#'+panelId).show().siblings().hide('slow');
        $('#'+panelId).html(content);
    });
    allCoins= getCurrencys();
});




function homePage(page_name) {
     $("#c1").append("<h1>${page_name}</h1>");
        
    alert("Loading");
    console.log("allCoins : " + allCoins);

    if (allCoins.length > 0) {
        createCards(allCoins);
    }

}

function createCards(cardData) {
    console.log("yes");
    var div_card=$("#card-wrapper");

    for (let i = 0; i < 90; i++) {
        var card = ("<div class='col-md-4 outer-card'></div>");

        var inner_card = $("<div class='card'></div>");

        var symbol = $(`<div class='title'>${cardData.symbol}</div>`);
        var name = $(`<div class='title'>${cardData.name}</div>`);

        $(inner_card).append(symbol).append(name);
        $(card).append(inner_card);
        div_card.append(card);
    }

}


function getCurrencys() {

    var coins = [];
    $.ajax({
        type: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/list',
        success: function (coins) {
            console.log(coins);

        }

    });

    return coins;
}

function printCurArray(array) {

    console.log("Array:" + array);
    for (let i = 0; i < 100; i++) {
        $.each(coins,
            function (index, coins) {
                console.log(coins[i]);

            });
    }
}

