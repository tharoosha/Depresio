

// # The JSON string
var json_str = {'result': '["090fexGQyBy6tjejeKZSAN", "090fexGQyBy6tjejeKZSAN", "090fexGQyBy6tjejeKZSAN", "090fexGQyBy6tjejeKZSAN"]'}

// Parse the JSON string
// var jsonData = JSON.parse(json_str);

// Access the list inside the 'result' key
var resultList = JSON.parse(json_str.result);

// Now you can work with the list
resultList.forEach(function(item) {
  console.log(item);
});