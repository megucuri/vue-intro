/*
Goal:
We’ ll use attribute - binding in order to display an image and attach alt text to it based on values from our instance’ s data.

Problem:
We want an image to show up on our page, but we need it to be dynamic.
We want to be able to update that image in our data and have the image automatically update on the page.
Since our src attribute is what pulls the image into this element, we’ ll need data to be bound to src so that we can dynamically display an image based on the data at that time.
*/


/*
Vue instance. 
The heart that powers everything.
*/
var app = new Vue({
    // options to store data or actions
    el: '#app', // Plug it to the DOM

    data: { // Property of data
        product: '絨毯', // Like a phone when the {{ variable }} calls, the data will answer.
        description: 'こちらは素晴らしい',
        image: './assets/images/japanese-carpets.jpg',
        link: './assets/images/japanese-carpets.jpg'
    }
})
