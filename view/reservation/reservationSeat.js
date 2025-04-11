$(function () {
  $.get("../nav/nav.html", function (data) {
    $("header").append(data);
  });

  $.get("resevationContainer.html", function (data) {
    $(".container").append(data);

    //create seat reservation page
    let html = "";
    for (let j = 0; j < 5; j++) {
      html += `<div><button class="btn-seat-row">${String.fromCharCode(
        j + 65
      )}</button>`;
      for (let i = 0; i < 10; i++) {
        html += `<button class="btn-seat" value="${
          String.fromCharCode(j + 65) + (i + 1)
        }">${i + 1}</button>`;
      }
    }
    html += `</div>`;
    $("#seat").append(html);

    let countNum = 0;
    $(".seat-select .seat-count .count-title").each(function () {
      $(this)
        .find(".count-button button")
        .click(function () {
          let totalPrice = 0;

          if ($(this).hasClass("up")) {
            if (countNum >= 8) {
              alert("최대 8명까지 선택 가능합니다.");
            } else {
              $(this)
                .prev()
                .text(parseInt($(this).prev().text()) + 1);
              countNum++;
            }
          } else if ($(this).hasClass("down")) {
            if (parseInt($(this).next().text()) > 0) {
              $(this)
                .next()
                .text(parseInt($(this).next().text()) - 1);
              countNum--;
            }
          }
          let html = "";
          $(".seat-select .seat-count .count-title").each(function () {
            totalPrice +=
              parseInt($(this).find(".count").text()) *
              parseInt($(this).find(".count").val());

            if ($(this).find(".count").val() == 12000) {
              if ($(this).find(".count").text() == 0) {
                return;
              }
              html += `성인 ${$(this).find(".count").text()} `;
            } else if ($(this).find(".count").val() == 11000) {
              if ($(this).find(".count").text() == 0) {
                return;
              }
              html += `청소년 ${$(this).find(".count").text()} `;
            } else if ($(this).find(".count").val() == 10000) {
              if ($(this).find(".count").text() == 0) {
                return;
              }
              html += `노약자 ${$(this).find(".count").text()} `;
            }
            $(".person-type").text(html);

            $(".total-price strong").text(totalPrice + "원");
          });
        });
    });
    // click event for seat button
    let selectedSeats = [];
    $(".btn-seat").click(function () {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        selectedSeats = selectedSeats.filter((seat) => seat !== this.value);
        $(this).css("background-image", "none");
        for (let index = 0; index < 8; index++) {
          document.querySelectorAll(".choice")[index].innerText = "-";
        }
      } else {
        if (selectedSeats.length >= countNum) {
          alert("선택된 좌석 수가 선택된 인원 수를 초과되었습니다.");
          return;
        }
        $(this).addClass("selected");
        selectedSeats.push(this.value);
        $(this).css(
          "background-image",
          "url(https://img.megabox.co.kr/static/pc/images/common/bg/bg-seat-condition-choice-s.png)"
        );
      }

      let lists = document.querySelectorAll(".choice");
      for (let index = 0; index < selectedSeats.length; index++) {
        lists[index].innerText = selectedSeats[index];
      }
    });

    $(".reset").click(function () {
      for (let index = 0; index < 8; index++) {
        document.querySelectorAll(".choice")[index].innerText = "-";
      }
      document.querySelector(".total-price strong").innerText = "0원";
      selectedSeats = [];

      countNum = 0;
      $(".btn-seat").removeClass("selected");
      $(".btn-seat").css("background-image", "none");
      for (let index = 0; index < 3; index++) {
        document.querySelectorAll(".seat-select .seat-count span .count")[
          index
        ].innerText = "0";
      }
      $(".person-type").text("");
    });

    //create selected-movie
    let movieNum = 0;
    $.get("../../common/data/tmp_data.json", function (data) {
      const urlParams = document.URL.substring(56).split("&");
      const movieId = urlParams[0].split("=")[1];
      const movieDate = urlParams[1].split("=")[1];
      const movieTime = urlParams[2].split("=")[1];
      movieNum = movieId;

      const $selectedMovie = $(".selected-movie");
      const movie = data.movie[movieNum];

      $selectedMovie.find(".age").text(parseInt(movie.grade));
      $selectedMovie.find(".tit").text(movie.name);
      $selectedMovie.find(".cate").text(movie.genre);
      $selectedMovie.find(".poster img").attr("src", movie.imgSrc);
      $(".date").text(movieDate);
      $(".time").text(movieTime);
    });

    $(".next").click(function () {
      if (selectedSeats.length == 0) {
        alert("좌석을 선택해주세요.");
        return;
      }
      if (countNum == 0) {
        alert("인원을 선택해주세요.");
        return;
      }
      if (selectedSeats.length != countNum) {
        alert("선택된 인원 수와 좌석 수가 일치하지 않습니다.");
        return;
      }
      const urlParams = document.URL.substring(56).split("&");
      const movieId = urlParams[0].split("=")[1];
      const movieDate = urlParams[1].split("=")[1];
      const movieTime = urlParams[2].split("=")[1];
      const seatUrl = "seats=" + selectedSeats.join(",");
      alert("결제가 완료되었습니다.");
      window.location.href =
        "../../view/reserv_result/reserv_result.html?movieId=" +
        movieId +
        "&date=" +
        movieDate +
        "&time=" +
        movieTime +
        "&" +
        seatUrl +
        "&";
    });
  });
});
