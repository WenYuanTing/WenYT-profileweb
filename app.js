document.addEventListener("DOMContentLoaded", function () {
  const info = document.querySelector(".info");
  const slideImg = document.querySelector(".slideImg");
  const table = document.querySelector(".table");
  const tableRows = table.querySelectorAll("tr");
  const about = document.querySelector(".about");
  const progressBars = document.querySelectorAll(".progress .progress-bar");
  const contentHeight = document.body.scrollHeight;
  var popup = document.getElementById("popup");

  let isScrolling = false;
  let isScrolling2 = false;
  let popUp = false;

  slideImg.classList.add("active");
  setTimeout(function () {
    info.classList.add("active");
  }, 500);

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const remainingScroll = contentHeight - (windowHeight + currentScroll);
    const scrollY = window.scrollY;
    //console.log(scrollY);
    console.log(remainingScroll);

    if (scrollY >= 650 && !isScrolling) {
      // 循环显示table中的每一行
      tableRows.forEach((row, index) => {
        // 使用setTimeout来实现逐行显示的效果
        setTimeout(() => {
          // 为行添加一个 CSS 类，以显示它
          row.classList.add("active");
        }, 300 * index); // 每行之间的延迟时间
      });

      // 设置标志以避免重复触发动画
      isScrolling = true;
    }
    if (scrollY >= 100 && !isScrolling2) {
      about.style.opacity = 1;
      gsap.to(progressBars[0], {
        duration: 1, // 动画持续时间为1秒
        width: "30%", // 第一个进度条宽度
      });

      gsap.to(progressBars[1], {
        duration: 1,
        width: "25%", // 第二个进度条宽度
      });

      gsap.to(progressBars[2], {
        duration: 1,
        width: "60%", // 第三个进度条宽度
      });

      gsap.to(progressBars[3], {
        duration: 1,
        width: "15%", // 第四个进度条宽度
      });
      new Textify(
        {
          el: ".textAnimation",
          animation: {
            stagger: 0.025,
            duration: 0.7,
            ease: "expo.inOut",
            animateProps: { opacity: 0, scale: 1 },
          },
        },
        gsap
      );

      console.log("關於執行完畢");
      isScrolling2 = true;
    }
    if (remainingScroll < 1 && !popUp) {
      // 当页面滚动到底部时打开弹出视窗
      popup.style.display = "block";
      console.log("到达最底部");
      popUp = true;
    }
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  });
});

// 当页面滚动时触发
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var topestButton = document.querySelector(".topest");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topestButton.style.display = "block";
  } else {
    topestButton.style.display = "none";
  }
}

// 点击按钮时滚动回顶部
document.querySelector(".topest").addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  popup.style.display = "none";
});

// 获取按钮和弹出视窗的元素
