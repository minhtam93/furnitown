const lg = 1600,
  md = 1200,
  sm = 992,
  xs = 767;

//global
let wrapper = document.querySelector("body");
if (wrapper.classList.contains("homepage")) {
  window.addEventListener("DOMContentLoaded", (event) => {
    //flickity
    let carousel = document.querySelector(".slider__list");
    console.log(1);
    let pre = document.querySelector(".slider__bottom-control .pre");
    let next = document.querySelector(".slider__bottom-control .next");
    let flktyHome = new Flickity(carousel, {
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      adaptiveHeight: false,
    });

    pre.addEventListener("click", () => {
      flktyHome.previous();
    });
    next.addEventListener("click", () => {
      flktyHome.next();
    });
  });
} else if (wrapper.classList.contains("productpage")) {
  // window.addEventListener("DOMContentLoaded", (event) => {
  //flickity
  let pres = document.querySelectorAll(".btnplay.pre");
  let nexts = document.querySelectorAll(".btnplay.next");
  let carousel2 = document.querySelectorAll(".carousel");
  carousel2.forEach((carousel, i) => {
    var flickty = new Flickity(carousel, {
      cellAlign: "left",
      lazyLoad: true,
      lazyLoad: 1,
      contain: true,
      // draggable: true,
      wrapAround: true,
      selectedAttraction: 0.01,
      friction: 0.25,
      freeScroll: false,
      prevNextButtons: false,
      imagesLoaded: true,
      pageDots: false,
    });

    // if (matchMedia("screen and (min-width: 992px)").matches) {
    //   flickty = new Flickity(carousel, {
    //     groupCells: true,
    //     groupCells: 3,
    //   });
    // }
    // if (matchMedia("screen and (max-width: 991px)").matches) {
    //   flickty = new Flickity(carousel, {
    //     groupCells: true,
    //     groupCells: 2,
    //   });
    // }
    // if (matchMedia("screen and (max-width: 767px)").matches) {
    //   flickty = new Flickity(carousel, {
    //     groupCells: false,
    //     groupCells: 1,
    //   });
    // }

    pres[i].addEventListener("click", () => {
      flickty.previous();
    });

    nexts[i].addEventListener("click", () => {
      flickty.next();
    });
  });
  // });
} else if (wrapper.classList.contains("detailpage")) {
  window.addEventListener(
    "DOMContentLoaded",
    (event) => {
      //flickity
      let carouselMain = document.querySelector(".detail-product__item-main");
      let flktyDetail = new Flickity(carouselMain, {
        cellAlign: "left",
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        adaptiveHeight: false,
        pageDots: false,
        imagesLoaded: true,
      });

      let carouselNav = document.querySelector(".detail-product__item-sub");
      let flktyDetailNav = new Flickity(carouselNav, {
        asNavFor: ".detail-product__item-main",
        contain: true,
        pageDots: false,
        freeScroll: true,
        prevNextButtons: false,
        groupCells: true,
        imagesLoaded: true,
      });
    },
    false
  );

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    loop: false,
    protect: true,
  });
} else if (wrapper.classList.contains("projectspage")) {
  // show projects all list
  const selectProjects = document.querySelector(".project-btn");
  const headingProjects = selectProjects.querySelector(".title");
  const spanHeading = headingProjects.querySelector("span");
  const optionProjects = selectProjects.querySelectorAll(".project-option p");
  function showTitleProjects() {
    headingProjects.addEventListener("click", (e) => {
      e.stopPropagation();
      selectProjects.classList.toggle("is-active");
    });

    optionProjects.forEach((item) => {
      item.addEventListener("click", () => {
        let txtCurrent = spanHeading.textContent;
        let txtOption = item.textContent;
        spanHeading.textContent = txtOption;
        item.textContent = txtCurrent;
      });
    });

    document.addEventListener("click", () => {
      selectProjects.classList.remove("is-active");
    });
  }
  showTitleProjects();
} else if (wrapper.classList.contains("contactpage")) {
  let btnSubmit = document.querySelector('.form [name="submit"]'),
    hoTen = document.querySelector('.form [name="hovaten"]'),
    email = document.querySelector('.form input[name="email"]'),
    tel = document.querySelector('.form input[name="tel"]'),
    noiDungTuVan = document.querySelector(".form .textarea");

  function removeErr(inputEle) {
    return inputEle.nextElementSibling
      ? inputEle.nextElementSibling.remove()
      : null;
  }
  function showErr(msg) {
    return `<span style='color:red'>${msg}</span>`;
  }
  function getCondition(value, regex, str) {
    switch (value) {
      case "hovaten": {
        return str == "" || !regex.test(str) || str.length < 4;
      }
      case "email": {
        return str == "" || !regex.test(str);
      }
      case "tel": {
        return (
          str == "" || !regex.test(str) || str.length < 9 || str.length > 11
        );
      }
      case "noidungtuvan": {
        return str == "";
      }
    }
  }
  function checkForm(inputEle, regex, errmsg) {
    if (inputEle) {
      removeErr(inputEle);
      str = inputEle.value.trim();
      let condition = getCondition(inputEle.name, regex, str);
      if (condition) {
        inputEle.insertAdjacentHTML("afterend", showErr(errmsg));
      }
    }
  }
  function validate() {
    btnSubmit.addEventListener("click", (e) => {
      let errMss = false;
      let str = "";
      let regex = "";
      e.preventDefault;
      //hoten
      regex = /^[a-zA-Z ]+$/;
      checkForm(hoTen, regex, "Kiem tra lai ho ten");
      //email
      regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      checkForm(email, regex, "Kiem tra lai email");
      //tel
      regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      checkForm(tel, regex, "Kiem tra lai so dien thoai");
      //noi dung tu van
      regex = "";
      checkForm(noiDungTuVan, regex, "Vui long nhap noi dung tu van");
    });
  }
  function checkFormContact() {
    validate();
    hoTen.addEventListener("focus", () => {
      removeErr(hoTen);
    });
    email.addEventListener("focus", () => {
      removeErr(email);
    });
    tel.addEventListener("focus", () => {
      removeErr(tel);
    });
    noiDungTuVan.addEventListener("input", () => {
      removeErr(noiDungTuVan);
    });
  }
  checkFormContact();
} else {
}

