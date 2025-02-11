const xhttp = new XMLHttpRequest();
const topicTitlesList = document.querySelector(".topic-titles-list");
const topicTitleHeader = document.querySelector(".topic-definitions-title");

topicTitlesList.innerHTML = "";

xhttp.onload = function () {
  let titlesList = JSON.parse(xhttp.responseText);
  let htmlString = "";
  titlesList.forEach((item, index) => {
    htmlString += createTopicTitleItem(item.id, item.title);
    if(index === 0){
      topicTitleHeader.innerHTML = item.title;
      getTopicDefinitionsByTopicTitleId(item.id);
    }
  });



  topicTitlesList.innerHTML = htmlString;

  // DEV ONLY -- DELETED SOON
  for(let i = 0; i < 10; i++) {
    topicTitlesList.innerHTML += htmlString;
  }


  const topicLinks = document.querySelectorAll(".topic-title a");
  topicLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const id = link.getAttribute("data-id");
      topicTitleHeader.innerHTML = link.innerHTML;
      getTopicDefinitionsByTopicTitleId(id)
    });
  });
}




xhttp.open("GET", "api/v1/topics");
xhttp.send();



function createTopicTitleItem(id, title) {
  return `
    <li class="topic-title">
      <a href="#" data-id="${id}">${title}</a>
    </li>
  `;
}

function createTopicDefinitionItem(id, definition) {
 return `
  <div class="topic-definition-card">
    <div class="topic-definition-text">
      ${definition}
    </div>
  </div>
 `;
}

function getTopicDefinitionsByTopicTitleId(topicTitleId) {
  const request = new XMLHttpRequest();

  request.onload = () => {
    const definitionsList = JSON.parse(request.responseText);

    const definitionCards = document.querySelector(".topic-definition-cards");
    definitionCards.innerHTML = "";

    let htmlString = "";

    definitionsList.forEach(item => {
      htmlString += createTopicDefinitionItem(item.id, item.definition);
    });

    definitionCards.innerHTML = htmlString;

    // DEV ONLY -- DELETED SOON
    for(let i = 0; i < 10; i++) {
      definitionCards.innerHTML += htmlString;
    }

  }

  request.open("GET", `api/v1/topics/definitions/${topicTitleId}`)
  request.send();
}

