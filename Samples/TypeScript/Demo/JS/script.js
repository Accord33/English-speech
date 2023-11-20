//録音ボタンの切り替え
//画像を配列に格納する
var img = new Array();
				
img[0] = new Image();
img[0].src = "imageFile/REC/0.png";
img[1] = new Image();
img[1].src = "imageFile/REC/1.png";

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
const uttr = new SpeechSynthesisUtterance()
uttr.lang = "en-US"
uttr.rate = 0.5
uttr.pitch = 2
uttr.volume = 0.75
const xhr = new XMLHttpRequest();
var inText = "";
var num = 1;
var URL = "https://ict-lab.toyo-ushiku.jp/api";

var LevelEnglish = 4;

var cnt=0;

recognition.onresult = (event) => {
  // alert(event.results[0][0].transcript);
  // cnt=0;
  // document.getElementById("REC").src=img[cnt].src;
  // console.log(event.results[0][0].transcript);
  // console.log(event.results[0].isFinal);
  // document.getElementById("sendMessage").value = (inText + event.results[0][0].transcript);
  document.getElementById("sendMessage").value = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i][0].isFinal) {
      inText += event.results[i][0].transcript;
    }
    else {
      document.getElementById("sendMessage").value += event.results[i][0].transcript;
    }
  }
  // if (event.results[0].isFinal) {
  //   cnt = 0;
  //   document.getElementById("REC").src=img[cnt].src;
  //   document.getElementById("sendMessage").value += ".";
  // }
}

function changeIMG(){
  
  //画像番号を進める
  // if (cnt == 1)
  // { cnt=0;}
  if (cnt == 0)
  { cnt++; 
    // 録音スタート
    recognition.start();
  }
  else if (cnt == 1) {
    cnt = 0;
    recognition.stop();
    document.getElementById("REC").src=img[cnt].src;
}
  
  //画像を切り替える
  document.getElementById("REC").src=img[cnt].src;
}

// データの送信
function postData() {
  document.getElementById("EnglishTab").value += "Me: " + document.getElementById("sendMessage").value +"\n";
  var str = encodeURIComponent(document.getElementById("EnglishTab").value.replace(/\n/g, "<br>"));
  console.log(URL+"/?text="+str+"&num="+num+"&level="+LevelEnglish);
  xhr.open("GET", URL+"/?text="+str+"&num="+num+"&level="+LevelEnglish, true);
  xhr.send();
  $("#overlay").fadeIn(300);
  xhr.onload = function(e) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 ) {
        console.log(xhr.response)
        document.getElementById("EnglishTab").value += "Blueberry: " + xhr.response+"\n";
        uttr.text = xhr.response;
        speechSynthesis.speak(uttr)
        document.getElementById("sendMessage").value = "";
        num++;
      }
      else {
        console.error(xhr.statusText);
      }
      $("#overlay").fadeOut(300);
    }
  }
}

// xhr.onreadystatechange = function() {
//   if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
//     alert(xhr.responseText);
//   }
// }


// //タブの切り替え
// window.onload = function () {
//   var tabs = document.getElementById('tab-container').children;
//   var tabcontents = document.getElementById('tab-content').children;

//   var myFunction = function () {
//     var tabchange = this.tabindex;
//     for (var int = 0; int < tabcontents.length; int++) {
//       tabcontents[int].className = ' tabcontent';
//       tabs[int].className = ' tab';
//     }
//     tabcontents[tabchange].classList.add('tab-active');
//     this.classList.add('current-tab');
//   }

//   for (var index = 0; index < tabs.length; index++) {
//     tabs[index].tabindex = index;
//     tabs[index].addEventListener('click', myFunction, false);
//   }
// };


$(document).ready(function () {

  var countOption = $('.old-select option').size();

  function openSelect() {
    var heightSelect = $('.new-select').height();
    var j = 1;
    $('.new-select .new-option').each(function () {
      $(this).addClass('reveal');
      $(this).css({
        'box-shadow': '0 1px 1px rgba(0,0,0,0.1)',
        'left': '0',
        'right': '0',
        'top': j * (heightSelect + 1) + 'px'
      });
      j++;
    });
  }

  function closeSelect() {
    var i = 0;
    $('.new-select .new-option').each(function () {
      $(this).removeClass('reveal');
      if (i < countOption - 3) {
        $(this).css('top', 0);
        $(this).css('box-shadow', 'none');
      }
      else if (i === countOption - 3) {
        $(this).css('top', '3px');
      }
      else if (i === countOption - 2) {
        $(this).css({
          'top': '7px',
          'left': '2px',
          'right': '2px'
        });
      }
      else if (i === countOption - 1) {
        $(this).css({
          'top': '11px',
          'left': '4px',
          'right': '4px'
        });
      }
      i++;
    });
  }


  if ($('.old-select option[selected]').size() === 1) {
    $('.selection p span').html($('.old-select option[selected]').html());
  }
  else {
    $('.selection p span').html($('.old-select option:first-child').html());
  }

  $('.old-select option').each(function () {
    newValue = $(this).val();
    newHTML = $(this).html();
    $('.new-select').append('<div class="new-option" data-value="' + newValue + '"><p>' + newHTML + '</p></div>');
  });

  var reverseIndex = countOption;
  $('.new-select .new-option').each(function () {
    $(this).css('z-index', reverseIndex);
    reverseIndex = reverseIndex - 1;
  });

  closeSelect();


  // Ouverture / Fermeture
  $('.selection').click(function () {
    $(this).toggleClass('open');
    if ($(this).hasClass('open') === true) { openSelect(); }
    else { closeSelect(); }
  });


  // Selection 
  $('.new-option').click(function () {
    var newValue = $(this).data('value');

    // Selection New Select
    $('.selection p span').html($(this).find('p').html());
    $('.selection').click();

    // Selection Old Select
    $('.old-select option[selected]').removeAttr('selected');
    $('.old-select option[value="' + newValue + '"]').attr('selected', '');

  });
});

//Level送信
function clickEvent() {
  if (document.getElementById("gr3").checked) {
    LevelEnglish = 4;
  }
  else if (document.getElementById("grp2").checked) {
    LevelEnglish = 3;
  }
  else if (document.getElementById("gr2").checked) {
    LevelEnglish = 2;
  }
  else if (document.getElementById("grp1").checked) {
    LevelEnglish = 1;
  }
  else if (document.getElementById("gr1").checked) {
    LevelEnglish = 0;
  }
  alert("Level: " + LevelEnglish);
}


// jQuery(function($){
//   $(document).ajaxSend(function() {
//     $("#overlay").fadeIn(300);　
//   });
    
//   $('#send').click(function(){
//     $.ajax({
//       type: 'GET',
//       success: function(data){
//         console.log(data);
//       }
//     }).done(function() {
//       setTimeout(function(){
//         $("#overlay").fadeOut(300);
//       },500);
//     });
//   }); 
// });