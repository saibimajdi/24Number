var numbers = [];
var deb;
var fin;
$(function(){
    init();
    shuffle(numbers)
    var counter = 0;

    $('.box').each(function(btn){
        
        $(this).fadeIn(2000).text(numbers[counter]);
        counter++;

    });
    var counter = 1;
    var started = false;
    $('.box').click(function(){
        if(started == false)
        {
            started = true;
            deb = new Date();
            timer();
            $('.timer-container').fadeIn(800);
        }
        if(parseInt($(this).text()) == counter){
            $(this).fadeOut(500);
            counter++;
            if(parseInt($(this).text()) == 24){
                $('.info-container').append($(this).text());
            }else{
                $('.info-container').append($(this).text() + ",");
            }
        }
        else{
            alert("FAILD!");
        }
        if(counter == 25){
            fin = new Date();
            var diff = Math.abs(fin.getTime() - deb.getTime()) / 1000;
            $('.result').text(diff + " seconds");
            $('.result-container').fadeIn(2000);
            timer.clearInterval(timer);
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