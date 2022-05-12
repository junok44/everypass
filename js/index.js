$(document).ready(function () {
   // pageable
   const pageable = new Pageable("#container");
   const askBtn = document.querySelector('.page-1-btn');
   const pageTit = document.querySelectorAll('.pages-tit');

   askBtn.addEventListener('click', function () {
      pageable.scrollToPage(7);
   })
   askBtn.addEventListener('touchstart', function () {
      pageable.scrollToPage(7);
   })
   
   // 모바일 터치 적용
   pageable.on("scroll.end", function () {
      if (pageable.index == 1) {
         setTimeout(function () {
            pageTit[0].classList.remove('hidden');
         }, 100);
      }
      if (pageable.index == 2) {
         setTimeout(function () {
            pageTit[1].classList.remove('hidden');
         }, 100);
      }
      if (pageable.index == 3) {
         setTimeout(function () {
            pageTit[2].classList.remove('hidden');
         }, 100);
      }
      if (pageable.index == 4) {
         setTimeout(function () {
            pageTit[3].classList.remove('hidden');
         }, 100);
      }
   });


   pageable.on("scroll.end", function () {
      if (pageable.index == 6) {
         document.querySelector(('.scroll-downs')).classList.add('scroll-unactive');
      } else {
         document.querySelector(('.scroll-downs')).classList.remove('scroll-unactive');
      }
   });
   

   // 메뉴이동 , pageable
   const menu1 = document.querySelectorAll('.menu-1');
   const menu2 = document.querySelectorAll('.menu-2');
   const menu3 = document.querySelectorAll('.menu-3');
   const logos = document.querySelectorAll('.header-logo');

   for (let i = 0; i < logos.length; i++) {
      logos[i].addEventListener('click', function () {
         pageable.scrollToPage(1);
      })
   }

   for (let i = 0; i < menu1.length; i++) {
      menu1[i].addEventListener('click', function (e) {
         e.preventDefault();
         pageable.scrollToPage(1);
      });
   }
   for (let i = 0; i < menu2.length; i++) {
      menu2[i].addEventListener('click', function (e) {
         e.preventDefault();
         pageable.scrollToPage(6);
      });
   }

   for (let i = 0; i < menu3.length; i++) {
      menu3[i].addEventListener('click', function (e) {
         e.preventDefault();
         pageable.scrollToPage(7);
      });
   }

   // 1페이지 태블릿 애니메이션
   const tabletImg = document.querySelector('.tablet_img');
   window.onload = setTimeout(function () {
      tabletImg.classList.remove('tablet_img_hidden');
   }, 300)



   // 개인정보 수집 약관동의
   const infoPopupOpen = document.querySelector('.info_more');
   const infoPopup = document.querySelector('.info_popup');
   const infoPopupClose = document.querySelector('.popup_close');

   infoPopupOpen.addEventListener('click', function () {
      infoPopup.classList.remove('info_popup_unactive');
      infoPopup.classList.add('info_popup_active');
   });
   infoPopupClose.addEventListener('click', function () {
      infoPopup.classList.add('info_popup_unactive');
   });


   // 이용문의 
   const form = document.getElementById('form');
   const username = document.getElementById('username');
   const email = document.getElementById('email');
   const phoneNum = document.getElementById('phone_num');
   const content = document.getElementById('content');
   const infoAgree = document.getElementById('check_icon');
   const formBtn = document.querySelector('.form button');
   const successCount = document.querySelectorAll('.success').length;

   function handleFormPost(e) {
      e.preventDefault();

      if (checkInputs()) {
         //alert("제출");

         let params = "{ username:\"" + username.value + "\", email:\"" + email.value + "\", phone_num:\"" + phoneNum.value + "\", content:\"" + content.value + "\" }";
         //alert(params);

         $.ajax({
               type: "POST",
               url: "/contactform/contactform.aspx",
               data: params,
            })
            .done(function (msg) {
               // alert(msg);
               if (msg == 'OK') {
                  alert("이용 문의 접수가 완료되었습니다.");
                  $("#sendmessage").addClass("show");
                  $("#errormessage").removeClass("show");
                  $('form.contactForm').find("input, textarea").val("");
                  $('#check_icon').checked = false;
               } else if (msg == 'BLOCK') {
                  location.href = "http://naver.com";
               } else {
                  alert(msg);
                  $("#sendmessage").removeClass("show");
                  $("#errormessage").addClass("show");
                  $('#errormessage').html(msg);
               }

               inputPopup.classList.add('form_unactive');
               setInitFor(username);
               setInitFor(email);
               setInitFor(phoneNum);
               setInitFor(content);
               setInitFor(infoAgree);
            });
      }

      function checkInputs() {
         let result = true;
         const usernameValue = username.value.trim();
         const emailValue = email.value.trim();
         const phoneNumValue = phoneNum.value.trim();
         const contentValue = content.value.trim();
         const infoAgreeValue = infoAgree.checked;

         if (usernameValue === '') {
            setErrorFor(username, '이름을 입력해주세요.');
            result = false;
         } else {
            setSuccessFor(username);
         }

         if (emailValue === '') {
            setErrorFor(email, '이메일을 입력해주세요.');
            result = false;
         } else if (!isEmail(emailValue)) {
            setErrorFor(email, '유효하지않은 형식입니다.');
            result = false;
         } else {
            setSuccessFor(email);
         }

         if (phoneNumValue === '') {
            setErrorFor(phoneNum, '휴대폰 번호를 입력해주세요.');
            result = false;
         } else if (isNaN(phoneNumValue)) {
            setErrorFor(phoneNum, '유효하지않은 형식입니다.');
            result = false;
         } else if (phoneNumValue.length != 11) {
            setErrorFor(phoneNum, '유효하지않은 형식입니다.');
            result = false;
         } else {
            setSuccessFor(phoneNum);
         }

         if (contentValue === '') {
            setErrorFor(content, '내용을 입력해주세요.');
            result = false;
         } else if (contentValue.length < 21) {
            setErrorFor(content, '20자이상으로 작성해주세요.');
            result = false;
         } else {
            setSuccessFor(content);
         }

         if (infoAgreeValue === false) {
            setErrorFor(infoAgree, '개인정보 수집 및 이용에동의해주세요.');
         } else {
            setSuccessFor(infoAgree);
         }
         return result;
      }

      function setErrorFor(input, message) {
         const formControl = input.parentElement;
         const small = formControl.querySelector('small');
         formControl.className = 'form-control error';
         small.innerText = message;
      }

      function setSuccessFor(input) {
         const formControl = input.parentElement;
         formControl.className = 'form-control success';
      }

      function setInitFor(input) {
         input.value = "";
         input.checked = false;
         input.parentElement.className = 'form-control';
      }

      function isEmail(email) {
         return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
      }

      if (successCount === 5) {
         formBtn.classList.add('form_btn_active');
      } else {
         formBtn.classList.remove('form_btn_active');
      }
   }
   form.addEventListener('submit', handleFormPost);

   

   // pc 이용문의 클릭 인식
   const formPost = document.querySelector('.form button');
   const downloadBtn = document.querySelector('.download-btn');

   username.addEventListener('click', function () {
      username.focus();
   })
   email.addEventListener('click', function () {
      email.focus();
   })
   phoneNum.addEventListener('click', function () {
      phoneNum.focus();
   })
   content.addEventListener('click', function () {
      content.focus();
   })

   formPost.addEventListener('touchstart', handleFormPost);
   username.addEventListener('touchstart', function () {
      username.focus();
   })
   email.addEventListener('touchstart', function () {
      email.focus();
   })
   phoneNum.addEventListener('touchstart', function () {
      phoneNum.focus();
   })
   content.addEventListener('touchstart', function () {
      content.focus();
   })
   askBtn.addEventListener('touchstart', function () {
      pageable.scrollToPage(7);
   });
   downloadBtn.addEventListener('touchstart', function () {
      window.open('https://play.google.com/store/apps/details?id=kr.csid.everypass');
   });
   document.querySelector('#check_icon').addEventListener('touchstart', function () {
      if (this.checked) {
         this.checked = false;
      } else {
         this.checked = true;
      }
   });
   document.querySelector('.info_more').addEventListener('touchstart', function () {
      infoPopup.classList.remove('info_popup_unactive');
      infoPopup.classList.add('info_popup_active');
   })


   // 모바일 메뉴 창 열고 닫기
   const mobileMenuClose = document.querySelector('.mobile-menu-close');
   const mobileMenuWindow = document.querySelector('.mobile-menu-window-wrap');
   const mobileMenuList = document.querySelectorAll('.depth2 li a');
   const mobileMenuOpen = document.querySelectorAll('.mobile-menu-wrap');


   mobileMenuOpen[0].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[1].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[2].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[3].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[4].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[5].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[6].addEventListener('touchstart', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });


   // pc 클릭  , 모바일 메뉴 창 열고 닫기
   mobileMenuOpen[0].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[1].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[2].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[3].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[4].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[5].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });
   mobileMenuOpen[6].addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-unactive');
      mobileMenuWindow.classList.add('mobile-menu-window-active');
   });


   mobileMenuClose.addEventListener('touchstart', function () {
      mobileMenuWindow.classList.add('mobile-menu-window-unactive');
   });
   mobileMenuClose.addEventListener('click', function () {
      mobileMenuWindow.classList.add('mobile-menu-window-unactive');
   });

   document.querySelector('.mobile-menu-header').addEventListener('click', function () {
      mobileMenuWindow.classList.remove('mobile-menu-window-active');
      mobileMenuWindow.classList.add('mobile-menu-window-unactive');
      pageable.scrollToPage(1);
   });


   mobileMenuList[0].addEventListener('touchstart', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   mobileMenuList[1].addEventListener('touchstart', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   mobileMenuList[2].addEventListener('touchstart', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   // pc 클릭
   mobileMenuList[0].addEventListener('click', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   mobileMenuList[1].addEventListener('click', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   mobileMenuList[2].addEventListener('click', function (e) {
      mobileMenuWindow.className = "mobile-menu-window-wrap .mobile-menu-window-unactive";
   });
   
   // 풋터 링크 터치
   document.querySelector('.company-intro').addEventListener('touchstart', function () {
      window.open("https://www.csid.kr/company_info.aspx");
   })
   document.querySelector('.company-service').addEventListener('touchstart', function () {
      window.open("https://www.csid.kr/doc_agreement.aspx");
   })
   document.querySelector('.company-refund').addEventListener('touchstart', function () {
      window.open("https://www.csid.kr/doc_refund.aspx");
   })
   document.querySelector('.company-privacy').addEventListener('touchstart', function () {
      window.open("https://www.csid.kr/doc_policy.aspx");
   })
   document.querySelector('.spam').addEventListener('touchstart', function () {
      window.open("https://www.csid.kr/doc_spamdeny.aspx");
   })
   document.querySelector('.blog').addEventListener('touchstart', function () {
      window.open("https://blog.naver.com/wecissoid");
   })
});