//click button menubar - show menu left
let back = document.querySelector(".header__button .back"),
  menubar = document.querySelector("nav"),
  overlay = document.querySelector(".overlay"),
  close = document.querySelector(".menubar__bottom .close"),
  mainwrapper = document.querySelector(".mainwrapper");

function removeClass() {
  menubar.classList.remove("is-active");
  overlay.classList.remove("is-active");
  mainwrapper.classList.remove("is-active");
}

function showHiddenMenuLeft() {
  back.addEventListener("click", (e) => {
    e.stopPropagation;
    if (menubar) {
      menubar.classList.toggle("is-active");
      overlay.classList.toggle("is-active");
      mainwrapper.classList.toggle("is-active");
    }
  });
  overlay.addEventListener("click", () => {
    removeClass();
  });
  close.addEventListener("click", () => {
    removeClass();
  });
}
showHiddenMenuLeft();

//menumobile
let btnMobile = document.querySelector(".menumobile .hambuger"),
  closeIcon = btnMobile.querySelector("span");
function showMenuMobileLeft() {
  btnMobile.addEventListener("click", () => {
    menubar.classList.toggle("is-active");
    menubar.classList.toggle("--xs");
    closeIcon.classList.toggle("is-active");
  });
}
showMenuMobileLeft();

// scroll - show menu top
let menuTop = document.querySelector(".menu"),
  buttonMenu = document.querySelector(".header__button");
function showMenuTop() {
  let wWindow = window.innerWidth;
  menuTop.classList.remove("is-active");
  if (wWindow < sm) {
    menuTop.classList.add("is-active");
  } else {
    window.addEventListener("scroll", () => {
      let positionBtn = buttonMenu.offsetTop;
      let hScrollY = Number(window.pageYOffset);
      if (hScrollY >= positionBtn) {
        menuTop.classList.add("is-active");
        buttonMenu.classList.add("is-active");
      } else {
        menuTop.classList.remove("is-active");
        buttonMenu.classList.remove("is-active");
      }
    });
  }
}
showMenuTop();
window.addEventListener("resize", showMenuTop);
window.addEventListener("load", showMenuTop);
//back to top
function toTop() {
  let toTop = document.querySelector(".to-top");
  toTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
}
toTop();

setTimeout(function () {});

// let promise = new Promise(
//   function(resolve,reject) {
//     resolve()
//   }
// )

// promise
//   .then(function() {
//     return 'hi'
//   })
//   .then(function(data) {
//     console.log(data)
//     return 'hia'
//   })
//   .then(function(data) {
//     console.log(data)
//     console.log('hi3')
//   })

//   .catch(function() {
//     console.log('that bai')
//   })

//   .finally(function() {
//     console.log('done')
//   })

// function sleep(ms) {
//   return new Promise(function (resolve) {
//     console.log(1);
//     setTimeout(resolve, ms);
//   });
// }
// sleep(1000)
//   .then(() => sleep(1000))
//   .then(() => sleep(1000))
//   .then(() => sleep(1000));

// let promise = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve([1])
//   },1000)
//   //logic
// });

// let promise2 = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve([2,3])
//   },2000)
// });

// Promise.all([promise,promise2]) 
//   .then(function([result1,result2]){
//     console.log(result1.concat(result2))
//   })

// const users = [
//   {
//     id:1,
//     name:'Kien Dam'
//   },
//   {
//     id:2,
//     name:'Son Dang'
//   },
//   {
//     id:3,
//     name:'Minh Tam'
//   },
// ]

// const comments = [
//   {
//     id: 1,
//     user_id: 1,
//     content: 'bao gio co video moi the a'
//   },
//   {
//     id: 2,
//     user_id: 2,
//     content: 'vua ra xong em oi'
//   },
//   {
//     id: 3,
//     user_id: 1,
//     content: 'em cam on anh nhieu'
//   }
// ]

// function getComments() {
//   return new Promise(resolve=> {
//     setTimeout(()=> {
//       resolve(comments)
//     },1000)
//   })
// }

// function getUserByIds(userIds) {
//   return new Promise(resolve => {
//     let result = users.filter(user=> {
//       return userIds.includes(user.id)
//     })
//     resolve(result)
//   })
// }

// getComments()
//   .then(comments => {
//     let userId = comments.map(user=> {
//       return user.user_id
//     })
//     // console.log(userId)
//     return (
//       getUserByIds(userId)
//       .then(users=> {
//         return {
//           users,
//           comments
//         };
//       })
//     )
//   })
//   .then((data)=> {
//     console.log(data)
//     let html =''
//     let commentBlock = document.querySelector('.test')
//     data.comments.forEach(comment => {
//       let user = data.users.find(user=> {
//         return comment.user_id === user.id
//       })
//       html += `<li>${user.name}: ${comment.content}</li>`
//       commentBlock.innerHTML = html
//     })
//   })

//   let postAPI = 'https://jsonplaceholder.typicode.com/posts'

//   fetch(postAPI)
//     .then(response => response.json())
//     .then(posts => {
//       let htmls = posts.map(post => `<li>${post.title}</li>`)
//       let html = htmls.join('')
//       let commentBlock = document.querySelector('.test')
//       commentBlock.innerHTML = html
//     })
//     .catch(err => console.log('err'))
