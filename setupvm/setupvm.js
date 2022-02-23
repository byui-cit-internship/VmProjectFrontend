
// drowpdown number 1

window.addEventListener("DOMContentLoaded", function(){
var drowpdownNumb = document.getElementById('memoNumb');
for (var i = 1; i < 33; i++) {
    var theOption = document.createElement("option");
    theOption.text = i;
    theOption.value = i;
    // If it is the first option, make it be selected
    i === 0 ? theOption.selected = "selected" :  "";
    drowpdownNumb.options[i] = theOption;
  }
});

// drowpdown number 2


window.addEventListener("DOMContentLoaded", function(){
    var drowpdownNumb = document.getElementById('cpuNumb');
    for (var i = 1; i < 33; i++) {
        var theOption = document.createElement("option");
        theOption.text = i;
        theOption.value = i;
        // If it is the first option, make it be selected
        i === 0 ? theOption.selected = "selected" :  "";
        drowpdownNumb.options[i] = theOption;
      }
    });

//save button 