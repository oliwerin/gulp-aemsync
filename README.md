# Gulp AEM Sync
### Description
A simple [aemsync](https://github.com/gavoja/aemsync) wrapper for Gulp. It will automatically upload piped files to CRX. 

### Installation
```
npm install gulp-aemsync
```

### Usage
```javascript
const gulp = require('gulp');
const aemSync = require('gulp-aemsync');
 
gulp.task('aemsync', function() {
    return gulp.src('sampleContent/jcr_root/**/clientlib/css/*.css')
        .pipe(aemSync({
            targets: ['http://admin:admin@localhost:4502'],
            interval: 300,
            exclude: ''
        }));
});
```