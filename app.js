const introduce = document.querySelector(".introduce");
const info = document.querySelector(".info");
const infoH1 = document.querySelector(".info h1");
const infoH2 = document.querySelector(".info h2");

function colorizeText(textElement, color) {
  const text = textElement.textContent;
  const letters = text.split("");
  const spanElements = [];
  textElement.textContent = "";

  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.color = color;

    if (span.style.color == "white") {
      span.style.animation = `colorize 1s ${index * 0.1}s forwards`;
    } else if (span.style.color == "black") {
      span.style.animation = `colorize2 1s ${index * 0.1}s forwards`;
    }
    spanElements.push(span);
  });
  spanElements.forEach((span) => {
    textElement.appendChild(span);
  });
}

let backgroundIndex = 0;

const backgroundImages = [
  'url("./images/catInfoPic.jpg")',
  'url("./images/snakePic.jpg")',
  'url("./images/JapanWebSitePic.jpg")',
  'url("./images/NewsPic.jpg")',
];

setInterval(() => {
  const backgroundImage = getComputedStyle(introduce).backgroundImage;

  if (backgroundImage.includes("catInfoPic.jpg")) {
    introduce.style.backgroundImage = 'url("images/snakePic.jpg")';
    colorizeText(infoH1, "white");
    colorizeText(infoH2, "white");
  } else if (backgroundImage.includes("snakePic.jpg")) {
    introduce.style.backgroundImage = 'url("images/JapanWebSitePic.jpg")';
  } else if (backgroundImage.includes("JapanWebSitePic.jpg")) {
    introduce.style.backgroundImage = 'url("images/NewsPic.jpg")';
    colorizeText(infoH1, "black");
    colorizeText(infoH2, "black");
  } else if (backgroundImage.includes("NewsPic.jpg")) {
    introduce.style.backgroundImage = 'url("images/catInfoPic.jpg")';
  }
}, 3000);

// setInterval(() => {
//   introduce.style.backgroundImage = backgroundImages[backgroundIndex];
//   if (backgroundIndex == 3) {
//     colorizeText(infoH1, "black");
//     colorizeText(infoH2, "black");
//   } else if (backgroundIndex == 1) {
//     colorizeText(infoH1, "white");
//     colorizeText(infoH2, "white");
//   }

//   backgroundIndex = (backgroundIndex + 1) % backgroundImages.length;
// }, 3000);

//-------------------
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
      tableRows.forEach((row, index) => {
        setTimeout(() => {
          row.classList.add("active");
        }, 300 * index);
      });

      isScrolling = true;
    }
    if (scrollY >= 100 && !isScrolling2) {
      about.style.opacity = 1;
      gsap.to(progressBars[0], {
        duration: 1,
        width: "30%",
      });

      gsap.to(progressBars[1], {
        duration: 1,
        width: "25%",
      });

      gsap.to(progressBars[2], {
        duration: 1,
        width: "60%",
      });

      gsap.to(progressBars[3], {
        duration: 1,
        width: "15%",
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

document.querySelector(".topest").addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  popup.style.display = "none";
});
