var hasSeenNewest = true,
    animating = false,
    words = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\nOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.\nThese cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.\nBut in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.\nThe wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\nBut I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain.".split("\n");

function sample() {
    return words[parseInt(Math.random() * words.length)];
}

$("#user").click(function(e) {
    var show = !$(this).hasClass("dropped");
    if (show) $("#userdropdown").show().outerWidth();
    else setTimeout(function() {
        $("#userdropdown").hide();
    }, 300);
    $("#user, #userdropdown").toggleClass("dropped", show);
    e.preventDefault();
});

$(document).click(function(e) {
    if ($("#user").hasClass("dropped") && !$(e.target).is("#user") && !$(e.target).is("#userdropdown *")) $("#user").click();
}).keypress(function(e) {
    if (!$(e.target).is("input, textarea")) {
        if (e.which == 110 || e.which == 117) { // n or u
            $("#navigation .continue").click();
        } else if (e.which == 119 || e.which == 111) { // w or o
            $("#navigation .write").click();
        } else if (e.which == 106) { // j
            $("#navigation .jump").click();
        } else if (e.which == 115 || e.which == 105) { // s or i
            $("#actions .star").click();
        } else if (e.which == 102) { // f
            $("#actions .flag").click();
        } else if (e.which == 100) { // d
            $(".darktoggle").click();
        } else {
            return true;
        }
        return false;
    }
}).keyup(function(e) {
    if (!$(e.target).is("input, textarea")) {
        if (e.which == 80) { // p
            $("#navigation .jump").click();
            return false;
        }
    }
});

$(".darktoggle").click(function(e) {
    $("html").addClass("noanimate").outerWidth();
    $("html").toggleClass("darkmode").outerWidth();
    $("html").removeClass("noanimate");
    e.preventDefault();
});

$("#navigation .continue, #actions .continue").click(function() {
    if (!animating) {
        if (hasSeenNewest) {
            addNew(sample());
            hasSeenNewest = false;
            $(window).scroll();
        } else {
            $("html, body").stop().animate({
                scrollTop: $("#story .part").last().offset().top - 60
            }, 300, "swing");
        }
    }
});

$(window).scroll(function() {
    var win = $(window);
    if (!hasSeenNewest && win.scrollTop() + win.height() > $("#editor").offset().top + 60) hasSeenNewest = true;
});

function addNew(nextText) {
    $("#spacer").removeClass("animate").outerWidth();
    var piece = makePart(nextText),
        contentHeight = measureHeight(piece),
        spacerHeight = $("#spacer").height();
    $("#spacer").height(0).outerWidth();
    $("#spacer").addClass("animate").height(contentHeight);
    $("#currentinfo").addClass("fade");
    animating = true;
    setTimeout(function() {
        $("#spacer").removeClass("animate").height(0).outerWidth();
        $("#story").append(piece);
        $("#story .part").outerWidth();
        $("#story .part").removeClass("hidden");
        $("#currentinfo").removeClass("fade");
        animating = false;
    }, 350);
}

function makePart(nextText) {
    return $("<div>").addClass("hidden part").append(
        $("<div>").addClass("content").text(nextText)
    ).append(
        $("<div>").addClass("info").html('by <a href="#">username</a> ').append(
            $("<div>").addClass("right").html(
                /*'<a href="#" class="star">star</a> '+
                '<a href="#" class="comment">comment</a> '+
                '<a href="#" class="flag">flag</a> '+*/
                '<a href="#" class="rewind">rewind</a>'
            )
        )
    );
}

$("#navigation .jump, #actions .jump").click(function() {
    if (!animating) {
        var nextText = sample(),
            piece = makePart(nextText).removeClass("hidden").addClass("exitright"),
            contentHeight = measureHeight(piece),
            spacerHeight = $("#spacer").height(),
            targetWidth = $("#spacer").height($("#story .part").last().outerHeight()).outerWidth();
        var currHeight = $("#story .part").last().width(targetWidth).addClass("exitleft").outerHeight();
        $("#spacer").addClass("animate").outerWidth();
        $("#spacer").height(contentHeight).css("margin-top", -currHeight + "px");
        $("#currentinfo").addClass("fade");
        animating = true;
        setTimeout(function() {
            $("#story .part").last().replaceWith(piece).removeClass("exitleft");
            $("#spacer").removeClass("animate").outerWidth();
            $("#spacer").height(0).css("margin-top", "");
            $("#story .part").outerWidth();
            $("#story .part").removeClass("exitright");
            $("#currentinfo").removeClass("fade");
            animating = false;
        }, 350);
    }
});

$("#actions .star").click(function() {
    if ($(this).hasClass("starred")) {
        // unstar
    } else {
        // star
    }
    $(this).toggleClass("starred").find("i").toggleClass("fa-star-o fa-star");
});

function measureHeight(content) {
    var h = $("#tester").height("auto").html(content).outerHeight();
    $("#tester").html("").height(0).outerHeight();
    return h;
}

$("#navigation .write").click(function() {
    $("#editor textarea").focus().select();
});

$("#editor").submit(function() {
    //addNew($("textarea").val());
    //return false;
});

$("#editor textarea").on("keyup keydown change", function(e) {
    if (e.which == 27) $(this).blur();
    $("#editor").toggleClass("hastext", $(this).val().length > 0);
});

function modal(el, action) {
    if (action == "toggle") action = el.hasClass("modal") ? "close" : "open";
    if (action == "close") {
        el.addClass("hidden out");
        $("#cover").addClass("hidden");
        setTimeout(function() {
            el.removeClass("hidden modal out").hide();
            $("#cover").remove();
            $("html, body").css("overflow", "");
        }, 300);
    } else { // open
        el.addClass("hidden modal").show().outerWidth();
        $("body").append('<div id="cover" class="hidden">');
        el.removeClass("hidden").focus();
        $("#cover").click(function() {
            modal(el, "close");
        }).show().outerWidth();
        $("#cover").removeClass("hidden");
        $("body").css("overflow", "hidden");
        $("html").css("overflow-y", "scroll");
    }
}
