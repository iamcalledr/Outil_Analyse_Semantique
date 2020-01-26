// =====================================================================================================================
//                                      Concernant le fichier audio et l'audio
// =====================================================================================================================

//var choiseFile = document.getElementById('input').files[0];

// =====================================================================================================================
//                                      Global
// =====================================================================================================================

//Gestion des modes par booleen
//permet de savoir dans quel mode on se trouve au moment T
var completMode = false;
var followMode = false;
var correctionMode = false;

var syncData = [];


function CompletMode(){
  if(followMode == true) deleteSubtitle();

  completMode = true;
  followMode = false;

  document.getElementById("currentMode").innerHTML = "Mode Complet";

  createSubtitle("complet");
  audioPlayer.addEventListener("timeupdate", function(e){
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end ){
            subtitles.children[index].style.background = 'yellow';
            //subtitles.scrollBy(0, 1);
            if( index > 1){
              subtitles.children[(index-1)].style.background = 'white';
          }
        }

    });
  });
}

function FollowMode(){
  if(completMode == true) deleteSubtitle();

  completMode = false;
  followMode = true;
  
  document.getElementById("currentMode").innerHTML = "Mode Suivi";

  createSubtitle("follow");
  audioPlayer.addEventListener("timeupdate", function(e){
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end )
            subtitles.children[index].style.opacity = 1;
            //subtitles.scrollBy(0, 1);
    });
  });  
}

function CorrectionMode(){

  if(completMode == true || followMode == true) deleteSubtitle();
  if(correctionMode == true) deleteTextArea();

  correctionMode = true;

  createTextArea();

    //Textearea remplis grave au fichier txt, creer un pop up avec bouton sauvegarder et croix de fermeture
  //Voir travailler uniquement avec le fichier XML en testant la correction et la fichier de base grace à l'ID de chaque mot
}



// =====================================================================================================================
//                                      Concernat la transcription
// =====================================================================================================================


var fileInput = document.getElementById('fileupload');




function transcipt(){
  console.log(fileInput.files[0])

  var xhr = new XMLHttpRequest();
  var form = new FormData();
  form.append('name', fileInput.files[0]);

  xhr.open('POST', 'https://lst-demo.univ-lemans.fr:8000/api/v1.1/files', true);
  //xhr.open('GET', 'https://lst-demo.univ-lemans.fr:8000/api/v1.1/files');
  xhr.responseXML = 'json';
  xhr.setRequestHeader("Authentication-Token", token);
  xhr.setRequestHeader("Content-Type", "multipart/form-data");

  //xhr.setRequestHeader('File', form);
  //xhr.setRequestHeader("Start", "true");
  //xhr.setRequestHeader("asr_model_name", "french.studio.fr_FR");

  //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //xhr.setRequestHeader("Content", "{start: true, asr_model_name: french.studio.fr_FR}");

  xhr.onload = function(){
    console.log(xhr.responseText);
  };

  xhr.onerror = function(){
    console.log('Network Error');
  };

  xhr.onprogress = function(event){
    if(event.lengthComputable){
      var percentC = event.loaded / event.total * 100;
      document.getElementById("currentProgress").innerHTML = percentC + "%";
    } else {
      document.getElementById("currentProgress").innerHTML = "0%";
    }
  };

  xhr.send(form);

  //modifyAudio(form);
  
  //setProgress();
  loadDoc();
}

// =====================================================================================================================
//                                      Audio
// =====================================================================================================================

//Modify the current audio

function modifyAudio(file){
  document.getElementById('audio').src = file;

}



// =====================================================================================================================
//                                      Transcription Progress
// =====================================================================================================================

//function getProgress(){
//
//  return progress;
//}
//
////Risque de bug, liée au single-thread de javascript
//function setProgress(){
//  var progress;
//  do{
//    var progress = getProgress();
//    document.getElementById("currentProgress").innerHTML = progress + " %";
//  }while(progress != 100);
//
//}


