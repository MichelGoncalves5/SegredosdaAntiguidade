const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = mostRecentScore +"%";

//for adding user name on form for modal
function saveName(input){
var input = document.getElementById('userInput').value;
nomeModal.textContent = input;
};

//for social media sharing

$('a.share').click(function(e){
  e.preventDefault();
  const $link   = $(this);
  const href    = $link.attr('href');
  const network = $link.attr('data-network');
  
  const networks = {
      facebook : { width : 600, height : 300 },
      twitter  : { width : 600, height : 254 },
      google   : { width : 515, height : 490 },
      linkedin : { width : 600, height : 473 }
  };
  
  const popup = function(network){
      var options = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,';
      window.open(href, '', options+'height='+networks[network].height+',width='+networks[network].width);
  }
  
  popup(network);
  });


 
  