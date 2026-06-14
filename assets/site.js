/* Fluvius — shared site behaviour */
(function(){
  // Theme persistence (visual direction tweak) across pages
  var THEMES = ['institucional','territorial','minimal'];
  function applyTheme(t){
    if(t==='institucional'){ document.documentElement.removeAttribute('data-theme'); }
    else { document.documentElement.setAttribute('data-theme', t); }
  }
  var saved = localStorage.getItem('fluvius-theme') || 'institucional';
  applyTheme(saved);
  window.__setFluviusTheme = function(t){
    if(THEMES.indexOf(t)<0) t='institucional';
    localStorage.setItem('fluvius-theme', t);
    applyTheme(t);
    document.querySelectorAll('[data-theme-btn]').forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.themeBtn===t ? 'true':'false');
    });
  };
  window.__getFluviusTheme = function(){ return localStorage.getItem('fluvius-theme')||'institucional'; };

  document.addEventListener('DOMContentLoaded', function(){
    // year
    document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

    // mobile nav
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if(toggle && nav){
      var firstNavLink = nav.querySelector('a');
      function setNav(open){
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        if(open && firstNavLink){ firstNavLink.focus(); }
      }
      toggle.addEventListener('click', function(){ setNav(!nav.classList.contains('open')); });
      nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setNav(false); }); });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && nav.classList.contains('open')){
          setNav(false);
          toggle.focus();
        }
      });
    }

    // reveal on scroll
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealEls = document.querySelectorAll('.reveal');
    if(reduceMotion || !('IntersectionObserver' in window)){
      revealEls.forEach(function(el){ el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
      revealEls.forEach(function(el){ io.observe(el); });
    }

    // sync theme buttons initial state
    var t = window.__getFluviusTheme();
    document.querySelectorAll('[data-theme-btn]').forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.themeBtn===t ? 'true':'false');
      b.addEventListener('click', function(){ window.__setFluviusTheme(b.dataset.themeBtn); });
    });

    // portfolio filters
    var filterButtons = document.querySelectorAll('[data-filter]');
    var cases = document.querySelectorAll('.case[data-sector]');
    filterButtons.forEach(function(button){
      button.addEventListener('click', function(){
        var filter = button.getAttribute('data-filter');
        filterButtons.forEach(function(b){ b.classList.toggle('is-active', b === button); });
        cases.forEach(function(card){
          var visible = filter === 'all' || card.getAttribute('data-sector') === filter;
          card.hidden = !visible;
        });
      });
    });
  });
})();
