 <img src="assets/images/sugo-observer-banner.png" alt="Title Banner"
                    height="148"
                    style="height:148px"
/>


<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/sugo-observer
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/sugo-observer
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/sugo-observer.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/sugo-observer
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/sugo-observer.svg?token=aeFzCpBZebyaRijpCFmm
[bd_license_url]: https://github.com/realglobe-Inc/sugo-observer/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/sugo-observer
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/sugo-observer.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/sugo-observer.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/sugo-observer
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/sugo-observer.svg
[bd_npm_url]: http://www.npmjs.org/package/sugo-observer
[bd_npm_shield_url]: http://img.shields.io/npm/v/sugo-observer.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Rmote observer for SUGOS

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>


SUGO-Observer works as a client of [SUGO-Cloud][sugo_cloud_url] and provides accessors to observe the cloud server status.

 

<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.Requirements.md.hbs" Start -->

<a name="section-doc-guides-00-requirements-md"></a>

Requirements
-----

<a href="https://nodejs.org">
  <img src="assets/images/nodejs-banner.png"
       alt="banner"
       height="40"
       style="height:40px"
  /></a>
<a href="https://docs.npmjs.com/">
  <img src="assets/images/npm-banner.png"
       alt="banner"
       height="40"
       style="height:40px"
  /></a>

+ [Node.js ( >=6.x )][node_download_url]
+ [npm ( >=3.x )][npm_url]

[node_download_url]: https://nodejs.org/en/download/
[npm_url]: https://docs.npmjs.com/


<!-- Section from "doc/guides/00.Requirements.md.hbs" End -->

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install sugo-observer --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
#!/usr/bin/env node

/**
 * This is an example to use observer to observe cloud
 */
'use strict'

const co = require('co')
const sugoObserver = require('sugo-observer')

const CLOUD_URL = 'my-sugo-cloud.example.com/observers'

co(function * () {
  let observer = sugoObserver(CLOUD_URL, (data) => {
    console.log('Data changed:', data)
    /* ... */
  })

  yield observer.start() // Start observing
  /* ... */
  yield new Promise((resolve) => setTimeout(resolve, 80000))
  yield observer.stop() // Stop observing
}).catch((err) => console.error(err))


```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/sugo-observer/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [sugos][sugos_url]
+ [sugo-cloud][sugo_cloud_url]

[sugos_url]: https://github.com/realglobe-Inc/sugos
[sugo_cloud_url]: https://github.com/realglobe-Inc/sugo-cloud

<!-- Links End -->
