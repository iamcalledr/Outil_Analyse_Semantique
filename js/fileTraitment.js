var audioPlayer = document.getElementById("audio");
var subtitles = document.getElementById("txt");
var element;


//Recuperation des attributs et la valeur d'une balise XML -> WORD
function newWord(word){
  var end = Number(word.getAttribute("stime"))+Number(word.getAttribute("dur"))
  return { "end": end.toString(),"start": word.getAttribute("stime"),"text": word.childNodes[0].nodeValue }
}

//Création de la liste contenant la totalité des mots du fichier
function getInfo(xmlDoc){
  var list = [];

  for (i = 0; i <xmlDoc.length; i++) {
    for(j = 0; j < xmlDoc[i].getElementsByTagName("Word").length; j++ ){
      syncData.push(newWord(xmlDoc[i].getElementsByTagName("Word")[j]));
    }
  }
}

//XML to Txt, récupéreation des données dans le fichier XML
function xmlToTxt(xml) {
  var i, j;
  var xmlDoc = xml.responseXML;
  var wordList = []; //List with the totality of words
  var x = xmlDoc.getElementsByTagName("SpeechSegment");

  getInfo(x);
}

//Ajout des élements de la liste dans le HTML de la page
// Pour le moment si on est dans le mode "follow", on passe les mot en opacité 0, puisque on les fait apparaitre par la suite en même temps que l'audio.
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

//Suppression des éléments ajouté dans le HTML de la page concernant les mots.
function deleteSubtitle(){
  for (var i = 0; i < syncData.length; i++) {
    subtitles.removeChild(document.getElementById("c_" + i));
  }
}

function createTextArea(){
  element = document.createElement('textarea');
  element.setAttribute("id", "correction");
  element.innerHTML = "BLABLABLABLBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBLLLLLLLLLLLLLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAAAAAAAAA"
  subtitles.appendChild(element);
}
//Suppression des éléments ajouté dans le HTML de la page concernant les mots.
function deleteTextArea(){
  subtitles.removeChild(document.getElementById("correction"));
}