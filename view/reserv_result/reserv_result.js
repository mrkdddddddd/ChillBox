$(function () {
  $.get("../nav/nav.html", function (data) {
    $("header").append(data);
  });
  $.get("reserv_result_container.html", function (data) {
    $(".container").append(data);

    $.get("../../common/data/tmp_data.json", function (data) {
      // const urlParams = document.URL.substring(56).split("&");
      // const movieId = urlParams[0].split("=")[1];
      // const movieDate = urlParams[1].split("=")[1];
      // const movieTime = urlParams[2].split("=")[1];
      // const selectedSeats = urlParams[3].split("=")[1].split(",");
      // const selectedSeatsNum = selectedSeats.length;
      // const movieNum = movieId;

      //localStorage에서 데이터 가져오기
      const movieId = JSON.parse(localStorage.getItem("record")).movieId;
      const movieDate = JSON.parse(localStorage.getItem("record")).movieDate;
      const movieTime = JSON.parse(localStorage.getItem("record")).movieTime;
      const selectedSeats = JSON.parse(
        localStorage.getItem("record")
      ).selectedSeats;
      const selectedSeatsNum = selectedSeats.length;
      const movieNum = movieId;

      const movie = data.movie[movieNum];

      $("#title").text(movie.name);
      $("#genre").text(movie.genre);
      $("#age").text(movie.grade);
      $("#date").text(movieDate);
      $("#time").text(movieTime);
      console.log(selectedSeats);
      $("#personNum").text(selectedSeatsNum);
      $("#seats").text(selectedSeats);
    });
    $(".comfirm").click(function () {
      window.location.href = "../../view/mainPage/main.html";
    });
  });
});
