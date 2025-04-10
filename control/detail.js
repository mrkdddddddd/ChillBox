function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

$(function () {
  const selectedImgSrc = getQueryParam('imgSrc'); // URL에서 imgSrc 파라미터 가져오기

  if (selectedImgSrc) {
    $.ajax({
      url: "../../common/data/tmp_data.json", // JSON 파일 경로
      method: "get",
      dataType: "json",
      success: function (data) {
        // 선택된 영화 데이터 찾기
        const selectedMovie = data.movie.find(movie => movie.imgSrc === selectedImgSrc);

        if (selectedMovie) {
          // 포스터 이미지 설정
          $(".poster img").attr("src", selectedMovie.imgSrc);

          // 영화 제목 및 정보 출력
          $(".main-info").html(`
            <h1>${selectedMovie.name}</h1>
            <p>${selectedMovie.description}</p>
          `);

          // 리뷰 출력
          const $commentsSection = $(".comments-section");
          selectedMovie.review.forEach(review => {
            const commentCard = `
              <div class="comment">
                <p><strong>${review.id}</strong></p>
                <p>평점: ${review.score}</p>
                <p>관람평: ${review.reviewInfo}</p>
              </div>
            `;
            $commentsSection.append(commentCard);
          });
        } else {
          console.error("선택된 영화 데이터를 찾을 수 없습니다.");
        }
      },
      error: function (xhr, status, error) {
        console.error("AJAX 요청 실패:", error);
      }
    });
  } else {
    console.error("imgSrc 파라미터가 URL에 없습니다.");
  }
// $(function () {
//   $.ajax({
//     url: "../../common/data/tmp_data.json", // JSON 파일 경로
//     method: "get",
//     dataType: "json",      
//     success: function (data) { 
//       const $commentsSection = $(".comments-section"); // 댓글 섹션 컨테이너
//       const $mainInfo = $(".main-info"); // 메인 정보 섹션 컨테이너
            

//       $.each(data.movie, function (index, data) {
//         console.log(data);                
//         const reviews = data.review; // 리뷰 배열  
//         const infoTitles = data.infoTitle; // 영화 제목
        
//         for (let i = 0; i < reviews.length; i++) {
//           const reviewCount = reviews[i];           
//           console.log(reviewCount.reviewInfo); // 각 리뷰 정보 출력
//           const commentCard = `
//             <div class="comment">                                                                  
//                 <p><strong>${reviewCount.id}</strong></p>                                
//                 <p>평점: ${reviewCount.score}</p>
//                 <p>관람평: ${reviewCount.reviewInfo}</p>                
//             </div>            
//           `;      
          
//           $commentsSection.append(commentCard);            
//         };

//         for (let i = 0; i < infoTitles.length; i++) {
//           const infoCnt = infoTitles[i];                     
//           const inFo = `
//             <div class="main-info">                                                                  
//                 <p><strong>${infoCnt.infoTitle}</strong></p>                                
//                 <p>${infoCnt.info}</p>                              
//             </div>            
//           `;      
          
//           $mainInfo.append(inFo);            
//         };

        
//       });
//     }
// });


  $('.tab-button').click(function () {
    // 모든 탭 버튼에서 active 클래스 제거
    $('.tab-button').removeClass('active');
    // 클릭된 탭 버튼에 active 클래스 추가
    $(this).addClass('active');

    // 모든 섹션 숨기기
    $('.tab-content').hide();

    // 클릭된 탭 버튼에 따라 해당 섹션 표시
    const tabIndex = $(this).index(); // 클릭된 버튼의 인덱스 가져오기
    $('.tab-content').eq(tabIndex).show();

    // const data = fetch("../common/data/tmp_data.json")
    // .then(response => response.json())
    // .then(data => {
      
    //  console.log(data);
    // })
  });
});
