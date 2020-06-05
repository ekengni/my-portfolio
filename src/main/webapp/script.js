// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomAnimeQuote() {
  const quotes =
      ["No matter how deep the night, it always turns to day, eventually.",
       "Don't give up, there's no shame in falling down!",
       "BELIEVE IT!",
       "If a miracle only happens once, " + 
       "then what is it called the second time?",
       "If you don't like the hand that fate's dealt you wiht, fight for a new one!",
       "What's the difference between a king and his horse? INSTINCT!!",
       "Sometimes, we have to look beyond what we want and do what's best.",]
  // Pick a random greeting.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 37.4220, lng: -122.084}, zoom: 16});
}

/** Deprecated */
async function getGreetingAsyncAwait(){
    const response = await fetch('/data');
    const quote = await response.text();
    document.getElementById('quote-container').innerText = quote;
}

async function getServerMessages(){
  const commentLimit = document.getElementById('display-number').value;

  const response = await fetch('/data?num-comments='+ commentLimit);
  const messages = await response.json();
  const messagesListElement= document.getElementById('quote-container');
  messagesListElement.innerHTML = '';

  var i;
  for(i = 0; i < messages.length ; i++){
    messagesListElement.appendChild(
    createListElement(messages[i]));
  }
  
   //Clear List Element and Database
  deleteListElement(messages, messagesListElement);
}

function createListElement(message) {
  const liElement = document.createElement('li');
  liElement.innerText = message;

  /*headElement = document.createElement('h2');
  const headElement.innerTex; */
  return liElement;
}

function deleteListElement(messages, messagesListElement) {
  const deleteButtonContainer = document.getElementById('delete-button');
  deleteButtonContainer.innerHTML='';
  const deleteButtonElement = document.createElement('button');
  
  deleteButtonElement.innerText = 'Clear Comments from Database';
  deleteButtonElement.addEventListener('click', () =>{
    var i;
    for(i = 0; i < messages.length; i++){
      deleteMessages(messages[i]);
    }
    deleteButtonContainer.remove();
    messagesListElement.innerText='';

  });

 deleteButtonContainer.append(deleteButtonElement);
}

function deleteMessages(message) {
    fetch('/delete-data', {method: 'POST'}); 
}


/** Add Delete Function so that after it prints all the comments. There is a delete button
Under the Comment Section. That delete Button will clear t */
