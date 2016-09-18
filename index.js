var numbers = [];
var deb;
var fin;
var soundOn = true;
var backgroundSound;
$(function(){
    backgroundSound = new Audio('background.mp3');
    backgroundSound.play();
    backgroundSound.loop = true;
    backgroundSound.volume = 0.5;

    init();
    shuffle(numbers)
    var counter = 0;

    $('.box').each(function(btn){
        
        $(this).text(numbers[counter]);
        counter++;

    });
    var counter = 1;
    var started = false;
    $('.box').click(function(){
        new Audio('click.wav').play();
        if(started == false)
        {
            started = true;
            deb = new Date();
            timer();
            $('.timer-container').fadeIn(800);
        }

        if(parseInt($(this).text()) == counter){
            $(this).fadeOut(200);
            $(this).removeClass('new');
            counter++;
            if(parseInt($(this).text()) == 24){
                $('.info-container').append("<span class='number-item' >" + $(this).text() + "</span>");
            }else{
                $('.info-container').append("<span class='number-item' >" + $(this).text() + "</span>" + ",");
            }
        }
        else{
            new Audio('error.mp3').play();
            $('.new').attr('background-color','red').fadeOut(500);
            $('.new').attr('background-color','orange').fadeIn(500);
        }
        if(counter == 25){
            new Audio('Congratulations.mp3').play();
            new Audio('clap.mp3').play();
            fin = new Date();
            var diff = Math.abs(fin.getTime() - deb.getTime()) / 1000;
            $('.result').text(diff + " seconds");
            $('.result-container').fadeIn(2000);
            $('.timer-container').fadeOut('2000');
        }
    });

    // Sound button click
    $('.sound-stop').click(function(){
        if(soundOn == true){
            backgroundSound.pause();
            $(this).text("TURN ON SOUND");
            soundOn = false;
        }else{
            backgroundSound.play();
            $(this).text("TURN OFF SOUND");
            soundOn = true;
        }
    });
});


function init(){
    for(var i=0; i< 24; ++i)
    {
        numbers[i] = i+1;
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var timer = function startTimer(){
    setInterval(function(){
        var t = Math.abs(deb.getTime() - new Date().getTime());
        var m = parseInt((t/1000)/60);
        var s = parseInt(t/1000);
        $('.timer-container').text(pad(m,2) + ":" + pad(s%60,2));
    },1000);
}

function pad(a,b){return(1e15+a+"").slice(-b)}