$(function () {
  $.ajax({
    url: "../../common/data/tmp_data.json", // JSON 파일 경로
    method: "get",
    dataType: "json",
    success: function (data) {
      const $commentsSection = $(".comments-section"); // 댓글 섹션 컨테이너

      console.log(data.movie.length); // 리뷰 배열 출력
      $.each(data.movie, function (index, data) {
        console.log(data);
        const reviews = data.review; // 리뷰 배열
        for (let i = 0; i < reviews.length; i++) {
          const reviewCount = reviews[i];
          console.log(reviewCount.reviewInfo); // 각 리뷰 정보 출력
          const commentCard = `
            <div class="comment">                                                                  
                <p><strong>${reviewCount.id}</strong></p>                                
                <p>평점: ${reviewCount.score}</p>
                <p>관람평: ${reviewCount.reviewInfo}</p>                
            </div>            
          `;
          console.log(reviewCount.id);
          $commentsSection.append(commentCard);
        }
      });
    },
  });

  // $('.tab-button').click(function () {
  //   // 모든 탭 버튼에서 active 클래스 제거
  //   $('.tab-button').removeClass('active');
  //   // 클릭된 탭 버튼에 active 클래스 추가
  //   $(this).addClass('active');

  //   // 모든 섹션 숨기기
  //   $('.tab-content').hide();

  //   // 클릭된 탭 버튼에 따라 해당 섹션 표시
  //   const tabIndex = $(this).index(); // 클릭된 버튼의 인덱스 가져오기
  //   $('.tab-content').eq(tabIndex).show();

  // });
});

document.addEventListener("DOMContentLoaded", function () {
  const moreInfoButton = document.querySelector(".more-info-button");
  const hiddenText = document.querySelector(".hidden-text");

  moreInfoButton.addEventListener("click", function () {
    if (
      hiddenText.style.display === "none" ||
      hiddenText.style.display === ""
    ) {
      hiddenText.style.display = "block"; // 숨겨진 텍스트 표시
      moreInfoButton.textContent = "닫기"; // 버튼 텍스트 변경
    } else {
      hiddenText.style.display = "none"; // 숨겨진 텍스트 숨기기
      moreInfoButton.textContent = "더보기"; // 버튼 텍스트 변경
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const mainContent = document.querySelector(".main-info");
  const secondContent = document.querySelector(".chart-section");
  const thirdContent = document.querySelector(".comments-section");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // 모든 탭 버튼에서 active 클래스 제거
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // 클릭된 탭 버튼에 active 클래스 추가
      button.classList.add("active");

      // 본문 내용 변경
      if (index === 0) {
        // 주요정보 탭
        // mainContent.innerHTML = `
        // `;
      } else if (index === 1) {
        // 실관람평 탭
        mainContent.innerHTML = ``;
        secondContent.innerHTML = "";
      } else if (index === 2) {
        // 예고편
        mainContent.innerHTML = ` 
        <br>
        <br>
        <br>
        <h2>메인 예고편</h2>
        <br>
        <br>
          <video controls autoplay width="800" height="450">
            <source src="https://s3550.smartucc.kr/encodeFile/3550/2025/02/25/d6291ac122717ab4c973187167bb6a5e_W.mp4" type="video/mp4">
          </video>
        `;
        secondContent.innerHTML = "";
        thirdContent.innerHTML = "";
      }
    });
  });
});
