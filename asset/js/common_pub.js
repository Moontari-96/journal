$(document).ready(function(){

	var isOpen = 'is_open',
		isActive = 'is_active';

	/* ---------------------- 메인 ---------------------- */
    /* 메인-스와이퍼-신간도서 ---------------------------------------- */
    var newBook = new Swiper('.new_book .swiper-container', {
		slidesPerView : 4,
		spaceBetween: 0,
		//loop : true,
		speed: 400,
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
			enabled: true,
		},
		breakpoints: {
			320: { // >= 320px
				slidesPerView: 3.2,
			},
			640: { // >= 640px
				slidesPerView: 3.5,
			},
			750: { // >= 750px
				slidesPerView: 1.6,
			},
			920: { // >= 920px
				slidesPerView: 2.5,
			},
			1024: { // >= 1024px
				slidesPerView: 3.5,
			},
			1250: { // >= 1250px
				slidesPerView: 4,
			},
		},
	});

    /* 메인-스와이퍼-베스트도서 ---------------------------------------- */
	var noticeSwiper = undefined;
	var bestBook = function(){
		if($('.best_book .swiper-container').length){
			if($(window).outerWidth() >= 750 && noticeSwiper != undefined){
				noticeSwiper.destroy();
				noticeSwiper = undefined;
			}else if($(window).outerWidth() < 750 && noticeSwiper == undefined){			
				noticeSwiper = new Swiper('.best_book .swiper-container', {
					speed: 400,
					spaceBetween: 0,
					slidesPerView: 1.5,
					breakpoints: {
						320: { // >= 320px
							slidesPerView: 2.4,
						},
						480: { // >= 480px
							slidesPerView: 3.5,
						},
						640: { // >= 640px
							slidesPerView: 3.5,
						},
					}
				});
			}
		}
	}
	
	/* 공통-스와이퍼-공지사항 ---------------------------------------- */
	var noticeCon = new Swiper('.notice_con .swiper-container', {
		slidesPerView : 1,
		spaceBetween: 0,
		//autoplay: true,
		speed: 400,
		direction: 'vertical',
		navigation: {
			nextEl: '.notice_con .swiper-indicator .swiper-button-next',
			prevEl: '.notice_con .swiper-indicator .swiper-button-prev',
		},
	});

	/* ---------------------- 공통 ---------------------- */
	/* 헤더영역 ---------------------------------------- */
	var dim = false;//딤 boolean
	function header_Sticky(){
		if(dim === false){
			if($(window).outerWidth() > 1024){	
				if($(window).scrollTop() > ($('.gnb').scrollTop() + $('.header').outerHeight())){
					$('.header_area').addClass('h_sticky');
					$('.body_area').css('padding-top', $('.gnb').outerHeight())
					$('.header_area.h_sticky .header .logo').css(
						'left', 
						$('.header_area.h_sticky .btn_category').offset().left
						 + $('.header_area.h_sticky .btn_category').outerHeight() + 14);
				}else{
					$('.header_area').removeClass('h_sticky');
					$('.body_area').css('padding-top', '');
					$('.header_area.h_sticky .header .logo').css('left','');
				}
			}else{
				if($(window).scrollTop() > ($('.gnb').scrollTop() + $('.header').outerHeight())){
					$('.header_area').addClass('h_sticky');
					$('.body_area').css('padding-top', $('.gnb').outerHeight())
				}else{
					$('.header_area').removeClass('h_sticky');
					$('.body_area').css('padding-top', '')
				}
			}
		}		
	}

	/* 푸터영역 ---------------------------------------- */
	var footerArea_Fixed = function(){
		thumbnail_Fixed();
		// $('.wrapper').css('padding-bottom', $('.footer_area').outerHeight());
	}

	/* gnb ---------------------------------------- */
	$('.btn_category').on('click',function(){
		$(this).parent('li').toggleClass(isOpen);
		$(this).parent('li').find('.total_dep_02 > li').removeClass(isOpen);
		$(this).closest('.wrapper').toggleClass('is_gnb').toggleClass('dim');
		if($(window).outerWidth() > 1024){
			$(this).parent('li').find('.total_dep_02 > li:first-child').addClass(isOpen);
		}else{
			$(this).parent('li').find('.total_dep_02 > li').removeClass(isOpen);
			if($(this).closest('.wrapper').hasClass('is_gnb') === true){
				//console.log('팝업 열림');				
				disabledScroll();
			}else{
				// console.log('팝업 닫힘');
				abledScroll();
			}
		}

		if($('.wrapper').hasClass('is_gnb') === true){
			dim = true;
		}else{
			dim = false;
		}
	});
	$('.total_dep_02 > li > a').on('click',function(){
		if($(window).outerWidth() > 1024){
			$(this).closest('li').siblings().removeClass(isOpen);
			$(this).closest('li').addClass(isOpen);
		}else{
			$(this).parent('li').siblings().removeClass(isOpen);
			$(this).parent('li').siblings().find('ul').slideUp(400);
			$(this).parent('li').toggleClass(isOpen);
			if($(this).parent('li').hasClass(isOpen) === true){
				$(this).siblings('ul').stop().slideDown(400);
				console.log('aaa');
			}else{
				$(this).siblings('ul').stop().slideUp(400);
				console.log('bbb');
			}
		}
	});
	// gnb 반응형
	var total_dep_02 = function(){
		if($('.total_dep_03').length){
			$('.total_dep_03').css({'height':'','display':'','padding-top':'','margin-top':'','padding-bottom':'','margin-bottom':''});
				if($(window).outerWidth() > 1024){
					dim = false;
				abledScroll();
			}else{
				if($('.total_dep_02 > li').hasClass(isOpen) === true){
					dim = true;
					disabledScroll();
					$('.total_dep_02 > li.is_open > ul').stop().slideDown(400);
				}
			}
		}
	}
	
	/* search ---------------------------------------- */
	$('.mob_btn_area > [class*="mob_btn"]').on('click',function(){
		if($(window).outerWidth() < 1024){
			$(this).toggleClass(isOpen);
			$(this).siblings().toggleClass(isOpen);
		}
		
		if(!($(this).hasClass('mob_btn_close') === true)){
			$(this).closest('.mob_btn_area').addClass(isOpen);
		}else{
			$(this).closest('.mob_btn_area').removeClass(isOpen);
		}
		
		if(($(this).closest('.mob_search_area').hasClass(isOpen) === true)){
			$(this).closest('.wrapper').addClass('is_search');
		}else{
			$(this).closest('.wrapper').removeClass('is_search');			
		}
	});

	/* snb_area ---------------------------------------- */
    var snbArea = function(){
		$('.snb_area .dep_01 > li .dep_02 > li').each(function(){
			if($(this).find('ul').length){
				$(this).addClass('arrow');
			}				
		});

		$('.snb_area ul.dep_02 > li > a').on('click', function(){
			if($('.snb_area ul.dep_02 > li').hasClass('arrow') === true){
				if(!($(this).closest('li').hasClass(isOpen)) && !($(this).closest('li').hasClass(isActive))){
					$('.snb_area ul.dep_02 li').removeClass(isOpen).removeClass(isActive);
					$('.snb_area .dep_03').stop().slideUp();
					$(this).closest('li').addClass(isOpen);
					$(this).siblings('.dep_03').stop().slideDown();
				} else{
					$(this).closest('li').removeClass(isOpen).removeClass(isActive);
					$(this).siblings('.dep_03').stop().slideUp();
				}
			}else{
				$('.snb_area ul.dep_02 li').removeClass(isOpen).removeClass(isActive);
				$('.snb_area .dep_03').stop().slideUp();
				$(this).closest('li').addClass(isOpen);
			}
			
		});
	}

	/* 퀵메뉴영역 ---------------------------------------- */
	// 상단으로 가는 버튼
    $('.quick_box > li .btn_cir.btn_gotop').on('click', function(e){
		e.preventDefault();
		$(window).scrollTop(0);
    })

	// 퀵메뉴 show/hide
	var quicAarea_Show = function quicAarea_Show(){
		if($(window).scrollTop() > 100){
			$('.quick_area').addClass(isOpen);
		}else{
			$('.quick_area').removeClass(isOpen);
		}
	}

	// 퀵메뉴 하단 고정
	var quicAarea_Sticky  = function(){
		var docH = $(document).outerHeight(), // 문서전체높이
			scrollPos = $('html, body').scrollTop() || $(window).scrollTop(),// 문서 전체 높이 중 스크롤 위치
			winH = $(window).outerHeight(),// 창높이
			footerH = $('.footer_area').outerHeight(),
			btnTopH = $('.quick_area .quick_box').outerHeight();
			
		var gap = 0;
		var bottom = 0;
		gap = docH - footerH - winH - (btnTopH); 
		bottom = scrollPos - gap - 80;
		/*console.log("1. scrollPos:"+ scrollPos,'\n',
					"2. docH:"+ docH,'\n',
					"3. winH:"+ winH,'\n',
					"4. footerH:"+ footerH,'\n',
					"5. btnTopH:"+ btnTopH,'\n',
					"6. gap:"+ gap)*/
		
		if(dim === false){
			if(scrollPos > (gap + 60)){
				$('.quick_area').css('bottom', bottom + 'px');
			} else{
				$('.quick_area').css('bottom', 20 + '%');
			}

			if($(window).outerWidth() < 750){
				$('.quick_area').removeClass('act_bottom');
			}else{
				if(bottom >= footerH){ // 스크롤 마지막 일때
					$('.quick_area').addClass('act_bottom');
				}else{
					$('.quick_area').removeClass('act_bottom');
				}
			}
		}

		
		
	}

	/* 팝업 스크롤 ---------------------------------------- */
	if($('.pop_area').length){
		if($('.pop_area').hasClass(isOpen) === true){ // ready 시 팝업 열려있는 상태
			//console.log('팝업 닫힘');
			abledScroll();
			
		}else{ // ready 시 팝업 닫혀있는 상태
			var focusTmp = undefined;
			var bodyScrollTop = 0;

			$('[data-popup]').on('click', function(e){
				if($(this).hasClass('btn_history') === true){
					if($(this).siblings('.pop_area').hasClass('is_open') === true){// 퀵메뉴영역 재클릭시
						$(this).siblings('.pop_area').removeClass(isOpen);
						$(this).closest('.wrapper').removeClass('pop_open').removeClass('dim');
						$(this).closest('.quick_history').removeClass(isOpen);
						dim = false;
						// console.log('팝업 닫힘');
						abledScroll();
					}else{
						var popBtnName = $(this).data('popup');
						var popBtnCon = $('[data-popup-con="' + popBtnName + '"]');
						popBtnCon.addClass('is_open');
						$(this).closest('.wrapper').addClass('pop_open').addClass('dim');
						$(this).closest('.quick_history').addClass(isOpen);
						dim = true;
						focusTmp = $(this);

						//console.log('팝업 열림');				
						disabledScroll();
					}
				}else{
					var popBtnName = $(this).data('popup');
					var popBtnCon = $('[data-popup-con="' + popBtnName + '"]');
					popBtnCon.addClass('is_open');
					$(this).closest('.wrapper').addClass('pop_open').addClass('dim');
					dim = true;
					focusTmp = $(this);

					//console.log('팝업 열림');				
					disabledScroll();
				}				
				
			});
		}
	};

	var initScroll = function(){
		$('body').css({
			'position':'',
			'overflow':'hidden',
			'top':'',
			'left':'',
			'right':'',
		});
	}
	var disabledScroll = function(){
		bodyScrollTop = $(window).scrollTop();
		$('body').css({
			'position':'fixed',
			'overflow-y':'scroll',
			'top': -bodyScrollTop + 'px' ,
			'left':'0px',
			'right':'0px',
		})
	}
	var abledScroll = function(){
		$('body').css({
			'position':'',
			'overflow':'visible',
			'top':'',
			'left':'',
			'right':'',
		});
		$(window).scrollTop(bodyScrollTop)
	}

	$(document).on('click','.pop_close', function(){
		$(this).closest('.pop_area').removeClass(isOpen);
		$(this).closest('.wrapper').removeClass('pop_open').removeClass('dim');
		dim = false;
		// console.log('팝업 닫힘');
		abledScroll();
	});

	/* ---------------------- 서브 ---------------------- */
	/* breadcrumbs pc용  ---------------------------------------- */
	$(document).on('click','.breadcrumbs .location > li > a', function(){
		$(this).closest('li').toggleClass(isOpen);
		$(this).closest('li').siblings('li').removeClass(isOpen);
		$(this).closest('li').siblings('li').find('.depth_box').stop().fadeOut(200);
		if($(this).closest('li').hasClass(isOpen)){
			$(this).siblings('.depth_box').stop().fadeIn(200);
		}else{
			$(this).siblings('.depth_box').stop().fadeOut(200);
		}
	});
	
	/* 썸네일 뷰 ---------------------------------------- */
	var thumbnail_Fixed = function(){
		if($('.cart_wrapper').length){
			$('.footer_area').css('padding-bottom',$('.cart_wrapper').outerHeight())
		}else{
			$('.footer_area').css('padding-bottom','')
		}
	}
	
	/* 인풋 이미지/리스트 탭 ---------------------------------------- */
	$('.tab_list').find('a').on('click', function(e){
		e.preventDefault();

		var target = $(this).attr('href');

		$(this).parents('.tab_list').find('li').removeClass(isActive);
		$(target).siblings().removeClass(isActive);

		$(this).parents('li').addClass(isActive);
		$(target).addClass(isActive);

	})

	/* CRUD 장바구니---------------------------------------- */
	$('.info .cart').click(function() {
		$(this).toggleClass(isActive);
	})

	/* 카운트 버튼 ---------------------------------------- */
	$('._count :button').on({
		'click' : function(e){
			e.preventDefault();
			var $count = $(this).parent('._count').find('.inp');
			var now = parseInt($count.val());
			var min = 1;
			var max = 999;
			var num = now;
			if($(this).hasClass('minus')){
				var type = 'm';
			}else{
				var type = 'p';
			}
			if(type=='m'){
				if(now>min){
					num = now - 1;
				}
			}else{
				if(now<max){
					num = now + 1;
				}
			}
			if(num != now){
				$count.val(num);
			}
		}
	});

	/* 썸네일 CRUD 상세 고정 구매하기 버튼---------------------------------------- */
	var open_tap = document.getElementsByClassName("btn_acrd");
	var close_tap = document.getElementsByClassName("acrd_tab");
	var i;
	
	for (i = 0; i < open_tap.length; i++) {
		open_tap[i].addEventListener("click", function() {
		this.classList.toggle("accordion-active");
		var cart = this.children[0].children[0];
		var panel = this.nextElementSibling;
		var close_btn = this.parentElement.children[2];
		panel.style.maxHeight = panel.scrollHeight + "px";
		cart.style.display = "block";
		close_btn.style.display = "block";
	});
	};
	
	for (i = 0; i < close_tap.length; i++) {
		close_tap[i].addEventListener("click", function() {
		this.classList.toggle("accordion-active");
		var cart = this.parentElement.children[0].children[0].children[0];
		var panel = this.previousElementSibling;
		panel.style.maxHeight = null;
		cart.style.display = "none";
		this.style.display = "none";
	});
	};

	$('.ico_aco_tab').click(function () {
		$(this).toggleClass(isActive);
		if ($(this).hasClass(isActive)) {
			$('.aco_order_box').removeClass('disabled');
		} else {
			$('.aco_order_box').addClass('disabled');
		}
	})

	/* 아이디/비밀번호 찾기 ---------------------------------------- */
	$('.find_tap').find('a').on('click', function(e){
		e.preventDefault();

		var target = $(this).attr('href');

		$(this).parents('.find_tap').find('li').removeClass(isActive);
		$(target).siblings().removeClass(isActive);

		$(this).parents('li').addClass(isActive);
		$(target).addClass(isActive);

	})

	/* 셀렉트박스 커스텀 ---------------------------------------- */
    // 셀렉트박스 토글
    var selectToggle = function(target){ // target은 form_selwrap
        if(!target.hasClass(isOpen)){
            $('.form_selwrap').removeClass(isOpen);
            $('.form_selwrap .option').stop().fadeOut(200);
            target.addClass(isOpen);
            target.find('.option').stop().fadeIn(200);
            target.find('.option').find('input[checked]').focus();
        } else{
            target.removeClass(isOpen);
            target.find('.option').stop().fadeOut(200);
            target.find('a').focus();
        }
    }

    $('.form_selwrap a').on('click', function(e){
        selectToggle($(this).parents('.form_selwrap'));
    })

    $('.form_selwrap').each(function(index, item){
        // checked된 값이 있을 때 checked 한 값으로 먼저 선택되어있음
        if($(item).find('.option input[checked] + span').length){
            $(item).find('a').text($(item).find('.option input[checked] + span').text());
        } 

    })

    // 셀렉트 옵션 선택시
    $('.option input').on({
        'keydown' : function(e){
            if(e.keyCode == 13 || e.keyCode == 9){
                selectToggle($(this).parents('.form_selwrap'));
            }
        },
        'change' : function(){
            if($(this).is(':checked')){//셀렉트 옵션 라디오박스 선택되었을때
                $(this).parents('.form_selwrap').find('a').text($(this).siblings('span').text());
            }
        }
    })

    $('.option span').on({
        'click' : function(){
            selectToggle($(this).parents('.form_selwrap'));
        }
    })

	/* input 요소 ---------------------------------------- */
	// textarea 글자수 체크
	if($('.form_textarea').length){
		$('.ta_con').on('keyup', function () {
			var text_con = $(this).val().length;
			var count_num = text_con.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			$('.ta_txt').html(count_num  + " / 300");
			
			if ($(this).val().length > 300) {
				console.log('aaaa')
				$(this).val($(this).val().substring(0, 300));
				$('.ta_txt').html("300 / 300");
			}
		});
	}

	/* 주소 검색 코드---------------------------------------- */
	$('.postcode_btn').on('click',function execDaumPostcode(){
		new daum.Postcode({
			oncomplete: function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

				// 각 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var addr = ''; // 주소 변수
				var extraAddr = ''; // 참고항목 변수

				//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
				if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
					addr = data.roadAddress;
				} else { // 사용자가 지번 주소를 선택했을 경우(J)
					addr = data.jibunAddress;
				}

				// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
				if(data.userSelectedType === 'R'){
					// 법정동명이 있을 경우 추가한다. (법정리는 제외)
					// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
					if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
						extraAddr += data.bname;
					}
					// 건물명이 있고, 공동주택일 경우 추가한다.
					if(data.buildingName !== '' && data.apartment === 'Y'){
						extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
					}
					// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
					if(extraAddr !== ''){
						extraAddr = ' (' + extraAddr + ')';
					}
					// 조합된 참고항목을 해당 필드에 넣는다.
					document.getElementById("extraAddress").value = extraAddr;
				
				} else {
					document.getElementById("extraAddress").value = '';
				}

				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				document.getElementById('postcode').value = data.zonecode;
				document.getElementById("address").value = addr;
				// 커서를 상세주소 필드로 이동한다.
				document.getElementById("detailAddress").focus();
			}
		}).open();
	})
	
	/* 인풋 유효성 검사 코드---------------------------------------- */
	$('.input_ty01').blur(function() {
		if (!$(this).val()) {
			$(this).parents('.form_input').find('.input_msg').removeClass('succes');
			$(this).parents('.form_input').find('.input_msg').addClass('fail');
		} else {
			$(this).parents('.form_input').find('.input_msg').removeClass('fail');
			$(this).parents('.form_input').find('.input_msg').addClass('succes');
		} 
	}) 
	

	$('.id_search').click(function() {
		$(this).toggleClass('disable');
	})

	$('.pw_search').click(function() {
		$(this).toggleClass('disable');
		if ($(this).hasClass('disable')) {
			$('.btn_switch').css('display', 'none');
			$(this).text('인증번호 발송');
		} else{
			$(this).text('확인');
			$('.btn_switch').css('display', 'block');
		}
	})









