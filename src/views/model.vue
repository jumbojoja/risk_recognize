<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Image Moderation API Demo</title>
  <meta content="IE=edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="See how our Image moderation API works by testing it directly from your browser" />
  <link rel="canonical" href="https://sightengine.com/demo" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <link rel="shortcut icon" type="image/png" href="https://sightengine.com/favicon.ico" sizes="16x16" />
  <link rel="shortcut icon" type="image/png" href="https://sightengine.com/favicon32.ico" sizes="32x32" />
  <link rel="shortcut icon" type="image/png" href="https://sightengine.com/favicon64.ico" sizes="64x64" />
  <link rel="shortcut icon" type="image/png" href="https://sightengine.com/favicon128.ico" sizes="128x128" />
  <style>
    * {
      margin: 0;
      padding: 0
    }

    html {
      height: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%
    }

    b,
    strong {
      font-weight: bold;
      -webkit-font-smoothing: antialiased
    }

    body {
      background-color: #f6f9fc;
      height: 100%;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none
    }

    ::-webkit-scrollbar {
      display: none
    }

    body,
    select,
    option,
    input,
    textarea {
      color: #222;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-weight: 400;
      text-rendering: optimizelegibility
    }

    a {
      color: #367f8e;
      text-decoration: none
    }

    a.cta {
      font-weight: 600
    }

    a img {
      border: none
    }

    select,
    option,
    input[type=text],
    input[type=password],
    input[type=email],
    input[type=url] {
      font-size: 18px;
      padding: 10px 12px;
      width: 300px;
      max-width: 100%;
      box-sizing: border-box;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 3px;
      border: 1px solid #ddd
    }

    textarea {
      padding: 10px 12px;
      font-size: 16px;
      border: 1px solid #ddd
    }

    p,
    table,
    ul,
    ol {
      font-size: 18px;
      color: #445060;
      margin-bottom: 6px;
      font-weight: 400
    }

    p,
    ul {
      line-height: 1.4em
    }

    li {
      list-style-type: none
    }

    label {
      margin-top: 14px;
      display: block
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      cursor: default;
      font-weight: 700;
      color: #222;
      -webkit-font-smoothing: antialiased;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    }

    h1 {
      font-family: "Mona Sans", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 10px;
      color: #1b1b1b
    }

    h2 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 40px 0
    }

    h3 {
      font-size: 24px
    }

    h4 {
      font-size: 18px;
      margin: 20px 0 10px 0
    }

    h5 {
      font-size: 24px;
      margin: 30px 0 10px 0
    }

    h6 {
      font-size: 18px;
      font-weight: normal;
      margin: 20px 0 10px 0
    }

    h1 span.colorful,
    h2 span.colorful {
      color: #3235ba
    }

    @supports(-webkit-background-clip: text) or (background-clip: text) {

      h1 span.colorful,
      h2 span.colorful {
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(89.72deg, #3235ba 5%, rgb(80, 140, 255) 28%, rgb(0, 159, 250) 40%, #12849a 93%);
        -webkit-text-fill-color: rgba(0, 0, 0, 0)
      }

      h1 span.colorful-light {
        background-image: linear-gradient(89.72deg, #ffa0f0 5%, rgb(179, 205, 255) 28%, rgb(191, 232, 255) 40%, #d4a1ff 93%)
      }
    }

    #menu {
      color: #fff;
      margin-top: 0;
      right: 40px;
      position: absolute;
      display: block
    }

    #menu li {
      display: inline;
      padding: 0 6px
    }

    .show-menu-icon {
      display: none
    }

    #menu a.headlk {
      font-size: 14px;
      font-weight: bold;
      line-height: 48px;
      white-space: nowrap;
      letter-spacing: .1px;
      -webkit-font-smoothing: antialiased
    }

    #menu .dd-prod-title {
      font-size: 15px;
      font-weight: 400
    }

    #menu .dd-prod-desc {
      font-size: 12px;
      line-height: 20px
    }

    #menu a {
      display: inline-block;
      padding: 6px 12px
    }

    #menu .btn {
      line-height: 1.42857
    }

    #menu-link img {
      margin: 17px 5px 0 0
    }

    .dropdown {
      position: relative;
      display: inline-block;
      padding-bottom: 5px
    }

    #menu li:hover a.headlk {
      text-decoration: underline;
      color: #3236ba
    }

    .dropdown-content {
      display: none;
      z-index: 1;
      transition: all .3s ease-in-out 0s, visibility 0s linear .3s, z-index 0s linear .01s;
      position: absolute;
      background-color: #fff;
      width: 350px;
      border-radius: 5px;
      border: 1px solid #f1f1f1;
      box-shadow: 0px 8px 16px -16px rgba(0, 0, 0, .5);
      padding: 0px;
      z-index: 1;
      opacity: 0
    }

    .dropdown:hover .dropdown-content {
      display: block;
      opacity: 1
    }

    #menu .dropdown-content-list li {
      padding: 0px;
      display: block;
      cursor: pointer
    }

    #menu .dropdown-content-list li:hover {
      background-color: #f9f9fd
    }

    #banner .dropdown-content a {
      color: #4d4845
    }

    li.dropdown a {
      display: inline
    }

    .dropdown svg {
      fill: #0b1e24
    }

    #menu a:not(.btn) {
      color: #0b1e24
    }

    #banner.whitetext #menu .dropdown-content-list li a {
      color: #0b1e24
    }

    #banner.whitetext #menu a {
      color: #fff
    }

    #banner.whitetext .dropdown svg {
      fill: #fff
    }

    @media(max-width: 850px) {
      #menu {
        display: none
      }

      .show-menu-icon {
        display: inline;
        line-height: 55px;
        position: absolute;
        right: 10px
      }
    }

    #mobile-nav-container {
      display: none;
      padding: 10px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 150;
      box-sizing: border-box
    }

    .fixed-banner #mobile-nav-container {
      position: fixed;
      height: 100vh;
      overflow-y: scroll;
      background-color: rgba(200, 210, 220, .4)
    }

    .fixed-banner.show-mobile-nav {
      overflow: hidden
    }

    #mobile-nav-container.active {
      display: block
    }

    #mobile-nav {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3);
      background: #fff
    }

    #mobile-nav section {
      padding: 20px
    }

    #mobile-nav h2 {
      text-transform: uppercase;
      color: #90aabb;
      margin: 10px 0 10px 0;
      font-size: 12px
    }

    #mobile-nav ul {
      display: grid;
      grid: auto/repeat(2, 1fr);
      margin: 0
    }

    #mobile-nav ul.onecolumn {
      grid: auto/repeat(1, 1fr)
    }

    #mobile-nav li,
    #mobile-nav li a {
      color: #333;
      line-height: 18px
    }

    #mobile-nav li {
      font-size: 16px;
      font-weight: 400;
      padding: 8px 0
    }

    #mobile-closemenu {
      position: absolute;
      top: 8px;
      right: 8px;
      border: none;
      outline: none;
      background: none
    }

    #mobile-nav .separator {
      width: 50%;
      margin: auto;
      border-top: 1px solid #f0f0f0
    }

    #ov-container {
      width: 100%;
      position: relative;
      overflow: hidden;
      min-height: 70%;
      min-height: -webkit-calc(100% - 300px);
      min-height: -moz-calc(100% - 300px);
      min-height: calc(100% - 300px)
    }

    .fixed-banner #ov-container {
      margin-top: 90px
    }

    .fixed-banner #banner {
      z-index: 100;
      position: fixed;
      top: 0;
      transition: all 300ms
    }

    .container {
      width: 1100px;
      margin: 0 auto;
      padding: 30px 0 60px 0;
      position: relative;
      box-sizing: border-box
    }

    .container-menu {
      padding: 0 40px
    }

    #title {
      position: absolute;
      display: block;
      top: 15px
    }

    #banner {
      height: 60px;
      width: 100%;
      cursor: default;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(41, 70, 97, .15)
    }

    #banner.transparent {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none
    }

    #banner.gradient {
      background-color: rgba(0, 0, 0, 0);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
      box-shadow: none
    }

    .subh2 {
      font-size: 16px;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      margin-bottom: 30px
    }

    section.center,
    section.center p {
      text-align: center
    }

    section.title .container {
      padding-top: 60px
    }

    section.title h1 {
      font-size: 38px;
      color: #33312f
    }

    section.dark {
      color: #fff;
      background-color: #12849a;
      -webkit-font-smoothing: antialiased
    }

    .row:after {
      display: block;
      clear: both;
      content: " "
    }

    .col2,
    .col2-700,
    .col2-900 {
      width: 50%;
      position: relative
    }

    .col3 {
      width: 33.33%
    }

    .col2,
    .col2-700,
    .col2-900,
    .col3 {
      float: left;
      padding: 0;
      box-sizing: border-box
    }

    .col2:first-child,
    .col2-700:first-child,
    .col2-900:first-child {
      padding-right: 20px
    }

    .col2:last-child,
    .col2-700:last-child,
    .col2-900:last-child {
      padding-left: 20px
    }

    .col3:first-child {
      padding-right: 20px
    }

    .col3:last-child {
      padding-left: 20px
    }

    .col2 h6 {
      text-align: center;
      margin-bottom: 30px
    }

    section.dark p,
    section.dark ul {
      color: #fff
    }

    .box {
      margin-top: 20px;
      background-color: #fff;
      padding: 30px;
      border: 1px solid #eee;
      box-shadow: 0 6px 15px rgba(50, 50, 93, .1), 0 2px 6px rgba(0, 0, 0, .07);
      line-height: 23px
    }

    .box.box-sm,
    .box.box-xs {
      margin-left: auto;
      margin-right: auto
    }

    .box.box-sm {
      max-width: 600px
    }

    .box.box-xs {
      max-width: 400px
    }

    .box-padded {
      padding: 50px
    }

    .box.box-noborder {
      border-width: 0
    }

    .box.transparent {
      margin-top: 0;
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;
      border: none
    }

    @media(max-width: 500px) {

      .col2,
      .col2-700,
      .col2-900 {
        width: 100%;
        padding: 0 !important
      }
    }

    @media(max-width: 700px) {
      .col2-700 {
        width: 100%;
        padding: 0 !important
      }
    }

    @media(max-width: 1120px) {
      .container {
        width: 100%
      }

      .container,
      .container-menu {
        padding-left: 10px;
        padding-right: 10px
      }

      .box {
        margin-left: -10px;
        margin-right: -10px;
        padding: 20px 10px
      }

      .box.box-padded {
        padding: 40px
      }
    }

    @media(max-width: 880px) {
      .col2-900 {
        width: 100%;
        padding: 0 !important
      }
    }

    @media(max-width: 700px) {
      .box.box-padded {
        padding: 20px
      }

      .col3 {
        width: 100%;
        padding: 0 !important
      }

      #title {
        left: 5px
      }
    }

    .btn-link {
      background: none;
      border: none;
      padding: 0;
      text-decoration: underline;
      cursor: pointer
    }

    .btn {
      background-color: rgba(0, 0, 0, 0);
      display: inline-block;
      color: #222;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.43;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid #aaa;
      border-radius: 4px;
      transition: all .15s ease;
      box-shadow: 0 4px 6px rgba(50, 93, 63, .11), 0 1px 3px rgba(0, 0, 0, .08);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none
    }

    .btn:hover {
      opacity: .9;
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50, 93, 63, .1), 0 3px 6px rgba(0, 0, 0, .08)
    }

    .btn-sm {
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 13px
    }

    .btn-lg {
      font-size: 17px;
      padding: 8px 16px;
      border: 2px solid #333;
      border-radius: 5px
    }

    .btn-xl {
      font-size: 20px;
      padding: 10px 20px;
      border: 3px solid #333;
      border-radius: 6px
    }

    .btn-lg,
    .btn-xl {
      -webkit-font-smoothing: antialiased;
      font-weight: 700
    }

    .btn-white {
      color: #fff;
      border-color: #fff
    }

    .btn-dark {
      border-color: #444
    }

    .btn-green {
      color: #fff;
      border-color: #12849a;
      background-color: #12849a
    }

    .btn-purple {
      color: #fff;
      border-color: #3235ba;
      background-color: #3235ba
    }

    .btn:disabled {
      opacity: .5;
      cursor: default
    }

    .btn:disabled:hover {
      opacity: .5;
      transform: none
    }

    .btn-red {
      color: #fff;
      background-color: #d9534f;
      border-color: #d43f3a
    }

    .btn-red:hover {
      color: #fff;
      background-color: #c9302c;
      border-color: #ac2925
    }

    footer {
      background-color: #202a32;
      padding: 50px 0 30px 0;
      -webkit-font-smoothing: antialiased;
      position: relative;
      z-index: 5
    }

    footer,
    footer a,
    footer p {
      color: #fff
    }

    footer .foot-struc {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr
    }

    footer h6 {
      color: #eee;
      text-transform: uppercase;
      font-size: .9em;
      font-weight: 600;
      letter-spacing: .5px
    }

    footer .foot-col ul,
    footer .foot-col h6 {
      margin: 10px 0 20px 30px;
      text-align: left
    }

    footer .foot-col li a {
      font-size: 15px;
      display: inline-block;
      line-height: 1.7em;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap
    }

    footer p.bottom {
      margin-top: 40px;
      color: #949da2;
      font-size: 14px;
      text-align: center
    }

    @media(max-width: 900px) {
      footer .foot-struc {
        grid-template-columns: 1fr 1fr 1fr
      }
    }

    @media(max-width: 600px) {
      footer .foot-struc {
        grid-template-columns: 1fr 1fr
      }
    }

    @media(max-width: 450px) {
      footer .foot-struc {
        grid-template-columns: 1fr
      }
    }

    .label {
      display: inline;
      padding: .2em .6em .3em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25em
    }

    .label-success {
      background-color: #5cb85c
    }

    .label-warning {
      background-color: #f0ad4e
    }

    .label-danger {
      background-color: #d9534f
    }

    .label-default {
      background-color: #777
    }

    .label-primary {
      background-color: #337ab7
    }

    ul.bullet li {
      margin-left: 20px;
      list-style-type: circle
    }

    table {
      border-collapse: collapse;
      margin: 20px 0
    }

    .bordered tr {
      border-bottom: 1px solid #ddd
    }

    .bordered tr:last-child {
      border-bottom-width: 0
    }

    .bordered thead {
      color: #777;
      font-size: .75em;
      text-transform: uppercase
    }

    .bordered thead tr:last-child {
      border-bottom: 2px solid #ccc
    }

    .bordered td {
      padding: .5em 10px
    }

    table.bordered.small {
      font-size: .94em
    }

    .rowed {
      min-width: 80%;
      margin-left: auto;
      margin-right: auto
    }

    .rowed tbody tr:nth-child(even) {
      background: #fbfdfe
    }

    .invalidinput {
      background-color: #fee
    }

    .invalidlabel,
    .invalidlabelbg {
      color: #c44
    }

    .invalidlabelbg {
      background-color: #fee
    }
  </style>
  <meta itemprop="name" content="Image Moderation API Demo">
  <meta itemprop="description" content="See how our Image moderation API works by testing it directly from your browser">
  <meta itemprop="image" content="https://sightengine.com/assets/img/covers/social.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sightengine">
  <meta name="twitter:title" content="Image Moderation API Demo">
  <meta name="twitter:description" content="See how our Image moderation API works by testing it directly from your browser">
  <meta name="twitter:creator" content="@sightengine">
  <meta name="twitter:image:src" content="https://sightengine.com/assets/img/covers/social.jpg">
  <meta name="twitter:domain" content="sightengine.com">
  <meta property="og:title" content="Image Moderation API Demo" />
  <meta property="og:url" content="https://sightengine.com/demo" />
  <meta property="og:description" content="See how our Image moderation API works by testing it directly from your browser" />
  <meta property="og:site_name" content="Sightengine" />
  <meta property="og:image" content="https://sightengine.com/assets/img/covers/social.jpg">
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <script>
    ! function(a) {
      var b = a.onerror;
      a.onerror = function(c, d, e, f, a) {
        if ("function" == typeof ga) {
          var g = c;
          void 0 !== a && void 0 !== a.message && (g = a.message), gtag("event", "exception", {
            description: g += " @ " + d + ":" + e + ":" + f,
            fatal: !1
          })
        }
        return "function" == typeof b && b(c, d, e, f, a)
      }
    }(window)
  </script>
  <script defer data-domain="sightengine.com" src="https://plausible.io/js/script.js"></script>
  <script>
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    if (getCookie('SE_LG') == 2) window.location.replace("https://dashboard.sightengine.com/demo");
  </script>
  <style>
    .card-right-content,
    .container-demo {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch
    }

    .card-right-signup a,
    .tag.bad,
    .tag.good {
      color: #fff;
      -webkit-font-smoothing: antialiased
    }

    .card-right-content,
    .carousel,
    .container-demo {
      -webkit-overflow-scrolling: touch
    }

    #or,
    .tag {
      color: #222
    }

    .card-right,
    .pull-right {
      float: right
    }

    .card-right-signup a,
    .fileUpload span,
    .form-group-button,
    .notification,
    .tag.bad,
    .tag.good {
      -webkit-font-smoothing: antialiased
    }

    .arrow,
    .card-left,
    .card-right,
    .carousel-image,
    .modal-close,
    .notification-message,
    .tag {
      display: inline-block
    }

    .boxe,
    .face-feature,
    .face-img {
      box-sizing: content-box;
      position: absolute
    }

    h2 {
      font-weight: 400
    }

    * {
      box-sizing: border-box
    }

    ul {
      list-style: none
    }

    .container-demo {
      width: 100%;
      top: 0
    }

    .embed .container-demo {
      padding: 0 0 134px
    }

    .no-carousel.embed .container-demo {
      padding-bottom: 0
    }

    .card-left,
    .card-right {
      background-color: #fff
    }

    .card-left {
      width: 66%;
      vertical-align: top
    }

    .card-left-body {
      text-align: center;
      padding-top: 30px;
      position: relative
    }

    .card-right {
      width: 34%;
      border-left: 1px solid #ddd;
      position: relative
    }

    .card-right-content {
      height: 100%
    }

    .card-right-header {
      padding: 15px;
      border-bottom: 1px solid rgba(28, 40, 56, .25)
    }

    .card-right-header-title {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 100;
      opacity: .8
    }

    .card-right-body {
      padding: 0 15px 50px
    }

    .card-right-body h2 {
      font-size: 12px;
      margin: 17px 0 6px;
      text-transform: uppercase;
      font-weight: 700;
      opacity: .8
    }

    .card-right-signup {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      background-color: #12849a
    }

    .card-right-signup a {
      display: block;
      line-height: 36px;
      width: 100%;
      text-transform: uppercase;
      font-size: 16px;
      text-decoration: none
    }

    .tag {
      background: #eee;
      border-radius: 16px;
      font-size: 15px;
      height: 32px;
      line-height: 32px;
      padding: 0 13px;
      margin: 5px 10px 5px 0;
      cursor: default;
      transition: background-color 150ms linear
    }

    #or,
    .arrow {
      height: 50px
    }

    .arrow,
    .btn,
    .carousel-btn,
    .form-group-button,
    .modal-close,
    .score-container {
      cursor: pointer
    }

    .tag.good {
      background-color: #12849a
    }

    .tag.bad {
      background-color: #db7539
    }

    .tag .score {
      font-size: 12px;
      margin-left: 4px
    }

    #or,
    .fileUpload.btn {
      margin: auto;
      text-align: center
    }

    .arrow {
      position: relative;
      width: 50px;
      border: 1px solid rgba(28, 40, 56, .15);
      border-radius: 50%;
      color: #4d4845;
      box-shadow: 0 4px 6px rgba(50, 50, 93, .1), 0 1px 3px rgba(0, 0, 0, .06)
    }

    .arrow svg {
      position: absolute;
      top: 50%;
      margin-top: -11px;
      left: 50%;
      margin-left: -11px
    }

    .arrow svg path {
      fill: #333
    }

    .arrow-container {
      margin-top: 10px;
      position: absolute;
      width: 100%;
      bottom: 0
    }

    .no-carousel .arrow-container,
    .no-carousel .carousel {
      display: none
    }

    .arrow-right {
      margin-left: 5px
    }

    .arrow-left {
      margin-right: 5px
    }

    .carousel {
      width: 100%;
      bottom: 0;
      box-shadow: -10px 0 10px 0 rgba(0, 0, 0, .25);
      padding: 12px 120px 12px 80px;
      height: 100px;
      background-color: #fff;
      position: fixed;
      overflow-x: scroll;
      white-space: nowrap;
      z-index: 5
    }

    .carousel-btn,
    .carousel-image {
      width: 48px;
      height: 48px;
      margin-top: 15px
    }

    .carousel-image-active {
      border: 3px solid #5990d6;
      padding: 2px
    }

    .carousel-btn {
      color: #1c2838;
      background-color: #fff;
      border: 1px solid rgba(28, 40, 56, .25);
      padding: 8px;
      position: absolute
    }

    #or,
    .fileUpload {
      position: relative
    }

    .fa.carousel-btn-icon {
      padding-left: 5px;
      padding-top: 3px;
      font-size: 20px
    }

    @media (min-width:781px) {
      .carousel-image-container {
        margin-right: 30px
      }
    }

    .carousel-image-container {
      display: inline-block;
      margin-right: 20px;
      cursor: pointer
    }

    .carousel-image {
      background-color: rgba(0, 0, 0, .2);
      background-size: cover;
      background-position: center center;
      padding: 10px
    }

    #or,
    .form-group-input {
      width: 300px;
      font-size: 14px
    }

    #or {
      line-height: 20px
    }

    #or::after,
    #or::before {
      position: absolute;
      width: 130px;
      height: 1px;
      top: 11px;
      background-color: rgba(28, 40, 56, .25);
      content: ''
    }

    #or::before {
      left: 0
    }

    #or::after {
      right: 0
    }

    .form-group-input {
      padding: 0 10px;
      border: 1px solid #ddd;
      line-height: 38px;
      outline: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px
    }

    .form-group-button {
      background: #12849a;
      color: #fff;
      border: 0;
      -webkit-appearance: none;
      font-size: 16px;
      line-height: 43px;
      padding: 1px 8px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      text-transform: uppercase
    }

    .fileUpload input.pane-upload {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      font-size: 20px;
      cursor: auto;
      opacity: 0
    }

    .fileUpload.btn {
      cursor: auto;
      display: block;
      font-size: 16px
    }

    .fileUpload {
      overflow: hidden;
      margin-left: 90px;
      margin-top: -10px;
      max-width: 200px
    }

    .modal,
    .notification {
      position: fixed;
      top: 0;
      left: 0
    }

    .modal {
      z-index: 900;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, .55);
      text-align: center;
      padding: 30px
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto;
      padding: 50px 30px;
      width: 500px;
      max-width: 90%;
      text-align: left;
      box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .6);
      border-radius: 4px
    }

    .modal-close {
      margin-top: -58px;
      margin-right: -20px;
      fill: #999999;
      float: right
    }

    .modal-item {
      margin: 0 0 20px
    }

    .modal-input-url {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px
    }

    label {
      margin-bottom: 5px;
      font-weight: 700;
      color: #575260;
      font-size: 13px
    }

    .btn-primary {
      background-color: #12849a;
      border: 1px solid #12849a;
      color: #fff
    }

    .notification {
      right: 0;
      color: #fff;
      font-size: 14px;
      padding: 15px 30px;
      font-weight: 600;
      z-index: 10002
    }

    .notification-message {
      margin-top: 5px
    }

    .notification.notification-error {
      background-color: #f95c3c
    }

    .score-container {
      opacity: .7;
      text-transform: uppercase;
      font-size: 10px;
      line-height: 20px
    }

    .spinner {
      enable-background: new;
      margin: 50px auto auto;
      height: 50px;
      width: 100%;
      display: box
    }

    .image-container-inside {
      display: inline-block;
      position: relative
    }

    .image-container {
      display: inline-block;
      max-width: 95%
    }

    .boxe,
    .face-img {
      border: 3px solid #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, .25);
      margin-left: -3px;
      margin-top: -3px;
      opacity: .75;
      transition: border-color 150ms linear, opacity 150ms linear
    }

    @media(max-width:1100px) {
      .card-left {
        width: 59.7%
      }

      .card-right {
        width: 40%
      }
    }

    @media (max-width:780px) {
      .card-right-signup {
        bottom: 84px
      }

      .no-carousel .card-right-signup {
        bottom: 0
      }

      .card-left-body,
      .container-demo {
        padding: 0
      }

      .card-left,
      .card-right {
        width: 100%;
        display: block
      }

      .card-right {
        border-top: 1px solid rgba(28, 40, 56, .25)
      }

      .card-left-body img,
      .card-left-body video {
        max-width: 100%;
        max-height: 300px
      }

      .embed .card-left-body img,
      .embed .card-left-body video {
        max-height: 200px
      }

      .arrow-container {
        display: none
      }

      .carousel .carousel-item {
        height: 60px;
        width: 60px;
        display: inline-block
      }

      .carousel {
        padding: 4px 18px;
        height: 85px
      }

      .card-right-body {
        padding-bottom: 150px
      }

      #or,
      .form-group-input {
        width: 200px
      }

      #or::after,
      #or::before {
        width: 80px
      }

      .modal {
        padding: 2px
      }

      .embed .container-demo {
        padding: 0 0 85px
      }
    }

    @media (max-width:500px) {
      #or {
        width: 120px
      }

      #or::after,
      #or::before {
        width: 40px
      }

      .form-group-button {
        display: block;
        margin: 20px auto;
        border-radius: 4px;
        line-height: 36px;
        padding: 0 20px
      }
    }

    @media (min-width:781px) {

      .card-left,
      .card-left-body,
      .card-right,
      .card-right-content,
      .container-demo {
        height: 100%
      }

      .container-demo {
        position: absolute;
        padding: 110px 60px 164px
      }

      .card-left {
        padding-bottom: 20px
      }

      #card-left-image {
        max-width: 100%;
        max-height: 130px
      }

      .embed #card-left-image {
        max-height: 210px
      }

      .card-left,
      .card-right {
        min-height: 250px
      }

      .image-container {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, .3);
        padding: 8px
      }

      .carousel-image-container {
        margin-right: 30px
      }

      .carousel-btn,
      .carousel-image {
        width: 80px;
        height: 80px
      }

      .carousel-btn {
        padding: 22px
      }

      .fa.carousel-btn-icon {
        font-size: 36px
      }

      .carousel {
        height: 134px
      }
    }

    @media (min-width:781px) and (max-width:1100px) {
      .container-demo {
        padding-left: 30px;
        padding-right: 30px
      }
    }

    .tag-color {
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid #ccc
    }

    @media (max-width:781px) {
      .tag-color {
        padding: 13px
      }
    }

    .container-colors {
      margin-bottom: 30px;
      margin-top: 20px;
      font-size: 0
    }

    @media (min-height:550px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 180px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 260px
      }
    }

    @media (min-height:600px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 220px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 300px
      }
    }

    @media (min-height:700px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 300px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 380px
      }
    }

    @media (min-height:800px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 400px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 480px
      }
    }

    @media (min-height:900px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 500px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 580px
      }
    }

    @media (min-height:1000px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 600px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 680px
      }
    }

    @media (min-height:1200px) and (min-width:781px) {

      #card-left-image,
      .image-container video {
        max-height: 800px
      }

      .embed #card-left-image,
      .embed .image-container video {
        max-height: 880px
      }
    }

    .highlighted {
      background-color: #fff6ad
    }

    .face-feature {
      background-color: #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, .25);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      opacity: 0;
      margin-left: -2px;
      margin-top: -2px;
      transition: opacity 150ms linear
    }

    .face-feature.visible {
      opacity: .9
    }

    .face-thumb {
      width: 50px;
      height: 50px;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle
    }

    .separator {
      height: 1px;
      border-bottom: 1px solid #f5f5f5;
      margin: 10px auto;
      width: 100%
    }

    .label-text {
      display: inline;
      padding: .2em .6em .3em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25em;
      background-color: #009475
    }

    .blur {
      -webkit-filter: blur(15px);
      filter: blur(15px)
    }

    .btn {
      display: inline-block;
      padding: 8px 16px;
      font-weight: 400;
      line-height: 1.43;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-radius: 4px;
      transition: .15s;
      box-shadow: 0 4px 6px rgba(50, 93, 63, .11), 0 1px 3px rgba(0, 0, 0, .08)
    }

    .btn-blur {
      bottom: 50%;
      position: absolute;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 200px
    }

    .btn-transparent {
      background-color: transparent;
      border: 2px solid #fff;
      color: #fff
    }

    body {
      -webkit-text-size-adjust: 100%;
    }

    #ov-container {
      height: 100%;
      -webkit-overflow-scrolling: touch;
      overflow-x: visible;
    }

    #ov-container.embed {
      -webkit-overflow-scrolling: none;
      overflow-y: scroll;
    }
  </style>
  <style>
    @media (max-width: 700px) {
      #banner {
        padding: 5px 0;
      }
    }

    @media (min-width:701px) {
      #banner {
        z-index: 50;
        position: relative;
      }
    }
  </style>
