const quoteNum = document.querySelector("span");
const quoteText = document.querySelector("p");
const getQuoteButton = document.querySelector("#generator");
const dividerImg = document.querySelector("#divider img");
const apiLink = "https://api.adviceslip.com/advice";
const prevButton = document.querySelector("#previous");
localStorage.setItem("oldID", `0`);

const getQuotes = async (dataSource) => {
  const response = await fetch(dataSource);
  const data = await response.json();
  return data;
};

// on load
getQuotes(apiLink)
  .then((data) => {
    console.log(data);
    quoteNum.textContent = data.slip.id;
    quoteText.textContent = data.slip.advice;

    localStorage.setItem("newID", `${data.slip.id}`);
    localStorage.setItem("oldID", `old id`);
  })
  .catch((err) => {
    console.log(err);
  });

// on click
getQuoteButton.addEventListener("click", (e) => {
  getQuotes(apiLink)
    .then((data) => {
      console.log(data.slip);
      quoteNum.textContent = data.slip.id;
      quoteText.textContent = data.slip.advice;

      localStorage.setItem("oldID", `${localStorage.getItem("newID")}`);
      localStorage.setItem("newID", `${data.slip.id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// previous button as requested
prevButton.addEventListener("click", () => {
  getQuotes(
    `https://api.adviceslip.com/advice/${localStorage.getItem("oldID")}`
  ).then((data) => {
    console.log(data.slip);
    quoteNum.textContent = data.slip.id;
    quoteText.textContent = data.slip.advice;
  });
});

// change divider img for larger screens
// if(window.innerWidth)

const dividerImgSet = function () {
  if (window.innerWidth > 640) {
    dividerImg.src = "./images/pattern-divider-desktop.svg";
  } else {
    dividerImg.src = "./images/pattern-divider-mobile.svg";
  }
};
window.addEventListener("resize", () => {
  dividerImgSet();
});

dividerImgSet();