/* ============================================ */
	

	/* 메인 */
	bestBook(); 		//메인-베스트도서
	/* 공통 */
	header_Sticky();	//헤더영역
	footerArea_Fixed(); //푸터영역
	total_dep_02();		//gnb 반응형
	snbArea(); 			//snb_area
	quicAarea_Show(); 	//퀵메뉴 show/hide
	quicAarea_Sticky(); //퀵메뉴 하단 고정
	/* 서브 */

	/* 선택영역 외 클릭 시 이벤트  ---------------------------------------- */
    $('body').on('click', function(e){

        // 셀렉트 외 선택 시 셀렉트 옵션 닫힘
        if(!$('.form_selwrap').has(e.target).length){
            $('.form_selwrap').removeClass(isOpen);
            // $('.form_selwrap').find('.option').stop().slideUp();
            $('.form_selwrap').find('.option').hide();
        }

		//breadcrumbs
        if(!$('.depth_box').has(e.target).length){
            $('.depth_box').stop().fadeOut(200);
            $('.depth_box').closest('li').removeClass(isOpen);
        }
    });
	
	$(window).on('resize',function(){
		/* 메인 */
		bestBook(); 		//메인-베스트도서
		/* 공통 */
		header_Sticky();	//헤더영역
		footerArea_Fixed(); //푸터영역
		total_dep_02();		//gnb 반응형
		snbArea(); 			//snb_area
		quicAarea_Show(); 	//퀵메뉴 show/hide
		quicAarea_Sticky(); //퀵메뉴 하단 고정
		/* 서브 */
		
	})

	$(window).on('scroll', function(){
		/* 메인 */
		/* 공통 */
		header_Sticky();	//헤더영역
		quicAarea_Show();	//퀵메뉴 show/hide
		quicAarea_Sticky(); //퀵메뉴 하단 고정
		/* 서브 */

    });
});
