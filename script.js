var fs = require('fs');
var request = require('request');
var cmd = require('node-cmd');

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var zero = function(k) {
  if (k==0) {stK='000';};
  if (k > 0 && k < 10) {
    stK = '00'+k;
  };
  if (k > 9 && k < 100) {
    stK = '0'+k;
  };
  if (k > 99) {
    stK = k;
  };

  return stK;

};


var x = 307141; //307112; // delta 195;
var y = 177333; //177309; //final 177323    (177405);
var stX;
var stY;
var stK;
var ext = '.png';
var k = 0;
var shiftX = Number(parametr('-x'));
var shiftY = Number(parametr('-y'));
console.log('image/'+zero(shiftX)+'-'+zero(shiftY)+'/..');
var row = 20;
var col = 20;
console.log('1. Step - Clean');
cmd.run('rm *.png');
 console.log('2. Step - Download');
for (var j = 0; j < row; j++) {
  for (var i = 0; i < col; i++) {
    stX = x + i + col * shiftX;
    stY = y + j + row * shiftY;
    k++;
    stK = zero(k);
    var p = 0;
    download('https://vec02.maps.yandex.net/tiles?l=map&v=17.03.20-0&x=' + stX + '&y=' + stY + '&z=19&scale=1.1458333730697632&lang=uk_UA', stK + ext, function() {
      p++;
      console.log(((p / (row * col)) * 100).toFixed(2) + '%');
      if (ext == '.png' && p == row * col) {
        console.log('Download - ok');
        console.log('3. Step - Plot');
        cmd.run('mkdir image/');
        cmd.run('mkdir image/'+zero(shiftX)+'-'+zero(shiftY)+'/');
        cmd.get(
          'montage -geometry 293x293+0+0  *.png ./image/'+zero(shiftX)+'-'+zero(shiftY)+'.png',
          function(data) {
            console.log('plot result =>',data);
            cmd.run('mv *.png ./image/'+zero(shiftX)+'-'+zero(shiftY)+'/');
            console.log('Mission completed');
          }
        );
      }
    });
  };
};


// схема
// https://vec04.maps.yandex.net/tiles?l=map&v=17.03.20-0&x=307141&y=177333&z=19&scale=1.1458333730697632&lang=uk_UA
// https://vec02.maps.yandex.net/tiles?l=map&v=17.03.20-0&x=307212&y=177432&z=19&scale=1.1458333730697632&lang=uk_UA
// гибрид
//https://sat02.maps.yandex.net/tiles?l=sat&v=3.303.0&x=307142&y=177333&z=19&lang=uk_UA
// спутник
//https://sat01.maps.yandex.net/tiles?l=sat&v=3.303.0&x='+stX+'&y='+stY+'&z=19&lang=ru_UA'

function parametr(par) {
  var res;
  process.argv.forEach(function(item, i, arr) {
    if (par == item) {
      res = process.argv[i + 1];
    }
  });
  return res;
}
