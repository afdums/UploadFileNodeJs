var fs = require('fs');
  
module.exports = function(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  var arquivo = req.files.file;

  console.log('arquivo', arquivo);
  

  if(arquivo === undefined){
    res.status(500).json({origin: 'arquivo',
                            error: 'Arquivo nao informado'});
      return;
  }

  var temporario = arquivo.path;
  var novo = './uploads/' + arquivo.name;

  console.log('Temporario:', temporario);  
  console.log('Arquivo:', novo);
  
 	fs.rename(temporario, novo, function(err){
 		if(err){
             console.log('err.code', err.code);
             
            if (err.code === 'EXDEV') {
                copy();
                return;
            }

            res.status(500).json({origin: 'rename',
                                      error: err});
            return;
         }
         res.json({message: "enviado com sucesso.", file: novo});
     });
     
     function copy() {
        var readStream = fs.createReadStream(temporario);
        var writeStream = fs.createWriteStream(novo);

        readStream.on('error', function(err){
            if(err){
                res.status(500).json({origin: 'readStream.on error',
                                    error: err});
                return;
            }
        });
        writeStream.on('error', function(err){
            if(err){
                res.status(500).json({origin: 'writeStream.on error',
                                    error: err});
                return;
            }
        });

        readStream.on('close', function () {
            fs.unlink(temporario, function(err) {
                if(err) {
                    res.status(500).json({origin: 'readStream.on close',
                                    error: err})
                    return;
                }
            });
        });

        readStream.pipe(writeStream);
        res.json({message: "enviado com sucesso.", file: novo});
    }


}