
var token = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'

// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================
function deleteFile(){
  var fileInput = document.getElementById('fileupload');
  var fileFind = false;
  
  $.ajax({
    url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      for(var i=0; i<resultat.length; i++){
        if(fileInput.files[0].name == resultat[i].filename){
          del(resultat[i].id);
          fileFind = true;
        }
      }
      if(!fileFind){
        console.log('DelFile: Fichier Inexistant')
      }
    },
    error: function(resultat){
      console.log('DelFile: Error')
    },
  });
}

// =====================================================================================================================
//                                      Transcript File
// =====================================================================================================================
function transcript(){
  var fileInput = document.getElementById('fileupload');
  var fileFind = false;

  $.ajax({
    url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){

        for(var i=0; i<resultat.length; i++){
          if(fileInput.files[0].name == resultat[i].filename){
            loadDoc(resultat[i].id);
            console.log('Transcript: Id find')
            fileFind = true;
          }
        }
        if(!fileFind){
          //upload(fileInput)
          console.log('Transcript: Id don t find')
        }
    },
    error: function(resultat){
      console.log('Transcript: Error')
    },
  });
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


