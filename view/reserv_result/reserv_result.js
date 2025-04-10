$(function () {
  $.get("../nav/nav.html", function (data) {
    $("header").append(data);
  });
});
$.get("reserv_result_container.html", function (data) {
  $(".container").append(data);
});
