//Gestion des modes par booleen
//permet de savoir dans quel mode on se trouve au moment T
var completMode = false;
var followMode = false;
var correctionMode = false;

var syncData = [];
var fileTranscript = false;


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
  document.getElementById("currentMode").innerHTML = "Mode Correction";

  createTextArea();

    //Textearea remplis grave au fichier txt, creer un pop up avec bouton sauvegarder et croix de fermeture
  //Voir travailler uniquement avec le fichier XML en testant la correction et la fichier de base grace à l'ID de chaque mot
}