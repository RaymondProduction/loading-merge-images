# Loading and merge images

This JS script download and merge images.
Now it is download image from **yandex map**.

### Code for download
```js
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
If you do not have montage then install it
```
sudo apt-get install imagemagick
```
### Run script
```
node script.js -x 0 -y 1
```
### Useful links
[Command-line Tools: Montage @ ImageMagick](https://www.imagemagick.org/script/montage.php)
[Command-line Options @ ImageMagick (composite)](https://www.imagemagick.org/script/command-line-options.php#composite)
[Downloading images with node.js](http://stackoverflow.com/questions/12740659/downloading-images-with-node-js)
This code I did for myself