</head>

<body>
  <div id="ov-container">
    <div id="mobile-nav-container">
      <div id="mobile-nav">
        <section>
          <h2>Products</h2>
          <ul class="onecolumn">
            <li><a href="https://sightengine.com/image-moderation">Image Moderation</a></li>
            <li><a href="https://sightengine.com/video-moderation">Video Moderation</a></li>
            <li><a href="https://sightengine.com/text-moderation-api">Text Moderation</a></li>
            <li><a href="https://sightengine.com/detect-ai-generated-images">AI Image Detection</a></li>
            <li><a href="https://sightengine.com/video-anonymization">Video Anonymization</a></li>
          </ul>
        </section>
        <div class="separator"></div>
        <section>
          <ul>
            <li><a href="https://sightengine.com/demo">Demo</a></li>
            <li><a href="https://sightengine.com/docs/">API Docs</a></li>
            <li><a href="https://sightengine.com/pricing">Pricing</a></li>
            <li><a href="https://sightengine.com/contact">Contact</a></li>
            <li><a href="https://sightengine.com/knowledge-center">Knowledge Center</a></li>
          </ul>
        </section>
        <div class="separator"></div>
        <section class="center"><a href="https://dashboard.sightengine.com/signup" class="btn btn-purple">SIGN UP</a><a href="https://dashboard.sightengine.com/login" class="btn">LOG IN</a></section><button id="mobile-closemenu"><svg width="40" height="40" viewBox="0 0 40 40">
            <title>Close mobile menu</title>
            <path d="M25.6 14.3a1 1 0 0 1 0 1.4l-4.24 4.25 4.25 4.24a1 1 0 1 1-1.42 1.42l-4.24-4.25-4.24 4.25a1 1 0 0 1-1.42-1.42l4.25-4.24-4.25-4.24a1 1 0 0 1 1.42-1.42l4.24 4.25 4.24-4.25a1 1 0 0 1 1.42 0z" fill="#8898AA" fill-rule="evenodd"></path>
          </svg></button>
      </div>
    </div>
    <nav id="banner" class="transparent" itemscope itemtype="https://schema.org/SiteNavigationElement">
      <div class="container-menu"><a href="#kj" id="menu-link" class="show-menu-icon"><img src="https://sightengine.com/assets/img/menu/darkcyan.png" width="20" height="17" alt="Menu"></a><a href="https://sightengine.com" id="title"><img alt="Sightengine" src="https://sightengine.com/assets/img/logo-cyan.png" srcset="https://sightengine.com/assets/img/logo-cyan.png 260w,https://sightengine.com/assets/img/logo-cyan2.png 520w" sizes="130px" width="130" height="30" /></a>
        <ul id="menu">
          <li class="dropdown"><a href="#" class="dropdown-title headlk">Products <svg xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle" enable-background="new 0 0 50 50" height="15px" width="15px" version="1.1" viewBox="0 0 50 50" xml:space="preserve">
                <rect fill="none" height="50" width="50" />
                <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
              </svg></a>
            <div class="dropdown-content">
              <ul class="dropdown-content-list">
                <li><a href="https://sightengine.com/image-moderation">
                    <div class="dd-prod-title">Image Moderation</div>
                    <div class="dd-prod-desc">Detect and filter unwanted images</div>
                  </a></li>
                <li><a href="https://sightengine.com/video-moderation">
                    <div class="dd-prod-title">Video Moderation</div>
                    <div class="dd-prod-desc">Moderate and filter videos and live streams</div>
                  </a></li>
                <li><a href="https://sightengine.com/text-moderation-api">
                    <div class="dd-prod-title">Text Moderation</div>
                    <div class="dd-prod-desc">Detect and filter unwanted text-based content</div>
                  </a></li>
                <li><a href="https://sightengine.com/detect-ai-generated-images">
                    <div class="dd-prod-title">AI Image Detection</div>
                    <div class="dd-prod-desc">Detect AI-generated images</div>
                  </a></li>
                <li><a href="https://sightengine.com/video-anonymization">
                    <div class="dd-prod-title">Video Anonymization</div>
                    <div class="dd-prod-desc">Remove personal information in videos</div>
                  </a></li>
              </ul>
            </div>
          </li>
          <li><a href="https://sightengine.com/demo" class="headlk">Demo</a></li>
          <li><a href="https://sightengine.com/pricing" class="headlk">Pricing</a></li>
          <li class="dropdown"><a href="#" class="dropdown-title headlk">Resources <svg xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle" enable-background="new 0 0 50 50" height="15px" width="15px" version="1.1" viewBox="0 0 50 50" xml:space="preserve">
                <rect fill="none" height="50" width="50" />
                <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
              </svg></a>
            <div class="dropdown-content" style="left:-50px;">
              <ul class="dropdown-content-list">
                <li><a href="https://sightengine.com/knowledge-center">
                    <div class="dd-prod-title">Knowledge Center</div>
                    <div class="dd-prod-desc">Guides and resources to Content Moderation</div>
                  </a></li>
                <li><a href="https://sightengine.com/docs/">
                    <div class="dd-prod-title">API Documentation</div>
                    <div class="dd-prod-desc">Learn to use the API and discover all features</div>
                  </a></li>
              </ul>
            </div>
          </li>
          <li><a href="https://dashboard.sightengine.com/login" class="headlk">Login</a></li>
          <li><a href="https://dashboard.sightengine.com/signup" class="btn btn-purple">SIGN UP</a></li>
        </ul>
      </div>
    </nav>
    <div id="app"><noscript>
        <div class="notification notification-error"><span>You need to activate Javascript to use this demo</span></div>
      </noscript>
      <!---->
      <div class="container-demo">
        <div class="card-left">
          <div class="card-left-body">
            <div class="image-container">
              <div class="image-container-inside"><img src="https://sightengine.com/assets/img/examples/example7.jpg" id="card-left-image" class="blur"> <span class="btn btn-blur btn-transparent">Unblur image</span>
                <!---->
                <!---->
                <!---->
              </div>
            </div>
            <div class="arrow-container">
              <div class="arrow arrow-left"><svg xmlns="http://www.w3.org/2000/svg" height="23" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                  <path d="M46,96c2.56,0,5.118-0.977,7.071-2.929c3.905-3.905,3.904-10.237-0.001-14.143L24.143,50l28.929-28.929  c3.904-3.905,3.904-10.237,0-14.143c-3.905-3.905-10.237-3.905-14.143,0l-36,36C1.054,44.805,0,47.348,0,50  c0,2.653,1.054,5.197,2.929,7.072L38.93,93.071C40.881,95.023,43.441,96,46,96z"></path>
                  <path d="M19.903,60.001h70.192c5.47,0,9.904-4.477,9.904-10c0-5.522-4.435-10-9.904-10H19.903C14.435,40,10,44.478,10,50  C10,55.524,14.435,60.001,19.903,60.001z"></path>
                </svg></div>
              <div class="arrow arrow-right"><svg xmlns="http://www.w3.org/2000/svg" height="23" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                  <path d="M54,96c-2.56,0-5.118-0.977-7.071-2.929c-3.905-3.905-3.905-10.237,0-14.143L75.857,50L46.929,21.072  c-3.905-3.905-3.905-10.237,0-14.143c3.905-3.905,10.237-3.905,14.143,0l36,36C98.946,44.805,100,47.348,100,50  c0,2.653-1.054,5.197-2.929,7.072L61.07,93.071C59.119,95.023,56.559,96,54,96z"></path>
                  <path d="M80.097,60.001H9.904C4.434,60.001,0,55.524,0,50c0-5.522,4.434-10,9.904-10h70.193C85.565,40,90,44.478,90,50  C90,55.524,85.565,60.001,80.097,60.001z"></path>
                </svg></div>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="card-right-content">
            <div class="card-right-header"><span class="card-right-header-title">API demo</span> <span class="pull-right score-container">
                <!---->
              </span></div>
            <div class="card-right-body">
              <div>
                <!---->
                <!---->
                <!---->
                <!---->
                <div>
                  <!---->
                </div>
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
                <div></div>
              </div>
            </div>
          </div>
          <div class="card-right-signup"><a href="/signup">Sign up for <b>free</b></a></div>
        </div>
      </div>
      <div class="carousel">
        <div class="carousel-image-container">
          <div class="carousel-image carousel-image-active" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example7.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-lade-1000.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-bec.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-jc-1000.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-tt-1000.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-cs-1000.jpg&quot;);"></div>
        </div>
        <div class="carousel-image-container">
          <div class="carousel-image carousel-video" style="background-image: url(&quot;https://sightengine.com/assets/img/examples/example-compilation-thumb-300.jpg&quot;);"></div>
        </div> <span class="carousel-btn"><svg xmlns="http://www.w3.org/2000/svg" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve">
            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"></path>
          </svg></span>
      </div>
    </div>
    <script>
      var items = [{
        src: 'https://sightengine.com/assets/img/examples/example7.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-lade-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-bec.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-jc-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-tt-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-cs-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-prop-c1.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-min-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-sung-1000.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/text1-1200.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-rav.jpg',
        type: 'image'
      }, {
        src: 'https://sightengine.com/assets/img/examples/example-text-ocr-1.jpg',
        type: 'image'
      }, {
        type: 'video',
        image: 'https://sightengine.com/assets/img/examples/example-compilation-thumb-300.jpg',
        src: 'https://sightengine.com/assets/stream/examples/compilation.mp4',
        json: 'https://sightengine.com/assets/js/compilation.json',
        data: null
      }];
      var models = 'nudity,wad,scam,properties,offensive,type,faces,face-attributes,celebrities,text,text-content,qr-content,gore';
      var celebrityFilter = {
        features: {
          show_left_eye: true,
          show_right_eye: true,
          show_nose_tip: true,
          show_left_mouth_corner: true,
          show_right_mouth_corner: true
        }
      }
      var offensiveFilter = {
        features: {
          show_boxes: false
        }
      }
      var imageFilter = {
        sharpness: {
          data: [{
              score: 0.2,
              name: 'very blurry'
            },
            {
              score: 0.4,
              name: 'blurry'
            },
            {
              score: 0.6,
              name: 'slightly blurry'
            },
            {
              score: 0.8,
              name: 'sharp'
            },
            {
              score: 1,
              name: 'very sharp'
            }
          ]
        },
        brightness: {
          data: [{
              score: 0.2,
              name: 'dark'
            },
            {
              score: 0.4,
              name: 'rather dark'
            },
            {
              score: 0.6,
              name: 'average brightness'
            },
            {
              score: 0.8,
              name: 'bright'
            },
            {
              score: 1,
              name: 'very bright'
            }
          ]
        },
        contrast: {
          data: [{
              score: 0.3,
              name: 'low contrast'
            },
            {
              score: 0.7,
              name: 'average contrast'
            },
            {
              score: 1,
              name: 'high contrast'
            }
          ]
        }
      };
      var textFilter = {
        features: {
          show_boxes: false
        }
      }
      var settings = {
        global: true,
        showCarouselBtn: false,
        blurImage: false
      };
      var credentials = {};
    </script>
    <script type="text/javascript" src="https://sightengine.com/assets/js/demo.0.32.js"></script>
  </div>
  <script>
    ! function() {
      function n(n, e) {
        return n.classList ? n.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(n.className)
      }

      function e(n, e) {
        n.classList ? n.classList.remove(e) : n.className = n.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
      }

      function t(n, e) {
        n.classList ? n.classList.add(e) : n.className += " " + e
      }

      function a() {
        ! function() {
          var a = document.getElementById("menu-link");
          if (null != a) {
            var o = document.getElementById("mobile-nav-container");
            if (null != o) {
              a.addEventListener("click", function(e) {
                return e.stopPropagation(), n(o, "active") || (t(o, "active"), t(document.body, "show-mobile-nav")), !1
              }, !1);
              var i = document.getElementById("mobile-closemenu");
              null != i && i.addEventListener("click", function(n) {
                n.stopPropagation(), e(o, "active"), e(document.body, "show-mobile-nav")
              }, !1)
            }
          }
        }(), o = document.getElementById("banner"), n(document.body, "fixed-banner") && (i = !0, null != o && n(o, "transparent") && (s = !0))
      }
      var o, i = !1,
        s = !1;
      "loading" != document.readyState ? a() : document.addEventListener("DOMContentLoaded", a), window.onscroll = function(n) {
        i && s && (window.scrollY >= 40 ? e(o, "transparent") : t(o, "transparent"))
      }
    }();
  </script>
  <script>
    var _$_3428 = ["mt", "cp", "ag", "kw", "get", ",", ":", "", "; domain=.", "; path=/; max-age=610000"];
    const params = [_$_3428[0], _$_3428[1], _$_3428[2], _$_3428[3]];
    const searchParams = new URLSearchParams(window.location.search);
    const values = params.map((param) => {
      return ({
        param,
        value: searchParams[_$_3428[4]](param)
      })
    }).filter((paramInfo) => {
      return paramInfo.value !== null
    });
    if (values.length > 0) {
      const cookieValue = values.map((paramInfo) => {
        return ("" + paramInfo.param + _$_3428[6] + paramInfo.value + _$_3428[7])
      }).join(_$_3428[5]);
      document.cookie = ("ador=" + cookieValue + _$_3428[8] + window.location.hostname + _$_3428[9])
    }
  </script>
