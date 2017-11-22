Bootstrap 4 / Gulp project skeleton
===================================

A skeleton project to manage Bootstrap v4.0.0-beta.2 with Gulp


Overview
--------

This skeleton allows you to only include the parts of Bootstrap that you need and automatically cache busts the compiled JS and CSS.

It assumes that you are using scss to manange your css.

Install
-------

Run `npm install` from the root of your project

Then `gulp watch`

How it works
------------

The gulpfile concatenates and then minifies the CSS and JS files and then automatically creates files with cache busted names e.g. `base-8e54c611a4.css`

The `gulp watch` command independantly watches the CSS and JS so that a change to one does not automatically update both files.

The name of current CSS and JS files respectively are stored in:

 - `manifest-css.json`
 - `manifest-js.json`
 
 e.g
 
 ```
{
 "base.css": "base-8e54c611a4.css"
}
```

The manifest files can then be read and the resource paths in the HTML set accordingly. See example index.php and functions.php for an example.





