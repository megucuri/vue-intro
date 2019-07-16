/*
Problem
We need a way to take the variable product from our JavaScript and have it show up in the h1 of our HTML.

var product = 'Socks';

Use the Console in DevTool to change the variable in real time.

instanceName.dataVariable = 'some other value'.

In this case...
app.products = 'boots'
*/


/*
Create new vue instance. with the name 'app' 
'new Vue' is the root vue instance. Think of it like a heart that powers everything.
 */
var app = new Vue({

    // options to store data or actions
    el: '#app', // Plug it to the DOM, in this case with <div id="app"> using element propety

    data: { // Property of data
        product: 'Socks', // make a variable with the properie of 'Socks'. Think of it as a phone when the {{ variable }} calls, the data will answer.
        description: 'These are wonderful pairs of'
    }
})


// Messing around
var appclass = new Vue({
    el: '.appclass',
    data: {
        product: 'Shose',
        description: 'These are wonderful pairs of'
    }
})
