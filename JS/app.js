const quoteNum = document.querySelector("span");
const quoteText = document.querySelector("p");
const getQuoteButton = document.querySelector("#generator");

// console.log(quoteNum.textContent, quoteText.textContent);

const getQuotes = (callBackFunction) => {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      callBackFunction(undefined, data, request.status);
    } else if (request.readyState === 4) {
      callBackFunction("could not fetch data :(", undefined, request.status);
    }
  });

  request.open("GET", "https://api.adviceslip.com/advice");
  request.send();
};
getQuoteButton.addEventListener("click", (e) => {
  getQuotes((err, data, status) => {
    if (data) {
      console.log(data.slip.advice, status);
      quoteNum.textContent = data.slip.id;
      quoteText.textContent = data.slip.advice;
    } else {
      console.log(err, status);
    }
  });
});
