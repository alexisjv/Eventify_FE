/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.5.0
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PureCounter=t():e.PureCounter=t()}(self,(function(){return e={638:function(e){function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={};for(var n in e)if(t=={}||t.hasOwnProperty(n)){var o=c(e[n]);r[n]=o,n.match(/duration|pulse/)&&(r[n]="boolean"!=typeof o?1e3*o:o)}return Object.assign({},t,r)}function i(e,t){var r=(t.end-t.start)/(t.duration/t.delay),n="inc";t.start>t.end&&(n="dec",r*=-1);var o=c(t.start);e.innerHTML=u(o,t),!0===t.once&&e.setAttribute("data-purecounter-duration",0);var i=setInterval((function(){var a=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"inc";return e=c(e),t=c(t),parseFloat("inc"===r?e+t:e-t)}(o,r,n);e.innerHTML=u(a,t),((o=a)>=t.end&&"inc"==n||o<=t.end&&"dec"==n)&&(e.innerHTML=u(t.end,t),t.pulse&&(e.setAttribute("data-purecounter-duration",0),setTimeout((function(){e.setAttribute("data-purecounter-duration",t.duration/1e3)}),t.pulse)),clearInterval(i))}),t.delay)}function a(e,t){return Math.pow(e,t)}function u(e,t){var r={minimumFractionDigits:t.decimals,maximumFractionDigits:t.decimals},n="string"==typeof t.formater?t.formater:void 0;return e=function(e,t){if(t.filesizing||t.currency){e=Math.abs(Number(e));var r=1e3,n=t.currency&&"string"==typeof t.currency?t.currency:"",o=t.decimals||1,i=["","K","M","B","T"],u="";t.filesizing&&(r=1024,i=["bytes","KB","MB","GB","TB"]);for(var c=4;c>=0;c--)if(0===c&&(u="".concat(e.toFixed(o)," ").concat(i[c])),e>=a(r,c)){u="".concat((e/a(r,c)).toFixed(o)," ").concat(i[c]);break}return n+u}return parseFloat(e)}(e,t),function(e,t){if(t.formater){var r=t.separator?"string"==typeof t.separator?t.separator:",":"";return"en-US"!==t.formater&&!0===t.separator?e:(n=r,e.replace(/^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi,(function(e,t,r,o,i){var a="",u="";if(void 0!==t?(a=t.replace(new RegExp(/,/gi,"gi"),n),u=","):void 0!==r?a=r.replace(new RegExp(/\./gi,"gi"),n):void 0!==o&&(a=o.replace(new RegExp(/ /gi,"gi"),n)),void 0!==i){var c=","!==u&&","!==n?",":".";a+=void 0!==i?i.replace(new RegExp(/\.|,/gi,"gi"),c):""}return a})))}var n;return e}(e=t.formater?e.toLocaleString(n,r):parseInt(e).toString(),t)}function c(e){return/^[0-9]+\.[0-9]+$/.test(e)?parseFloat(e):/^[0-9]+$/.test(e)?parseInt(e):/^true|false/i.test(e)?/^true/i.test(e):e}function f(e){for(var t=e.offsetTop,r=e.offsetLeft,n=e.offsetWidth,o=e.offsetHeight;e.offsetParent;)t+=(e=e.offsetParent).offsetTop,r+=e.offsetLeft;return t>=window.pageYOffset&&r>=window.pageXOffset&&t+o<=window.pageYOffset+window.innerHeight&&r+n<=window.pageXOffset+window.innerWidth}function s(){return"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype}e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n={start:0,end:100,duration:2e3,delay:10,once:!0,pulse:!1,decimals:0,legacy:!0,filesizing:!1,currency:!1,separator:!1,formater:"us-US",selector:".purecounter"},a=o(e,n);function d(){var e=document.querySelectorAll(a.selector);if(0!==e.length)if(s()){var t=new IntersectionObserver(p.bind(this),{root:null,rootMargin:"20px",threshold:.5});e.forEach((function(e){t.observe(e)}))}else window.addEventListener&&(l(e),window.addEventListener("scroll",(function(t){l(e)}),{passive:!0}))}function l(e){e.forEach((function(e){!0===v(e).legacy&&f(e)&&p([e])}))}function p(e,t){e.forEach((function(e){var r=e.target||e,n=v(r);if(n.duration<=0)return r.innerHTML=u(n.end,n);if(!t&&!f(e)||t&&e.intersectionRatio<.5){var o=n.start>n.end?n.end:n.start;return r.innerHTML=u(o,n)}setTimeout((function(){return i(r,n)}),n.delay)}))}function v(e){var n=a,i=[].filter.call(e.attributes,(function(e){return/^data-purecounter-/.test(e.name)}));return o(0!=i.length?Object.assign.apply(Object,[{}].concat(r(i.map((function(e){var r=e.name,n=e.value;return t({},r.replace("data-purecounter-","").toLowerCase(),c(n))}))))):{},n)}d()}}},t={},r=function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(638),r;var e,t,r}));
//# sourceMappingURL=purecounter_vanilla.js.map



(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 20
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 800) {
          selectHeader.classList.add('header-scrolled');
          select('#logo').classList.remove('logotipo');
          select('#logo').classList.add('imagotipo');
        } else {
          selectHeader.classList.remove('header-scrolled');
          select('#logo').classList.remove('imagotipo');
          select('#logo').classList.add('logotipo');
        }
      };
      
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate portfolio lightbox 
     */
    
  
    /**
     * Portfolio details slider
     */
    
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    /**
     * Initiate Pure Counter 
     */
   /*  new PureCounter(); */
  
  })()
  