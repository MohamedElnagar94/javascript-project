let leftCount = 0;
$(function() {
    setInterval(function() {
        leftCount -= 15;
        if (leftCount < -490) leftCount = window.innerWidth;
        // console.log(leftCount, window.innerWidth);
        $("#birds").css("left", leftCount + "px");
    }, 250); //birds

    /* Bomb Code */
    setInterval(function() {
        //Creation
        let img = $(
            `<img class="bomb" style="right:${Math.random() * 1000}px;">`
        );
        img.attr("src", "images/bomb.png");
        img.appendTo("body");

        img.on("click", function() {
            console.log("yes");
            img.attr("src", "images/bombAfter.png");
            img.addClass("bombAfter");
            setTimeout(function() {
                img.remove();
            }, 150);
        });
    }, 15000);

    setInterval(function() {
        //Move
        $(".bomb").css("top", "+=1px");
    }, 1); //bombs
}); //load
