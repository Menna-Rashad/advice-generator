const quoteNum = document.querySelector("span");
const quoteText = document.querySelector("p");
const getQuoteButton = document.querySelector("#generator");
const dividerImg = document.querySelector("#divider img");
const apiLink = "https://api.adviceslip.com/advice";

const getQuotes = async (dataSource) => {
  const response = await fetch(apiLink);
  const data = await response.json();
  return data;
};

getQuoteButton.addEventListener("click", (e) => {
  getQuotes(apiLink)
    .then((data) => {
      console.log(data.slip);
      quoteNum.textContent = data.slip.id;
      quoteText.textContent = data.slip.advice;
    })
    .catch((err) => {
      console.log(err);
    });
});

getQuotes(apiLink)
  .then((data) => {
    console.log(data);
    quoteNum.textContent = data.slip.id;
    quoteText.textContent = data.slip.advice;
  })
  .catch((err) => {
    console.log(err);
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
