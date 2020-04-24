function przelicz(){
    //tylko tą funkcję wziąłem z neta :|
    function dgms(ms){
        days = Math.floor(ms / (24*60*60*1000));
        daysms=ms % (24*60*60*1000);
        hours = Math.floor((daysms)/(60*60*1000));
        hoursms=ms % (60*60*1000);
        minutes = Math.floor((hoursms)/(60*1000));
        minutesms=ms % (60*1000);
        sec = Math.floor((minutesms)/(1000));
        return days+" dni, "+hours+" godzin, "+minutes+" minut, "+sec+" sekund";
    }
    let godzina = document.getElementById("hour").value;
    let data = document.getElementById("date").value;
    let r = Number(data.substr(0, 4));
    let m = Number(data.substr(5, 2))-1;
    let d = Number(data.substr(8, 2));
    let g = Number(godzina.substr(0, 2));
    let mi = Number(godzina.substr(3, 2));
    let nowaData = Date.parse(new Date(r, m, d, g, mi));
    let roznica = nowaData-Date.now();
    let textOdliczanie = document.getElementById("textOdliczanie");
    if (roznica<0){
        textOdliczanie.innerHTML = "Wybierz datę z przyszłości!";
        return;
    }
    setInterval(function(roznica){
        roznica = nowaData-Date.now();
        textOdliczanie.innerHTML = dgms(roznica);
        if (roznica < 0){
            textOdliczanie.innerHTML = "KONIEC!";
            return;
        }
    },1000);
}

window.onload = function(){
    let przycisk = document.getElementById("startcountdown");
    przycisk.addEventListener("click", function(){
        przelicz();
    });
};
