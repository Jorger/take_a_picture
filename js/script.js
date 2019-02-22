$(function()
{
    //Para la captura de la foto del usuario...
    var opcFoto = {
						ejecuta 	: false,
						reproduce 	: false,
						video 		: $("#video")[0],
						canvas 		: $("#canvas")[0],
						width 		: 220,
						height 		: 180
				};
	//Guardará la foto que s eha tomando el usuario desde el navegador...
	var fotoUser = {img : "", tomada : false}
	navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    navigator.getMedia(
    {
        video: true,
        audio: false
    },

    function(fuente)//URL blog
    {
        if(navigator.mozGetUserMedia)
        {
            opcFoto.video.mozSrcObject = fuente;
        }
        else
        {
            // var URL = window.URL || window.webkitURL;
            opcFoto.video.src = window.HTMLMediaElement.srcObject(fuente);
        }
        opcFoto.video.play();
    },
    function(err)
    {
        console.log("El navegador no soporta getUserMedia");
    });

    opcFoto.video.addEventListener('canplay', function(ev)
    {
        if (!opcFoto.ejecutaVideo)
        {
            opcFoto.ejecutaVideo = true;
        }
    });

    $("#toma").click(function(event)
    {
        if(opcFoto.ejecutaVideo)
        {
            opcFoto.canvas.width = opcFoto.width;
            opcFoto.canvas.height = opcFoto.height;
            var c = opcFoto.canvas.getContext('2d');
            c.drawImage(opcFoto.video, 0, 0, opcFoto.width, opcFoto.height);
            fotoUser.img = opcFoto.canvas.toDataURL();
            fotoUser.tomada = true;
            $("#foto").hide().attr("src", fotoUser.img);
            $("#marco").show().css('margin-top', '-200px').animate({"marginTop": "+5px"}, 1000, function()
            {
                $("#foto").fadeIn('slow');
            });
        }
    });
    
    $("#guardar").click(function(event) {
        this.download =  "takeAPicture.png";
        this.href = opcFoto.canvas.toDataURL();
    });
});