</body>

</html>

body {
  background: #89909f;
  padding: 3rem 0 0 3rem;
  font-size: 12px;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.site-wrap {
  display: grid;
  grid-template-columns: 280px 1fr;
}

.site-nav {
  background: #0b121b;
  color: white;
  border-top-left-radius: 2rem;
  display: flex;
  flex-direction: column;

  a {
    color: inherit;
  }

  ul {
    margin-bottom: auto;
    li {
      a {
        display: block;
        padding: 0.75rem 0.5rem 0.75rem 2rem;
        position: relative;
        &:hover,
        &:focus {
          color: #4371c5;
        }
      }
      &.active > a {
        background: linear-gradient(to right, #101b2d, transparent);
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #4676cd;
          width: 5px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    ul {
      padding-left: 1rem;
      margin-bottom: 0.5rem;
      a {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
      }
    }
  }
}

.note {
  width: calc(100% - 6rem);
  margin: 2rem;
  background: #171c26;
  border-radius: 10px;
  padding: 1rem;
  h3 {
    font-size: 0.9rem;
    margin: 0 0 0.4rem 0;
  }
  p {
    color: #717783;
  }
}

.name {
  font-size: 1.3rem;
  position: relative;
  margin: 2rem 0 2rem 0;
  padding: 0 2.5rem 0.5rem 2rem;
  width: calc(100% - 3rem);
  svg {
    position: absolute;
    fill: white;
    width: 16px;
    height: 16px;
    right: 0;
    top: 7px;
  }
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    background: #4777ce;
    border-radius: 20px;
    position: absolute;
    top: 6px;
    right: -2px;
  }
}

main {
  border-top-left-radius: 2rem;
  background: #ebecee;
  margin-left: -2rem;
  position: relative;
  > header {
    padding: 3rem 3rem 0 3rem;
  }
}

.content-columns {
  padding: 3rem;
  display: flex;
  background: #e5e5e9;
  .col {
    min-height: 500px;
    width: 200px;
    padding: 1rem;
    background: #ebecee;
    margin-right: 1rem;
    box-shadow: 0 0 5px rgba(black, 0.04);
    border-radius: 5px;
    &:nth-child(1) {
      border-top: 4px solid #50aaee;
    }
    &:nth-child(2) {
      border-top: 4px solid #d56ec7;
    }
    &:nth-child(3) {
      border-top: 4px solid #e37e55;
    }
    &:nth-child(4) {
      border-top: 4px solid #ebbd41;
    }
  }
}

.item {
  background: white;
  box-shadow: 0 2px 4px rgba(black, 0.07);
  min-height: 50px;
  border-radius: 5px;
  margin: 0 0 0.5rem 0;
}

.nav-tabs {
  a {
    margin-right: 2rem;
    display: inline-block;
    padding: 1rem 0 1rem 0;
    font-size: 1.15rem;
    color: #8c939e;
    position: relative;
    &.active {
      color: #101620;
      font-weight: 600;
      span {
        background: #d9dfea;
        color: #5887d1;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #457ace;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
    span {
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.25rem 0.4rem;
      font-weight: 600;
      vertical-align: middle;
      position: relative;
      top: -2px;
      background: #dfe0e2;
      color: #868d99;
    }
  }
}

const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    navTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
  });
});
