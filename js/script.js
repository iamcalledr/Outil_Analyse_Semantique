// =====================================================================================================================
//                                      Concernant le fichier audio et l'audio
// =====================================================================================================================

//var choiseFile = document.getElementById('input').files[0];

// =====================================================================================================================
//                                      Global
// =====================================================================================================================

var completMode = false;
var followMode = false;

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
            subtitles.scrollBy(0, 1);
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
            subtitles.scrollBy(0, 1);
    });
  });  
}

function CorrectionMode(){
  alert("CorrectionMode");
  //Textearea remplis grave au fichier txt, creer un pop up avec bouton sauvegarder et croix de fermeture
  //Voir travailler uniquement avec le fichier XML en testant la correction et la fichier de base grace à l'ID de chaque mot
}

// =====================================================================================================================
//                                      Concernat le fichier XML et les infos recuperées
// =====================================================================================================================

//Recuperation des attributs et la valeur d'une balise XML -> WORD

function newWord(word){
  var end = Number(word.getAttribute("stime"))+Number(word.getAttribute("dur"))
  return { "end": end.toString(),"start": word.getAttribute("stime"),"text": word.childNodes[0].nodeValue }
}

function getInfo(xmlDoc){
  var list = [];

  for (i = 0; i <xmlDoc.length; i++) {
    for(j = 0; j < xmlDoc[i].getElementsByTagName("Word").length; j++ ){
      syncData.push(newWord(xmlDoc[i].getElementsByTagName("Word")[j]));

    }
  }
}

//XMLFile
function xmlToTxt(xml) {
  var i, j;
  var xmlDoc = xml.responseXML;
  var wordList = []; //List with the totality of words
  var x = xmlDoc.getElementsByTagName("SpeechSegment");

  getInfo(x);
  //Function on objects
}

//Recuperation du fichier XML
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4){
      wordList = xmlToTxt(this);
    }
  };
  //xhttp.open("GET", "http://lst-demo.univ-lemans.fr:8000/api/v1.1/files/3912/transcription?auth_token=WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek&format=xml", true);
  xhttp.open("GET", "./xml/entretien_avec_alexandre_astier_bonus_chasseurs_de_monde.xml", true);
  xhttp.send();
}

// =====================================================================================================================
//                                      Concernat la transcription
// =====================================================================================================================

//var token = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
// exec('curl'+' http://lst-demo.univ-lemans.fr:8000/api/v1.1/files'+' -i -X POST -F file=' +file+' -F content=' +'{"start": true, "asr_model_name": "french.studio.fr_FR"}'+ '-H'+ 'Authentication-Token:'+ token,	

// Algo lancer transcription
// if button Ok send message and show progress
// while progress != 100 continue to show progress
// else show transritpion (loadDoc)
//function transcriptFile(choiceFile){
//  $.ajax({
//    method: "POST",
//    url: "http://lst-demo.univ-lemans.fr:8000/api/v1.1/files",
//    file: choiseFile,
//    content = 'string',
//    token: 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
//  }).done(function(msg) {
//    alert("Data: " +msg);
//  })
//}

function transcipt(){

  //setProgress();
  loadDoc();
}

// =====================================================================================================================
//                                      Curseur
// =====================================================================================================================
var audioPlayer = document.getElementById("audio");
var subtitles = document.getElementById("txt");
var element;

function createSubtitle(mode)
{
    for (var i = 0; i < syncData.length; i++) {
        element = document.createElement('span');
        element.setAttribute("id", "c_" + i);
        if(mode == "follow") element.style.opacity = 0; 
        element.innerText = syncData[i].text + " ";
        subtitles.appendChild(element);
    }
}

function deleteSubtitle(){
  for (var i = 0; i < syncData.length; i++) {
    subtitles.removeChild(document.getElementById("c_" + i));
  }
}

// =====================================================================================================================
//                                      Transcription Progress
// =====================================================================================================================

function getProgress(){

  return progress;
}

function setProgress(){
  
  do{
    var progress = getProgress();
    document.getElementById("currentProgress").innerHTML = progress;
  }while(progress != 100);

}
