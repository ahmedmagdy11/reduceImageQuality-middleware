# reduceImageQuality-middleware
a middlerware used to to reduce image/s quality on upload


**Notes:**
this middleware to be used with [multer](https://www.npmjs.com/package/multer)

## installation
- need [ffmpeg](ffmpeg.org) install on your machine or production server.
- git pull (this middlware) inside your project directoy.
- const reduceImageQuality = `require ("reduceImageQuality-middleware/index")`.

## Usage 

``` 
app.post('/profile', upload.single("myCoolImage), function (req, res, next) {
  
  // after doing the fancy stuff in your Database 
  //sending a res with status 202 maybe ?_? 
  res.status(202).send("your image has been successfully uploaded"); 
  next(); // this one is important
},reduceImageQuality);

```


***Note:-*** this will work with whatever multer config you are doing multiple images or single image.


Thanks for coming to my ted-talk 
Enjoy ~ 
