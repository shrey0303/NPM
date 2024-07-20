# Manager-of-Cookies
An object containing four methods for managing cookies. The main methods set and get. And the secondary methods check and destroy.

## Installation
To run this package locally in Your project

1. Clone this Repo. 
```bash
$ git clone https://github.com/shrey0303/NPM.git
```

2. Move to Root directory of your cloned package and type
```bash
$ npm link
```
This creates a symbolic link globally on your system, allowing you to use this package in other projects.

3. Now move to your project and type

```bash
$ npm link manager-of-cookies
```
4. If you want to unlink package 
```bash
$ npm unlink manager-of-cookies
```
Alternative way is to specify the path in the package.json file of your project.

## Usage
```js
const cookie = require('manager-of-cookies')

cookie.set(key, value, opions?)
cookie.get(key, initalValue)
cookie.destroy(key)
cookie.check(key)
```

### Set
Format and sets the cookie according to params. 
Takes three parameters, _key_ (string), _value_ (any) and the optional _options_ (object).

> **Options**
> * _days_ (number):
Expiration date of the cookie **in days** (@default 7) 
> * _path_ (string):
Indicates a URL path. (@default '/')

### Get
Gets the cookies value by keye.
Takes two parameters, _key_ (string) and the optional _initalValue_. Returns value if defined otherwise _initalValue_.

### Check
> Info: Wrapper around _get_.
Checks if a cookie has been set by given key. 
Takes one param, _key_. Returns _Boolean_. 

### Destroy
> Info: Wrapper around _set_, setting the expiration date to yesterday.
Destroys a cookie. 
Takes one param, _key_.
