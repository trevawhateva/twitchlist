$(document).ready(function(){
  
  var streamers = ["freecodecamp", "OgamingSC2", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin", "comster404", "cretetion"];
  
  streamers.forEach(function(item){
    
    var name = item;
    
    $.getJSON('https://api.twitch.tv/kraken/streams/' + name + '?callback=?', function(data){
      
      var logo, link, game, display;
      var kitty = 'https://placekitten.com/g/200/300';
      //console.log(data);
      
     if(data.stream === null) {
       $.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?callback=?', function(response){
         console.log(response);
       display = response.name;
         if (response.logo != null) {
            logo = response.logo;
         } else {
            logo = kitty;
         }
         
       $('#holder').append("<div class='row'><div class='streamerOff'><div id='logo1' class='logo'><img src='" + logo + "' class='logo'></div><div id='name1' class='name'><h3><a href=''>" + display + "</a></h3></div><div id='status'><h3>Offline</h3></div></div></div>");
       });
       
     } else if (data.stream === undefined) {
       display = name;
       $('#holder').append("<div class='row'><div class='closed'><div id='logo1' class='logo'><img src='" + kitty + "' class='logo'></div><div id='name1' class='name'><h3><a href=''>" + display + "</a></h3></div><div id='status'><h3>Account Closed</h3></div></div></div>");
     } else {
       
       logo = data.stream.channel.logo;
       link = data.stream.channel.url;
       game = data.stream.game;
       display = data.stream.channel.display_name;
       $('#holder').append("<div class='row'><div class='streamerOn'><div id='logo1' class='logo'><div><img src='" + logo + "' class='logo'></div></div><div id='name1' class='name'><h3><a href='" + link +"'>" + display + "</a></h3></div><div id='status'><h3>" + game +"</h3></div></div></div>");
     }
   });           
  });
  
  $('#all').click(function(){
    $('.streamerOn').show();
    $('.streamerOff').show();
    $('.closed').show();
  });
  $('#online').click(function(){
    $('.streamerOn').show();
    $('.streamerOff').hide();
    $('.closed').hide();
  });
  $('#offline').click(function(){
    $('.streamerOn').hide();
    $('.streamerOff').show();
    $('.closed').show();
  });
  
});