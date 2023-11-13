//録音ボタンの切り替え
//画像を配列に格納する
var img = new Array();
				
img[0] = new Image();
img[0].src = "imageFile/REC/0.png";
img[1] = new Image();
img[1].src = "imageFile/REC/1.png";

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = false;
const xhr = new XMLHttpRequest();
var inText = "";
var num = 1;
var URL = "http://localhost:8000";

var cnt=0;

recognition.onresult = (event) => {
  // alert(event.results[0][0].transcript);
  // cnt=0;
  // document.getElementById("REC").src=img[cnt].src;
  console.log(event.results[0][0].transcript);
  console.log(event.results[0].isFinal);
  document.getElementById("sendMessage").value = event.results[0][0].transcript;
  if (event.results[0].isFinal) {
    cnt = 0;
    document.getElementById("REC").src=img[cnt].src;
    inText = event.results[0][0].transcript;
    // alert(event.results[0][0].transcript);
    document.getElementById("EnglishTab").value += "Me: " + event.results[0][0].transcript;
  }
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
  
  //画像を切り替える
  document.getElementById("REC").src=img[cnt].src;
}

// データの送信
function postData() {
  const data = {
    "sent":inText
  }
  console.log(URL+"/get?text="+encodeURIComponent(inText)+"&num="+num);
  xhr.open("POST", URL+"/get?text="+encodeURIComponent(inText)+"&num="+num, true);
   xhr.send();
  xhr.onload = function(e) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 ) {
        console.log(xhr.response)
        num++;
        console.log(num);
      }
      else {
        console.error(xhr.statusText);
      }
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
  setTimeout(() => {
    alert('Blueberryが情報を受け取りました');
  }, 2000);
}

