//we need to make the random word generator pull synonyms and produce an array that we'll target the values of to pull into a second api(giphy)

document.querySelector("button").addEventListener("click", getGiphy);

async function getSynonyms() {
  // we target the value from the input so that we can provide it to our synonym thing
  const userInput = document.querySelector("input").value;
  console.log(userInput);
  // console.log(result)

  const url = `https://wordsapiv1.p.rapidapi.com/words/${userInput}/synonyms`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f9687bf967msh5585cf06b28f0a5p16280cjsn0a7c0a095517",
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // const result = await response.text();
    const result = await response.json();
    // console.log(result);
    // console.log(result.synonyms[0], result.synonyms[1], result.synonyms[2])
    return [
      result.word,
      result.synonyms[0],
      result.synonyms[1],
      result.synonyms[2],
    ];
  } catch (error) {
    console.error(error);
  }
}

async function getGiphy() {
  const responseArray = await getSynonyms();
  console.log(responseArray);

  for (const result of responseArray) {
    if (result !== undefined) {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=gngNzPZHsbX9HXOlvMfwK6KU9qm40gb1&q=${result}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("object", data.data);
const randomNum = Math.floor(Math.random() * data.data.length)
    document.querySelector('img').src = data.data[randomNum].images.preview_gif.url
       
        })


        .catch((err) => {
          console.log(`error ${err}`);
        });
    }
    }
  }




