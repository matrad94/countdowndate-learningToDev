document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

var t = 0;

function dhms(ms){
    days = Math.floor(ms / (24*60*60*1000));
    daysms=ms % (24*60*60*1000);
    hours = Math.floor((daysms)/(60*60*1000));
    hoursms=ms % (60*60*1000);
    minutes = Math.floor((hoursms)/(60*1000));
    minutesms=ms % (60*1000);
    sec = Math.floor((minutesms)/(1000));
    return days+" dni, "+hours+" godzin, "+minutes+" minut, "+sec+" sekund";
}

function NewCountdown(date, tag, id){
    this.id = id;
    this.date = date;
    this.tag = tag;
    this.dif = date - Date.now();
    let div = document.createElement("div");
    div.setAttribute("class", "counter " + id + " card-panel hoverable blue lighten-5 center-align");
    this.holder = document.getElementById("holder");
    let h3 = document.createElement("h3");
    let text = document.createElement("p");
    let close = document.createElement("a");
    close.setAttribute(`class`, "btn-floating btn-large waves-effect waves-light red");
    close.innerHTML = `<i class="material-icons">close</i>`;
    close.addEventListener('click', function(){div.parentNode.removeChild(div);});
    this.div = div;
    this.appendValues = function(){
        text.innerHTML = "Pozostało: "+ dhms(this.dif);
        h3.innerHTML = tag;
    }
    this.addDiv = function(){
        div.appendChild(h3);
        div.appendChild(text);
        div.appendChild(close);
        holder.appendChild(div);
        return div;
    }
    this.contdown = function() {
        var div = this.addDiv();
        this.appendValues();
        var date = this.date;
        setInterval(function () {
            this.dif = date - Date.now();
            text.innerHTML = "Pozostało: "+ dhms(this.dif);
            if (dif < 0) {
                div.innerHTML = "<h2>KONIEC!</h2>";
                return;
            }
        }, 1000);
    };
}

function getDesireableDate(){
    let hourTo = document.getElementById("hour").value;
    let dateTo = document.getElementById("date").value;
    let r = Number(dateTo.substr(0, 4));
    let m = Number(dateTo.substr(5, 2))-1;
    let d = Number(dateTo.substr(8, 2));
    let g = Number(hourTo.substr(0, 2));
    let mi = Number(hourTo.substr(3, 2));
    let dateToCount = Date.parse(new Date(r, m, d, g, mi));
    let msg = document.getElementById("msg");
    let dif = dateToCount-Date.now();
    if (dif<0){
        msg.innerHTML = "Wybierz datę z przyszłości!";
        return;
    }
    else
    msg.innerHTML = ""; 
    return dateToCount;
}
function getTag(){
    return document.getElementById("tag").value;
}

window.onload = function(){
    let button = document.getElementById("startcountdown");
    var i = new Array;
    button.addEventListener("click", function(e){
        e.preventDefault();
        if (getDesireableDate() !== undefined){
        i[t] = new NewCountdown(getDesireableDate(), getTag(), t);
        i[t].contdown();
        t++;
        } 
    });
};



