$(function () {
  let movieList = []; // 영화 데이터를 저장할 변수
  
  $.ajax({
    url: "../../common/data/tmp_data.json", // JSON 파일 경로
    method: "get",
    dataType: "json",
    success: function (data) {
      const $mainSection = $(".movie-list"); // 부모 컨테이너
      const movieList = data.movie; // 영화 리스트
      $mainSection.empty(); // 기존 영화 리스트 초기화

      
      $.each(movieList, function (index, moveArr) {
        const mInfo = `
          <div class="info">                                                                  
            <div class="poster">
              <img src="${moveArr.imgSrc}" alt="${moveArr.name}"><br>
            </div>
            <div class="details">
              <p>${moveArr.name}</p>
              <div class="inline-details">
                <p>예매율: ${moveArr.rate}</p>
                <p>개봉일: ${moveArr.date}</p>
              </div>                             
            </div>            
            <button>예매</button>                                  
          </div>            
        `;
        $mainSection.append(mInfo);
      });

      // 검색 버튼 클릭 이벤트
      $(".search-button").click(function () {
        const searchQuery = $(".search-input").val().toLowerCase(); // 검색어를 소문자로 변환
        const filteredMovies = movieList.filter(moveArr =>
          moveArr.name.toLowerCase().includes(searchQuery) // 영화 이름에 검색어가 포함된 경우 필터링
        );
        $mainSection.append(filteredMovies); // 필터링된 영화 목록 렌더링
      });

    }
  });

 

  
  $('.tab-button.active').click(function(){
    
  });

  $(document).on('click', '.poster img', function () {
    const imgSrc = $(this).attr('src'); // 클릭된 이미지의 src 속성 가져오기
    window.location.href = "../../view/moviesdetail/detail.html";
  });
});
