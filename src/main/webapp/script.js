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


