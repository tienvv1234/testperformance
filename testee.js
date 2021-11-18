//   function Request() {  
//     var self = this;  

//     this.bigData = new Array(1e6).join('*');  

//     this.send = function(data) {  
//       console.log(data);  
//     };  

//     this.onError = function(data) {  
//       self.send("извините, у нас проблема");  
//     };  
//   }  

//   setInterval(function() {  
//     var request = new Request();  
//     console.log(process.memoryUsage().heapUsed / (1024 * 1024));  
//   }, 200); 

// memory leak
// var EventEmitter = require('events').EventEmitter;  
  
// var db = new EventEmitter();  

// function Request() {
//     var self = this;

//     this.bigData = new Array(1e6).join('*');

//     this.send = function (data) {
//         console.log(data);
//     };

//     db.on('data', function (info) {
//         self.send(info);
//     });
// }

// setInterval(function () {
//     var request = new Request();
//     console.log(process.memoryUsage().heapUsed / (1024 * 1024));
//     console.log(db);
// }, 200);


var EventEmitter = require('events').EventEmitter;  
  
var db = new EventEmitter();  

function Request() {  
    var self = this;  
    
    this.bigData = new Array(1e6).join('*');  
    
    this.send = function(data) {  
      console.log(data);  
    };  
    
    function onData(info) {  
      self.send(info);  
    }  
    
    this.end = function() {  
      db.removeListener('data', onData)  
    };  
    
    db.on('data', onData);  
  }  
    
  setInterval(function() {  
    var request = new Request();  
    // ...  
    request.end();  
    console.log(process.memoryUsage().heapUsed);  
    console.log(db);  
  }, 200);  