$(function () {
  $.ajax({
    url: "../../common/data/tmp_data.json", // JSON 파일 경로
    method: "get",
    dataType: "json",
    success: function (data) {
      const $mainSection = $(".movie-list"); // 부모 컨테이너
      const movieList = data.movie; // 영화 리스트

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
    }
  });


  $('.tab-button.active').click(function(){
    
  });

  $(document).on('click', '.poster img', function () {
    const imgSrc = $(this).attr('src'); // 클릭된 이미지의 src 속성 가져오기
    window.location.href = "../../view/moviesdetail/detail.html";
  });
});
