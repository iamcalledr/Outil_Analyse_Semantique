// =====================================================================================================================
//                                      Upload file
// =====================================================================================================================

function upload(fileInput){
    var form = new FormData();
    form.set('file', fileInput.files[0], fileInput.files[0].name);

    $.ajax({
      url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/files',
      type:'POST',

      dataType: 'json',
      enctype: 'application/json',
      autoUpload: true,
      processData: false,
      contentType: false,
      data: form,

      headers: {
        "Authentication-Token": token,
        //'Access-Control-Cross-Origin': 'Allow'
      },

      success: function(resultat){
        transcript();
      },
      error: function(resultat){
        console.log('Upload: Error')
      },
    });
}

// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================

function del(fileId){
    $.ajax({
        url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/processes/'+fileId,
        type:'DELETE',
    
        dataType: 'json',
        enctype: 'application/json',
        processData: false,
        contentType: false,
    
        headers: {
          "Authentication-Token": token,
        },
    
        success: function(resultat){
          console.log('Del: Success')

        },
        error: function(resultat){
          console.log('Del: Error \n id: '+fileId)
        },
      });
}

// =====================================================================================================================
//                                      Get Transcription File
// =====================================================================================================================

function loadDoc(fileId) {
  
    $.ajax({
      url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/files/'+ fileId +'/transcription',
      type:'GET',
  
      dataType: 'json',
      processData: false,
      contentType: false,
  
      headers: {
        "Authentication-Token": token,
      },
  
      success: function(resultat){
        console.log('loadDoc: Success')
        //wordList = xmlToTxt(resultat);
      },
      error: function(resultat){
        console.log('loadDoc: Error')
        console.log('http://lst-demo.univ-lemans.fr:8000/api/v1.1/files/'+ fileId +'/transcription')
      }
    }); 
  }