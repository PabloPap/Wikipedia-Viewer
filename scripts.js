function wikiLoad () {
    var userSearch = $("#searchbox").val();
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ userSearch + "&format=json&callback=wikiCallback";

    $("#wiki-list").text("");
    $("footer").text("");

    $.ajax({
        url: wikiUrl,
        dataType:"jsonp",
        //jsonp = "callback",
        success: function(response) {
            console.log(response);
            var articleList = response[1];
            var articleSummary = response[2];
            var articleLinks = response[3];

            for(var i = 0;i < articleList.length;i++) {

                if(articleSummary[i].length > 212 ) {
                    $("li").append("<h2><a href='" + articleLinks[i] + "'>" +  articleList[i] + "</a></h2><span class='firstpart'>" + articleSummary[i].substr(0,160) + "</span><span>...&nbsp;</span><span class='leftover'><span>" + articleSummary[i].substr(160,articleSummary[i].length - 1) + "</span>&nbsp;<button type='button' class='toggle-btn'>More</button></span>");
                }else{
                    $("li").append("<h2><a href='" + articleLinks[i] + "'>" + articleList[i] + "</a></h2><p class='preview'>" + articleSummary[i] + "</p>");
                }
            }
            $("footer").append("<hr class='footer-style'><br><br><br>");
            $(".toggle-btn").click(function() {
                if($(this).hasClass("less")) {
                    $(this).removeClass("less");
                    $(this).html("more");
                }else{
                    $(this).addClass("less");
                    $(this).html("less");
                }

                $(this).parent().prev().toggle();
                $(this).prev().toggle();

                return false;
            });
        }
    });

    return false;

}

$("#form-container").submit(wikiLoad);
