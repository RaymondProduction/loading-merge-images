# Loading and merge images

This JS script download and merge images.
Now it is download image from **yandex map**.

### Code for download
```
var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
```
uri - URL address, filename - name for file, callback - if done

### Code for merge  image
I use console command montage.
```
montage  -geometry 293x293+0+0  *.png <filename>
```
This command merge images witch has got size 293x293, and saves in the file.

## How use
### Install
```
npm install
```
### Run script
```
node script3.js -x 0 -y 1
```
This code I did for myself
