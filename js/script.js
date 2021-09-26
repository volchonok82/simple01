// window.addEventListener('load', function () {
document.addEventListener("DOMContentLoaded", () => {
function _removeClasses(elem, elemClass) {
    if (elem) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove(elemClass);
        }
    }
}
const htmlBody =document.querySelector('html');
// код определяющий на каком устройстве открыта страница
let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


if (isMobile.any()) {
    htmlBody.classList.add('_touch');

} else {
    htmlBody.classList.add('_pc');
}


// Проверка поддержки webp
function testWebP(elem) {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = function () {
      webP.height === 2 ? elem.classList.add('_webp') : elem.classList.add('_no-webp');
    };
  }

  testWebP(htmlBody);


  // IE
function isInternetExplorer() {
    return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
// console.log(isInternetExplorer());
if (isInternetExplorer() === false) {
    // alert('Браузер не IE');
} else {
    alert('Ваш браузер не поддерживается, страница может отображаться некорректно!');
    htmlBody.classList.add('_ie');
}
// lock body
const documentBody = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
let timeout = 10;


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('._body-wrapper').offsetWidth + 'px';
  
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    documentBody.style.paddingRight = lockPaddingValue;
    documentBody.classList.add('_lock');
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  
  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      documentBody.style.paddingRight = '0px';
      documentBody.classList.remove('_lock');
    }, 0);
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
// nclude('./_spoller.js')
// задать хедер(по дефолту везде .header)
const headerElement = '.header__top';


actionBurgerMenu();
onMenuLinkClick(headerElement);
hideHeader(headerElement, 300);

/*-------------------------- */
function actionBurgerMenu(iconBurger = '.icon-menu', bodyMenu = '.menu__body') {
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);
    if (iconMenu && menuBody) {
        iconMenu.addEventListener("click", function (e) {
            if (iconMenu.classList.contains('_active')) {
                iconMenu.classList.remove("_active");
                menuBody.classList.remove("_active");
                bodyUnLock();
            } else {
                iconMenu.classList.add("_active");
                menuBody.classList.add("_active");
                bodyLock();
            }
        });
    }
}


/*-------------------------- */
function onMenuLinkClick(headerElement = '.header', links = 'a[data-goto]', iconBurger = '.icon-menu', bodyMenu = '.menu__body') {
    const menuLinks = document.querySelectorAll(links);
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);

    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", function (e) {
                const menuLink = e.target;
                if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);

                    // если шапка фиксированная
                    /* 
                    console.log(document.querySelector(headerElement).offsetHeight);
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(headerElement).offsetHeight;*/

                    // если шапка не фиксированная
                    /**/
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                    if (iconMenu.classList.contains('_active')) {
                        bodyUnLock();
                        iconMenu.classList.remove('_active');
                        menuBody.classList.remove('_active');
                    }

                    if (document.querySelectorAll('._hover')) {
                        _removeClasses(document.querySelectorAll('._hover'), "_hover");
                    }

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                    e.preventDefault();
                }
            });
        });
    }
}

/*-------------------------- */
function hideHeader(headerElement = '.header', topOfset = 200) {
    let lastScroll = 0;
    const header = document.querySelector(headerElement);
    const defaultOfset = topOfset;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('_hide');

    if (header) {
        window.addEventListener('scroll', () => {
            if (scrollPosition() > lastScroll && !containHide()) {
                //scroll down с нуля
                header.classList.add('_vis');
            }
            if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOfset) {
                //scroll down после определенной позиции
                header.classList.add('_hide');
            }
            if (scrollPosition() < lastScroll && containHide()) {
                //scroll up
                header.classList.remove('_hide');
            }
            if (scrollPosition() == 0) {
                header.classList.remove('_vis');
            }
            lastScroll = scrollPosition();
        });
    }
}
const popupLinks = document.querySelectorAll('.popup-link');


// величина такая же как в css
// const timeout = 800; задан в _body-lock.js

// находим все ссылки на попапы и убираем у них # и по клику на ссылку открываем попап с таким именем
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

// находим все объекты с классом .close-popup и вешаем на клик по нему функцию закрытия 
const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

// функция открытия попапа
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

// функция закрытия попапа
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}


document.addEventListener('keydown', function (e) {
  
  if (e.key === 'Escape') {
    let popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
 
});

(function(){
  // проверяем поддержку
  if(!Element.prototype.closest){
    // реализуем
    Element.prototype.closest = function(css){
      var node = this;
      while(node){
        if(node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function(){
  // проверяем поддержку
  if(!Element.prototype.matches){
    // поределяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector||
      Element.prototype.msMatchesSelector;
  }
})();
const form = document.getElementById('form');
// нормальная отправка формы
// form.addEventListener('submit', formSend);

// имитация оправки формы
form.addEventListener('submit', sendFormFake);


async function formSend(event) {
    event.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);
    if (formImage) {
        formData.append('image', formImage.files[0]);
    }


    if (error === 0) {
        form.classList.add('_sending');

        const response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let result = await response.json();
            //код показывающий что данные отправлены
            alert(result.message);
            console.log(result.message);
            if (formPreview) {
                formPreview.innerHTML = '';
            }
            form.reset();
            form.classList.remove('_sending');
        } else {
            alert('Ошибка');
            form.classList.remove('_sending');
        }
    } else {
        // код для обработки неправильного заполнения формы
        alert('Проверьте красные поля');
    }
}



function sendFormFake(e){
    e.preventDefault();
    let error = formValidate(form);
    if (error === 0) {
        form.classList.add('_sending');
        setTimeout(()=>{
            console.log('sending ok!');
            popupOpen(document.querySelector('.form-ok'));
            form.classList.remove('_sending');
            form.reset();
        },2000);
    } else {
        // код для обработки неправильного заполнения формы
        // alert('Проверьте красные поля');
        popupOpen(document.querySelector('.form-error'));
    }
}

// простая валидация формы
function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    // console.log(formReq);

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        // console.log(input);
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}


function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

// Функция теста email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// превью загружаемой фотографии
const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');
if (formImage && formPreview) {
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
}


function uploadFile(file) {
    //проверяем тип файла
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Разрешены только изображения!');
        formImage.value = '';
        return;
    }
    //проверяем размер файла
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл должен быть менее 2мб.');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    };
    reader.onerror = function (e) {
        alert('Ошибка');
    };
    reader.readAsDataURL(file);
}
  //  --------------------------------
  document.addEventListener('click', documentActions);

  // делегирование события клик
  function documentActions(e) {
      const targetElement = e.target;

      if (targetElement.closest('.header__btn')) {
          window.scrollTo({
              top: windowHeight,
              behavior: 'smooth'
          });
      }


      // можно добавлять события клика
  }

  let windowHeight = document.documentElement.clientHeight;
  let headerTopHeight = document.querySelector('.header__top').clientHeight;
  document.querySelector('.header__body').style.marginTop = `-${headerTopHeight}px`;
});