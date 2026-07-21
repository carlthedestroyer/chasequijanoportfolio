/* common RD UI utilities
 * dependencies: lodash
 */

var RDJS = (function (window, document) {

  'use strict';


  /* =helper functions
   * =================
   */

  // quick no-effort polyfill for Element.matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
  }


  // cast to array, because _.toArray and _.castArray are inadequate when
  // the argument could be either a node or nodeList. Also doubles as
  // an array copier
  function toArray(collection) {
    var result = [];
    if (collection) {
      if (typeof collection.length === 'number') {
        for (var i = 0; i < collection.length; i++) {
          result.push(collection[i]);
        }
      } else {
        result.push(collection);
      }
    }
    return result;
  }


  // get all elements not contained within certain parents
  // because css selectors are currently inadequate to solve this problem
  // in the general case
  function getElementsWithoutParent(selector, parentBlacklist, currentParent) {
    if (!currentParent) {
      currentParent = document.documentElement;
    }

    var result = [];

    if (!currentParent.children) {
      return result;
    }

    for (var i = 0; i < currentParent.children.length; i++) {
      if (currentParent.children[i].matches(selector)) {
        result.push(currentParent.children[i]);
      }
      if (!currentParent.children[i].matches(parentBlacklist)) {
        result = result.concat(getElementsWithoutParent(selector, parentBlacklist, currentParent.children[i]));
      }
    }
    return result;
  }


  // return a valid url-encoded string of parameters from an object
  // currently does not support nested objects
  function objectToParameters(obj) {
    var parts = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return parts.join('&');
  }


  // produce a valid html id (with some additional considerations) from an
  // arbitrary string. Providing a value for 'defaultId' will cover cases where
  // the string is blank or consists entirely of characters we will strip out
  function generateHtmlId(str, defaultId) {
    // sanitize our id value a bit. The html5 spec is /very/ permissive about
    // what can be in an id (pretty much anything but spaces goes), but strip
    // out some additional characters in case we're using this as a url fragment
    var idString = str
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[\.\?\$\/ #&%@,]/g, '')
      .toLowerCase();

    idString = idString || defaultId || '';  // in case str was empty or all special chars

    // if we have an id conflict, increment until we don't. We could append
    // some kind of random value, but we want this to produce the same
    // linkable hash each run
    var tryCount = 0;
    var existingElement = document.getElementById(idString);
    while (existingElement) {
      tryCount++;
      existingElement = document.getElementById(idString + '-' + String(tryCount));
    }
    if (tryCount > 0) {
      idString += '-' + String(tryCount);
    }

    return idString;
  }


  // xhr helper
  function xhr(method, url, callback, data) {
    var _validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'],
        xhr = new XMLHttpRequest();

    if (!method) {
      console.error('No method provided to xhr');
      return false;
    }
    method = method.toUpperCase();
    if (!_validMethods.includes(method)) {
      console.error(method + ' is not a valid http request method');
      return false;
    }

    if (!url) {
      console.error('No url provided to xhr');
      return false;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (callback && typeof callback === 'function') {
            callback(xhr.responseText);
          } else {
            console.log(xhr.responseText);
          }
        } else {
          console.error('XHR returned a status of ' + xhr.status);
          console.log(xhr);
        }
      }
    };

    xhr.open(method, url);

    if (method === 'POST' && data) {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      if (typeof data === 'object') {
        xhr.send(objectToParameters(data));
      } else {
        xhr.send(data);
      }
    } else {
      xhr.send();
    }
  }


  /* =toggles
   * ========
   *
   * a one-to-many class toggler activated on click
   *
   * default elements:
   * <el data-toggle-target="[keyword|selector]" />
   *
   * external toggle interactions
   * <el data-toggle-exit="esc outside" />
   */

  var toggles = (function () {
    var toggleList = [],

        togglePrototype = {
          origin: null,
          targets: [],
          activeClass: 'is-active',
          deactivateOnEsc: false,
          deactivateOnOutside: false,
          useFragments: false,

          // make toggle go
          activate: function activate(force) {
            _.forEach([this.origin].concat(this.targets), function (el, i) {
              if (typeof force === 'boolean') {
                el.classList.toggle(this.activeClass, force);
              } else {
                el.classList.toggle(this.activeClass);
              }
              // if this is the origin, set control state
              if (i === 0) {
                el.setAttribute('aria-expanded', (el.classList.contains(this.activeClass)).toString());
              // if this is a toggle, set aria hidden state
              } else {
                el.setAttribute('aria-hidden', (!el.classList.contains(this.activeClass)).toString());
              }
            }.bind(this));

            // focus first target as a convenience to kb/sr users
            if (this.origin.classList.contains(this.activeClass) && this.targets.length > 0) {
              this.targets[0].focus();
            }

            // write url fragment, if applicable
            if (this.useFragments && this.origin.id) {
              if (this.origin.classList.contains(this.activeClass)) {
                window.history.replaceState(null, '', '#' + encodeURIComponent(this.origin.id));
              } else {
                window.history.replaceState(null, '', window.location.href.split('#')[0]);
              }
            }

            if (typeof this.onActivate === 'function') {
              this.onActivate(this);
            }

            return this;
          },

          // get targets, generate a11y attributes, and add event listeners
          init: function init() {
            this.targets = toArray(this.targets);

            // set up ids
            this.origin.id = this.origin.id || generateHtmlId(this.origin.textContent.substr(0, 24), 'toggle');
            _.forEach(this.targets, function generateTargetId(target) {
              target.id = target.id || generateHtmlId(this.origin.textContent.substr(0, 24) + '-pane', 'pane');
            }.bind(this));

            // set initial a11y attributes
            this.origin.setAttribute('role', 'button');
            this.origin.setAttribute('aria-expanded', (this.origin.classList.contains(this.activeClass)).toString());
            this.origin.setAttribute('aria-controls', this.targets[0].id);
            _.forEach(this.targets, function linkTargetToOrigin(target) {
              target.setAttribute('aria-labelledby', this.origin.id);
              target.setAttribute('aria-hidden', (!this.origin.classList.contains(this.activeClass)).toString());
            }.bind(this));

            // make toggle focusable if it isn't a focusable element by default
            this.origin.setAttribute('tabindex', '0');

            // allow programmatic focus on first target content element
            if (this.targets.length > 0) {
              this.targets[0].setAttribute('tabindex', '-1');
            }

            // bind listeners
            this.origin.addEventListener('click', function (ev) {
              ev.preventDefault();
              this.activate();
            }.bind(this));
            this.origin.addEventListener('keydown', function (ev) {
              // bind spacebar and return in case we're not using a native
              // button element that includes these interactions implicitly
              if (ev.keyCode === 13 || ev.keyCode === 32) {
                ev.preventDefault();
                this.activate();
              }
            }.bind(this));

            if (typeof this.onInit === 'function') {
              this.onInit(this);
            }

            return this;
          },

          // optional callbacks
          onActivate: null,
          onInit: null
        };

    // private: parses a target string and returns a matching array
    function findTargets(el) {
      var targetString = el.getAttribute('data-toggle-target');
      if (!targetString) {
        return [];
      } else if (targetString === 'next') {
        return [el.nextElementSibling];
      } else if (targetString === 'parent') {
        return [el.parentNode];
      } else if (targetString === 'parentparent') {
        return [el.parentNode.parentNode];
      } else if (targetString === 'parentnext') {
        return [el.parentNode.nextElementSibling];
      } else if (targetString === 'parentparentnext') {
        return [el.parentNode.parentNode.nextElementSibling];
      }
      return toArray(document.querySelectorAll(targetString));
    }

    // public: make node or nodeList toggleable
    function add(els, options) {
      options = options || {};
      els = toArray(els);
      _.forEach(els, function (el) {
        var toggle = _.assign(Object.create(togglePrototype), { origin: el }, options);
        toggleList.push(toggle);
        toggle.init();
      });
      return list();
    }

    // public: returns an array of all toggles on the page
    function list() {
      return toggleList;
    }

    // public: returns all toggle objects whose origins match a given css selector
    function find(selector) {
      var result = [];
      _.forEach(list(), function (toggle) {
        if (toggle.origin.matches(selector)) {
          result.push(toggle);
        }
      });
      return result;
    }

    // public: returns a single toggle object whose origin matches a given css selector
    function get(selector) {
      var result = null;
      _.forEach(list(), function (toggle) {
        if (toggle.origin.matches(selector)) {
          result = toggle;
          return false;
        }
      });
      return result;
    }

    // public: initialize by adding default elements
    function init() {
      _.forEach(document.querySelectorAll('[data-toggle-target]'), function addNewToggle(el) {
        var options = {
          targets: findTargets(el),
          deactivateOnEsc: (/\besc\b/.test(el.getAttribute('data-toggle-exit'))),
          deactivateOnOutside: (/\boutside\b/.test(el.getAttribute('data-toggle-exit'))),
          useFragments: Boolean(el.getAttribute('data-toggle-fragment')),
        };
        add(el, options);
      });

      // open any toggles that match url fragment
      if (window.location.hash) {
        var urlFragment = decodeURIComponent(window.location.hash.substr(1));
        _.forEach(list(), function matchGroupFragment(group) {
          _.forEach([group.origin].concat(group.targets), function matchElementFragment(el) {
            if (el.id === urlFragment) {
              group.activate(true);
            }
          });
        });
      }

      // add global close listeners
      document.documentElement.addEventListener('keyup', function (ev) {
        if (ev.keyCode === 27) {
          _.forEach(list(), function (toggle) {
            if (toggle.deactivateOnEsc) {
              toggle.activate(false);
            }
          });
        }
      });
      document.body.addEventListener('click', function (ev) {
        _.forEach(list().filter(function (toggle) { return toggle.deactivateOnOutside; }), function (toggle) {
          var deactivate = true,
              els = [toggle.origin].concat(toggle.targets);
          for (var i = els.length - 1; i >= 0; i--) {
            if (els[i] === ev.target || els[i].contains(ev.target)) {
              deactivate = false;
              break;
            }
          }
          if (deactivate) {
            toggle.activate(false);
          }
        });
      });
    }

    return {
      add: add,
      list: list,
      find: find,
      get: get,
      init: init
    };
  }());


  /* =tabs
   * =====
   *
   * a class switcher wherein only one element (or pair of elements)
   * may be active at a time
   *
   * default elements:
   * <el class="tabs [is-automated]?">
   *   <el class="tabs__tab" />
   *   <el class="tabs__pane" />
   * </el>
   */

  var tabs = (function () {
    var tabGroupList = [],

        tabGroupPrototype = {
          // preferences
          automated: false,
          slideDuration: 5000,
          useFragments: false,

          // calculated attributes
          active: 0,
          count: 0,

          // elements
          container: null,
          tabs: null,
          panes: null,
          nextTriggers: null,
          previousTriggers: null,
          playTriggers: null,
          pauseTriggers: null,

          // default (overrideable) selectors used in init()
          containerSelector: '.tabs',
          tabSelector: '.tabs__tab',
          paneSelector: '.tabs__pane',
          nextSelector: '.tabs__next',
          previousSelector: '.tabs__previous',
          playSelector: '.tabs__play',
          pauseSelector: '.tabs__pause',

          // classes
          activeClass: 'is-active',
          lastActiveClass: 'is-last-active',
          nextClass: 'is-next',
          previousClass: 'is-previous',
          initClass: 'is-enhanced',
          playingClass: 'is-playing',

          // utility
          timer: null,

          changeTo: function changeTo(index, interruptTimer, isFirstLoad) {
            if (index === 'next') {
              index = this.getNextIndex();
            } else if (index === 'previous') {
              index = this.getPreviousIndex();
            } else if (typeof index !== 'number' || index < 0 || index >= this.count) {
              console.warn('given index not recognized');
              return this;
            }

            if (interruptTimer && this.automated) {
              this.pause();
            }

            // reset state classes to blank slate
            _.forEach(this.tabs.concat(this.panes), function (el) {
              el.classList.remove(this.activeClass);
              el.classList.remove(this.lastActiveClass);
              el.classList.remove(this.nextClass);
              el.classList.remove(this.previousClass);
            }.bind(this));

            // reset aria attributes to defaults
            _.forEach(this.tabs, function (tab) {
              tab.setAttribute('aria-selected', 'false');
            }.bind(this));
            _.forEach(this.panes, function (pane) {
              pane.setAttribute('aria-hidden', 'true');
            }.bind(this));

            // mark the tab we're changing /from/ for the purposes of animation
            if (this.active !== index) {
              if (this.tabs[this.active]) {
                this.tabs[this.active].classList.add(this.lastActiveClass);
              }
              if (this.panes[this.active]) {
                this.panes[this.active].classList.add(this.lastActiveClass);
              }
            }

            // make it so
            this.active = index;

            // add all state classes and aria states
            if (this.tabs[index]) {
              this.tabs[index].classList.add(this.activeClass);
              this.tabs[index].setAttribute('aria-selected', 'true');
            }
            if (this.panes[index]) {
              this.panes[index].classList.add(this.activeClass);
              this.panes[index].setAttribute('aria-hidden', 'false');
            }
            if (this.tabs[this.getNextIndex()]) {
              this.tabs[this.getNextIndex()].classList.add(this.nextClass);
            }
            if (this.panes[this.getNextIndex()]) {
              this.panes[this.getNextIndex()].classList.add(this.nextClass);
            }
            if (this.tabs[this.getPreviousIndex()]) {
              this.tabs[this.getPreviousIndex()].classList.add(this.previousClass);
            }
            if (this.panes[this.getPreviousIndex()]) {
              this.panes[this.getPreviousIndex()].classList.add(this.previousClass);
            }

            // handle fragment ids
            // no need to do this on initial page load, because either it's loading the default
            // (first) tab or we're loading from an existing fragment specifier
            if (this.useFragments && this.tabs[index] && this.tabs[index].id && !isFirstLoad) {
              window.history.replaceState(null, '', '#' + encodeURIComponent(this.tabs[index].id));
            }

            // focus first element inside selected pane for a better screen-reader experience
            if (!isFirstLoad && !this.automated && this.panes[index] && this.panes[index].children.length > 0) {
              this.panes[index].children[0].setAttribute('tabindex', '-1');
              this.panes[index].children[0].focus();
            }

            if (interruptTimer && this.automated) {
              this.play();
            }
            if (typeof this.onChange === 'function') {
              this.onChange(this);
            }
            return this;
          },

          play: function play() {
            this.container.classList.add(this.playingClass);
            if (this.timer > 0) {
              return false;
            }
            this.timer = setInterval(function () {
              this.changeTo('next');
            }.bind(this), this.slideDuration);
            if (typeof this.onPlay === 'function') {
              this.onPlay(this);
            }
            return this;
          },

          pause: function pause() {
            this.container.classList.remove(this.playingClass);
            clearInterval(this.timer);
            this.timer = 0;
            if (typeof this.onPause === 'function') {
              this.onPause(this);
            }
            return this;
          },

          getNextIndex: function getNextIndex() {
            return (this.active + 1) % this.count;
          },

          getPreviousIndex: function getPreviousIndex() {
            return this.active <= 0 ? this.count - 1 : this.active - 1;
          },

          generateTabIds: function generateTabIds() {
            _.forEach(this.tabs, function generateTabId(el) {
              if (el.id) return false;  // skip if an id has been provided for us
              el.id = generateHtmlId(el.textContent, 'tab');
            });
          },

          generateAriaAttributes: function generateAriaAttributes() {
            for (var i = 0; i < this.count; i++) {
              // make sure each pane also has an id
              // if an id is not present, generate from the associated tab id
              if (this.tabs[i] && this.panes[i]) {
                if (!this.panes[i].id) {
                  this.panes[i].id = this.tabs[i].id + '-pane';
                }

                // make sure each tab is linked to its associated pane
                if (this.tabs[i].tagName.toLowerCase() == 'a') {
                  this.tabs[i].href = '#' + this.panes[i].id;
                }
                this.tabs[i].setAttribute('aria-controls', this.panes[i].id);

                // make sure each pane is labeled by its associated tab
                this.panes[i].setAttribute('aria-labelledby', this.tabs[i].id);
              }
            }
          },

          init: function init() {
            // default elements
            this.tabs = toArray(this.tabs ||
              getElementsWithoutParent(this.tabSelector, this.containerSelector, this.container));
            this.panes = toArray(this.panes ||
              getElementsWithoutParent(this.paneSelector, this.containerSelector, this.container));
            this.nextTriggers = toArray(this.nextTriggers ||
              getElementsWithoutParent(this.nextSelector, this.containerSelector, this.container));
            this.previousTriggers = toArray(this.previousTriggers ||
              getElementsWithoutParent(this.previousSelector, this.containerSelector, this.container));
            this.playTriggers = toArray(this.playTriggers ||
              getElementsWithoutParent(this.playSelector, this.containerSelector, this.container));
            this.pauseTriggers = toArray(this.pauseTriggers ||
              getElementsWithoutParent(this.pauseSelector, this.containerSelector, this.container));

            // get final tabs count
            this.count = Math.max(this.tabs.length, this.panes.length);

            // generate tab ids for a11y and fragment links
            this.generateTabIds();

            // link tabs and panes in markup for screen reader benefit
            this.generateAriaAttributes();

            // apply count as container class to help css sizing
            this.container.classList.add('tabs--' + String(this.count));

            // attach event listeners
            _.forEach(this.tabs, function (tab, index) {
              tab.setAttribute('tabindex', '0');
              tab.addEventListener('click', function (ev) {
                ev.preventDefault();
                this.changeTo(index, true);
              }.bind(this));
              tab.addEventListener('keydown', function (ev) {
                if (ev.keyCode === 13 || ev.keyCode === 32) {
                  ev.preventDefault();
                  this.changeTo(index, true);
                }
              }.bind(this));
            }.bind(this));
            _.forEach(this.nextTriggers, function (el) {
              el.addEventListener('click', function (ev) {
                ev.preventDefault();
                this.changeTo('next', true);
              }.bind(this));
            }.bind(this));
            _.forEach(this.previousTriggers, function (el) {
              el.addEventListener('click', function (ev) {
                ev.preventDefault();
                this.changeTo('previous', true);
              }.bind(this));
            }.bind(this));
            _.forEach(this.pauseTriggers, function (el) {
              el.addEventListener('click', function (ev) {
                ev.preventDefault();
                this.pause();
              }.bind(this));
            }.bind(this));
            _.forEach(this.playTriggers, function (el) {
              el.addEventListener('click', function (ev) {
                ev.preventDefault();
                this.play();
              }.bind(this));
            }.bind(this));

            // automated slideshows get paused on mouseover
            if (this.automated) {
              this.container.addEventListener('mouseenter', this.pause.bind(this));
              this.container.addEventListener('mouseleave', this.play.bind(this));
            }

            // if we have a fragment specifier, use it; otherwise, the first tab is open by default
            if (this.useFragments && window.location.hash) {
              var fragment = decodeURIComponent(window.location.hash.substr(1));
              for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id === fragment) {
                  this.active = i;
                  break;
                }
              }
            }

            this.changeTo(this.active, false, true);

            if (this.automated) {
              this.play();
            }

            if (typeof this.onInit === 'function') {
              this.onInit(this);
            }

            this.container.classList.add(this.initClass);

            return this;
          },

          // optional callbacks
          onChange: null,
          onPlay: null,
          onPause: null,
          onInit: null
        };

    // public: make node or nodeList into tab groups
    function add(els, options) {
      options = options || {};
      els = toArray(els);
      _.forEach(els, function (el) {
        var tabGroup = _.assign(Object.create(tabGroupPrototype), { container: el }, options);
        tabGroupList.push(tabGroup);
        tabGroup.init();
      });
      return list();
    }

    // public: returns an array of all tab groups on the page
    function list() {
      return tabGroupList;
    }

    // public: returns all tab groups whose containers match a given css selector
    function find(selector) {
      var result = [];
      _.forEach(list(), function (tabGroup) {
        if (tabGroup.container.matches(selector)) {
          result.push(tabGroup);
        }
      });
      return result;
    }

    // public: returns a single tab group whose container matches a given css selector
    function get(selector) {
      var result = null;
      _.forEach(list(), function (tabGroup) {
        if (tabGroup.container.matches(selector)) {
          result = tabGroup;
          return false;
        }
      });
      return result;
    }

    // public: initialize by adding default elements
    function init() {
      _.forEach(toArray(document.getElementsByClassName('tabs')), function addTabsContainer(container) {
        add(container, {
          automated: container.matches('.tabs--automated'),
          useFragments: container.matches('.tabs--use-fragments'),
        });
      });
    }

    return {
      add: add,
      list: list,
      find: find,
      get: get,
      init: init
    };
  }());


  /* =shared height elements
   * =======================
   *
   * match minimum heights across disparate elements
   *
   * usage:
   * <el data-height-group="groupname" />
   */

  var sharedHeights = (function () {
    var heightGroups = {};

    // public: update all shared-height elements
    function update() {
      var g, thisGroup, heights, maxHeight;

      function resetHeight(el) {
        el.style.minHeight = 0;
        heights.push(el.offsetHeight);
      }
      function applyHeight(el) {
        el.style.minHeight = maxHeight + 'px';
      }

      for (g in heightGroups) {
        if (heightGroups.hasOwnProperty(g)) {
          thisGroup = heightGroups[g];
          heights = [];
          _.forEach(thisGroup, resetHeight);
          maxHeight = Math.max.apply(null, heights);
          _.forEach(thisGroup, applyHeight);
        }
      }
    }

    // public: add shared-height functionality to a node or nodelist
    function add(els, groupName) {
      _.forEach(toArray(els), function (el) {
        var group = groupName || el.getAttribute('data-height-group');
        if (!group) {
          console.warn('No group specified for shared-height element');
          return false;
        }
        heightGroups[group] = heightGroups[group] || [];
        heightGroups[group].push(el);
      });
      return list();
    }

    // public: return heightGroups object
    function list() {
        return heightGroups;
    }

    // public: initialize with default elements
    function init() {
      add(document.querySelectorAll('[data-height-group]'));
      update();
    }

    var debouncedUpdate = _.debounce(update, 75);
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('load', debouncedUpdate);

    return {
      add: add,
      list: list,
      update: update,
      init: init
    };
  }());


  /* =waypoints
   * ==========
   *
   * a scrolling waypoint-based class switcher, for when skrollr is overkill
   *
   * default elements:
   * <el data-waypoints="waypoint[ persist]?: class" />
   *     where waypoint is a number and a unit of measurement (%, px, em).
   *     multiple waypoints may be separated by commas
   */

  var waypoints = (function () {
    var waypointElementList = [],
        waypointElementPrototype = {
          el: null,
          waypoints: [],

          init: function () {
            var configString = this.el.getAttribute('data-waypoints');
            if (!configString) { return false; }

            _.forEach(configString.split(','), function (config) {
              var configParts = config.split(':'),
                  val, cl, unit, persist = false, waypoint;

              try {
                val = configParts[0].trim();
                cl = configParts[1].trim();
                if (val.substr(-7) === 'persist') {
                  persist = true;
                  val = val.slice(0, -7).trim();
                }
                unit = val.replace(/\d|,/g, '') || '%';
                val = parseFloat(val);
                if (!cl || isNaN(val) || typeof val !== 'number') {
                  throw 'Bad config';
                }
                waypoint = _.assign(Object.create(waypointPrototype), {
                  unit: unit,
                  val: val,
                  cl: cl,
                  persistent: persist
                });
                this.waypoints.push(waypoint);
              } catch (e) {
                console.warn('Bad inline configuration provided to waypoints in element ', this.el, ' at waypoint ', configParts[0]);
              }
            }.bind(this));
          }
        },

        waypointPrototype = {
          val: 50,
          unit: '%',
          cl: '',
          persistent: false
        };

    function scrollListener() {
      var viewportHeight = document.documentElement.clientHeight;
      _.forEachRight(waypointElementList, function (waypointElement, elementIndex) {
        var offset = waypointElement.el.getBoundingClientRect().top - viewportHeight,
            scroll = window.scrollY;
        if (offset < 0 && window.scrollY > 0) {
          _.forEachRight(waypointElement.waypoints, function (waypoint, waypointIndex) {
            var test = false;
            switch (waypoint.unit) {
              case '%':
                var percentage = -offset / waypointElement.el.offsetHeight * 100;
                test = percentage > waypoint.val;
                break;
              case 'em':
                var elementFontSize = parseFloat(getComputedStyle(waypointElement.el).fontSize);
                test = -offset > elementFontSize * waypoint.val;
                break;
              case 'rem':
                var documentFontSize = parseFloat(getComputedStyle(document.body).fontSize);
                test = -offset > documentFontSize * waypoint.val;
                break;
              case 'vh':
                test = -offset > viewportHeight / 100 * waypoint.val;
                break;
              default:  // px
                test = -offset > waypoint.val;
                break;
            }
            if (test) {
              waypointElement.el.classList.add(waypoint.cl);

              // no need to continue tracking persistent elements after activation
              if (waypoint.persistent) {
                waypointElement.waypoints.splice(waypointIndex, 1);
              }
            } else {
              waypointElement.el.classList.remove(waypoint.cl);
            }
          });
        } else {
          _.forEach(waypointElement.waypoints, function (waypoint) {
            waypointElement.el.classList.remove(waypoint.cl);
          });
        }

        // prune inactive waypoint elements
        if (waypointElement.waypoints.length === 0) {
          waypointElementList.splice(elementIndex, 1);
        }
      });
    }

    // public: add elements to scroll tracking
    function add(els, options) {
      options = options || {};
      els = toArray(els);
      _.forEach(els, function (el) {
        var waypointElement = _.assign(Object.create(waypointElementPrototype), { el: el, waypoints: [] }, options);
        waypointElementList.push(waypointElement);
        waypointElement.init();
      });
      return list();
    }

    // public: returns an array of all elements currently tracked by waypoints
    function list() {
      return waypointElementList;
    }

    // public: track default elements and add scroll listener
    function init() {
      _.forEach(document.querySelectorAll('[data-waypoints]'), add);
      // do initial pass
      scrollListener();
      // debounce function and listen
      window.addEventListener('scroll', _.throttle(scrollListener, 150));
    }

    return {
      init: init,
      list: list,
      add: add
    };
  }());


  /* =social share links
   * ===================
   *
   * unobtrusive 'share' buttons that don't use too much bandwidth or create
   * privacy concerns
   *
   * default elements:
   * <div data-share-to="facebook twitter google linkedin reddit pinterest tumblr email"></div>
   */

   var sharing = (function () {

    // glean some default parameters from the page
    var defaultOptions = {
      services: 'facebook twitter linkedin email',
      url: (function () {
        var link = document.querySelector('link[rel="canonical"]'),
            og = document.querySelector('meta[property="og:url"]');
        if (link) {
          return link.getAttribute('href');
        } else if (og) {
          return og.getAttribute('content');
        }
        return window.location.href;
      })(),
      title: (function () {
        var og = document.querySelector('meta[property="og:title"]');
        if (og) {
          return og.getAttribute('content');
        }
        return document.title;
      })(),
      abstract: (function () {
        var og = document.querySelector('meta[property="og:description"]'),
            meta = document.querySelector('meta[name="description"]');
        if (og) {
          return og.getAttribute('content');
        } else if (meta) {
          return meta.getAttribute('content');
        }
        return null;
      })(),
      thumbnail: (function () {
        var og = document.querySelector('meta[property="og:image"]'),
            apple = document.querySelector('link[rel="apple-touch-icon-precomposed"]');
        if (og) {
          return og.getAttribute('content');
        } else if (apple) {
          return apple.getAttribute('href');
        }
        return null;
      })(),
      cite: (function () {
        var og = document.querySelector('meta[property="og:site_name"]'),
            link = document.querySelector('link[rel="start"][title]');
        if (og) {
          return og.getAttribute('content');
        } else if (link) {
          return link.getAttribute('title');
        }
        return null;
      })()
    };

    // generate services and their params using passed-in options data
    function generateServiceData(options) {
      options = options || {};
      return {
        facebook: {
          name: 'Facebook',
          icon: 'fab fa-facebook-square',
          url: 'https://www.facebook.com/sharer/sharer.php',
          params: [
            { name: 'u', value: options.url },
            { name: 'title', value: options.title },
            { name: 'quote', value: options.text },
            { name: 'description', value: options.abstract },
            { name: 'caption', value: options.cite },
            { name: 'picture', value: options.thumbnail }
          ]
        },
        twitter: {
          name: 'Twitter',
          icon: 'fab fa-twitter-square',
          url: 'https://twitter.com/intent/tweet',
          params: [
            { name: 'url', value: options.url },
            { name: 'text', value: options.text }
          ]
        },
        google: {
          name: 'Google Plus',
          icon: 'fab fa-google-plus-square',
          url: 'https://plus.google.com/share',
          params: [
            { name: 'url', value: options.url }
          ]
        },
        linkedin: {
          name: 'LinkedIn',
          icon: 'fab fa-linkedin',
          url: 'https://www.linkedin.com/shareArticle',
          params: [
            { name: 'url', value: options.url },
            { name: 'mini', value: 'true' },
            { name: 'title', value: options.title },
            { name: 'summary', value: options.abstract },
            { name: 'source', value: options.cite }
          ]
        },
        reddit: {
          name: 'Reddit',
          icon: 'fab fa-reddit-square',
          url: 'https://www.reddit.com/submit',
          params: [
            { name: 'url', value: options.url },
            { name: 'title', value: options.title }
          ]
        },
        pinterest: {
          name: 'Pinterest',
          icon: 'fab fa-pinterest-square',
          url: 'https://pinterest.com/pin/create/button/',
          params: [
            { name: 'url', value: options.url },
            { name: 'media', value: options.thumbnail },
            { name: 'description', value: options.title }
          ]
        },
        tumblr: {
          name: 'Tumblr',
          icon: 'fab fa-tumblr-square',
          url: 'https://www.tumblr.com/widgets/share/tool',
          params: [
            { name: 'canonicalUrl', value: options.url },
            { name: 'title', value: options.title },
            { name: 'caption', value: options.abstract }
          ]
        },
        email: {
          name: 'Email',
          icon: 'fas fa-envelope-square',
          url: 'mailto:',
          params: [
            { name: 'subject', value: options.title },
            { name: 'body', value: options.url + '\n' + (options.text || '') },
          ]
        }
      };
    }

    // populate our container with share buttons
    function generateMarkup(el, options) {
      var serviceData = generateServiceData(options),
          button = document.createElement('a');
      button.setAttribute('target', '_blank');
      button.className = 'share-buttons__button';

      _.forEach(options.services.split(/\s+/), function (service) {
        if (!service) return false;

        var thisButton = button.cloneNode(true),
            thisData = serviceData[service];

        if (!thisData) return false;

        thisButton.innerHTML = '<span class="' + thisData.icon + '"></span>';
        thisButton.setAttribute('title', 'Share via ' + thisData.name);
        thisButton.href = thisData.url + '?' + thisData.params.map(function (param) {
          if (param.value) {
            return encodeURIComponent(param.name) + '=' + encodeURIComponent(param.value);
          }
          return null;
        }).filter(function (param) {
          return !!param;
        }).join('&');

        el.appendChild(thisButton);
      });
    }

    // add share buttons to a container
    function add(els, options) {
      els = toArray(els);
      options = options || {};
      _.forEach(els, function (el) {
        // look for 'data-share-to' attribute on container if no services are passed
        var declaredServices = {};
        if (!options.services && el.getAttribute('data-share-to')) {
          declaredServices.services = el.getAttribute('data-share-to');
        }
        generateMarkup(el, _.assign(defaultOptions, options, declaredServices));
      });
    }

    // initialize with default elements
    function init() {
      add(document.querySelector('[data-share-to]'));
    }

    return {
      init: init,
      add: add
    };
  })();


  /* =truncators
   * ===========
   *
   * truncate containers to number of lines, fixed height, and so on
   *
   * usage:
   * <div data-truncate-to="5 lines" data-truncate-text="Show More"></div>
   * <div data-truncate-to="100px"></div>
   * <div data-truncate-to="2em"></div>
   * <div data-truncate-to="3 items"></div>
   * etc.
   */

  var truncators = (function () {
    var buttonPrototype = document.createElement('button'),
        truncatorList = [],

        truncatorPrototype = {
          container: null,
          button: null,
          buttonText: "Show More",
          expandedButtonText: "Show Less",
          limit: null,
          limitUnit: null,
          isRepeatable: false,
          isTruncated: false,

          init: function () {
            var configString = this.container.getAttribute('data-truncate-to');

            // parse units
            if ((!this.limit || !this.limitUnit) && configString) {
              this.limit = parseInt((configString.match(/^\d+/) || [''])[0], 10);
              this.limitUnit = (configString.match(/[a-z]+$/i) || [''])[0].trim();
            }
            if (!this.limit || isNaN(this.limit) || !this.limitUnit) {
              console.error("Bad limit or unit config provided to following truncator:", this.container);
              return;
            }

            if (!this.button) {
              this.button = buttonPrototype.cloneNode(true);
            }

            this.truncate();

            this.button.addEventListener('click', function (ev) {
              if (this.isTruncated) {
                this.expand();
              } else {
                this.truncate();
              }
            }.bind(this));
          },

          truncate: function () {
            var normalizedLimit,
                buttonSuffix = '';

            // if we're limiting by items, we can hide items instead of limiting pixel height
            if (this.limitUnit === 'item' || this.limitUnit === 'items') {
              var items = this.container.children,
                  hideCount = items.length - this.limit;

              // do no truncation if there aren't enough items
              if (hideCount <= 0) {
                return;
              }

              for (var i = this.limit; i < items.length; i++) {
                items[i].style.display = 'none';
              }

              if (hideCount > 0) {
                buttonSuffix = ' (' + hideCount + (hideCount > 1 ? ' items' : ' item') + ')';
              }

            // if we're not limiting by items, we'll need to calculate a max-height
            } else {
              this.container.style.overflow = 'hidden';
              switch (this.limitUnit) {
                case '%':
                  normalizedLimit = this.container.clientHeight * this.limit / 100;
                  break;

                case 'em':
                  // compute font size of element in px and multiply
                  normalizedLimit = parseFloat(getComputedStyle(this.container).fontSize) * this.limit;
                  break;

                case 'rem':
                  // compute font size of body in px and multiply
                  normalizedLimit = parseFloat(getComputedStyle(document.body).fontSize) * this.limit;
                  break;

                case 'vh':
                  // take a percentage of viewport height
                  normalizedLimit = document.documentElement.clientHeight * this.limit / 100;
                  break;

                case 'vw':
                  // take a percentage of viewport width
                  normalizedLimit = document.documentElement.clientWidth * this.limit / 100;
                  break;

                case 'line':
                case 'lines':
                  // calculate pixel height of a line and multiply
                  (function (container, limit) {
                    var testEl = document.createElement('div'),
                        lineHeight;
                    testEl.textContent = 'A';
                    container.insertBefore(testEl, container.firstElementChild);
                    lineHeight = testEl.offsetHeight;
                    container.removeChild(testEl);
                    normalizedLimit = lineHeight * limit;
                  })(this.container, this.limit);
                  break;

                default:  // px
                  normalizedLimit = this.limit;
                  break;
              }

              this.container.style.maxHeight = normalizedLimit + 'px';
            }

            this.button.textContent = this.buttonText + buttonSuffix;
            this.container.parentNode.insertBefore(this.button, this.container.nextElementSibling);

            this.isTruncated = true;
          },

          expand: function () {
            if (this.limitUnit === 'item' || this.limitUnit === 'items') {
              _.forEach(this.container.children, function (item) {
                item.style.display = '';
              });
            } else {
              this.container.style.overflow = '';
              this.container.style.maxHeight = '';
            }

            if (this.isRepeatable) {
              this.button.textContent = this.expandedButtonText;
            } else {
              this.button.parentNode.removeChild(this.button);
            }

            this.isTruncated = false;
          }
        };

    buttonPrototype.setAttribute('type', 'button');
    buttonPrototype.className = 'truncator-expand';

    function add(els, options) {
      els = toArray(els);
      options = options || {};
      _.forEach(els, function (el) {
        var truncator = _.assign(Object.create(truncatorPrototype), {container: el}, options);
        truncatorList.push(truncator);
        truncator.init();
      });
    }

    function init() {
      add(document.querySelectorAll('[data-truncate-to]'));
    }

    return {
      init: init,
      add: add
    };
  })();


  /* =horizontal scrollers
   * =====================
   *
   * enable non-touch controls for horizontal scrolling sections
   *
   * <section class="horizontal-scroll">
   *   <div class="horizontal-scroll__wrapper">
   *     <ul class="horizontal-scroll__contents"> ... </ul>
   *   </div>
   *   <button class="horizontal-scroll__control--left"> ... </button>
   *   <button class="horizontal-scroll__control--right"> ... </button>
   * </setion>
   */

  var horizontalScrollers = (function () {
    var scrollers = [],

        scrollerPrototype = {
          el: null,
          wrapper: null,
          contents: null,
          leftButton: null,
          rightButton: null,

          // adjusts how big the 'gravity well' at the start and end of the scrollable area is
          gravity: 24,
          // when using the scroller arrows, if the remaining area to be scrolled in the direction
          // the user just scrolled is less than this value wide (in pixels), it will just scroll
          // the rest of the way
          pagingTolerance: 180,
          // when using the scroller arrows, if we don't end up at an endcap, snap the left side to
          // the nearest item edge?
          pagingSnap: false,

          startClass: 'horizontal-scroll--is-at-start',
          endClass: 'horizontal-scroll--is-at-end',

          init: function init(container) {
            this.el = container;
            this.wrapper = container.querySelector('.horizontal-scroll__wrapper');
            this.contents = container.querySelector('.horizontal-scroll__contents');
            this.leftButton = container.querySelector('.horizontal-scroll__control--left');
            this.rightButton = container.querySelector('.horizontal-scroll__control--right');

            if (!this.wrapper || !this.contents) {
              throw new Error('Structure of horizontal scroller is not correct');
            }

            this.wrapper.addEventListener('scroll', this.scrollListener.bind(this));

            if (this.leftButton) {
              this.leftButton.addEventListener('click', this.pageLeft.bind(this));
            }
            if (this.rightButton) {
              this.rightButton.addEventListener('click', this.pageRight.bind(this));
            }

            this.checkPosition();
          },

          scrollListener: (function () {
            return _.throttle(function throttledScrollListener() {
              this.checkPosition();
            }, 200, { leading: false });
          })(),

          checkPosition: function checkPosition() {
            // check if we're at either edge of the scrollable area, and apply classes accordingly
            var scrollSize = this.wrapper.clientWidth,
                contentSize = this.contents.scrollWidth,
                leftOffset = this.wrapper.scrollLeft;

              this.el.classList.remove(this.startClass);
              this.el.classList.remove(this.endClass);

            if (leftOffset < this.gravity) {
              this.el.classList.add(this.startClass);
              this.scrollToStart();
            } else if (leftOffset > contentSize - scrollSize - this.gravity) {
              this.el.classList.add(this.endClass);
              this.scrollToEnd();
            }
          },

          scrollToStart: function scrollToStart() {
            this.wrapper.scrollLeft = 0;
          },

          scrollToEnd: function scrollToEnd() {
            this.wrapper.scrollLeft = this.contents.scrollWidth - this.wrapper.clientWidth;
          },

          pageLeft: function pageLeft() {
            var pageSize = this.wrapper.clientWidth,
                currentOffset = this.wrapper.scrollLeft,
                destinationOffset = Math.max(currentOffset - pageSize, 0);

            if (destinationOffset < this.pagingTolerance) {
              this.scrollToStart();
            } else {
              this.wrapper.scrollLeft = this.pagingSnap ? this.snapToNearest(destinationOffset) : destinationOffset;
            }
          },

          pageRight: function pageRight() {
            var pageSize = this.wrapper.clientWidth,
                contentSize = this.contents.scrollWidth,
                currentOffset = this.wrapper.scrollLeft,
                maxOffset = contentSize - pageSize,
                destinationOffset = Math.min(currentOffset + pageSize, maxOffset);

            if (destinationOffset > maxOffset - this.pagingTolerance) {
              this.scrollToEnd();
            } else {
              this.wrapper.scrollLeft = this.pagingSnap ? this.snapToNearest(destinationOffset) : destinationOffset;
            }
          },

          snapToNearest: function snapToNearest(targetOffset) {
            var nearestItemOffset = 0,
                leftCandidate = 0,
                rightCandidate = 0,
                leftDiff = 0,
                rightDiff = 0,
                thisChild = null;

            for (var i = 0; i < this.contents.children.length; i++) {
              thisChild = this.contents.children[i];
              if (nearestItemOffset + thisChild.clientWidth > targetOffset) {
                leftCandidate = nearestItemOffset;
                rightCandidate = nearestItemOffset + thisChild.clientWidth;
                break;
              }
              nearestItemOffset += thisChild.clientWidth;
            }

            leftDiff = targetOffset - leftCandidate;
            rightDiff = rightCandidate - targetOffset;
            return leftDiff < rightDiff ? leftCandidate : rightCandidate;
          }
        };

    // public: return a list of scrolling sections tracked by this module
    function list() {
      return scrollers;
    }

    // public: add this module's functionality to a container element
    // see module comment for expected structure
    function add(container) {
      var scroller = Object.create(scrollerPrototype);
      try {
        scroller.init(container);
        scrollers.push(scroller);
      } catch (e) {
        console.error(e);
      }
    }

    // public: initialize this module
    function init() {
      _.forEach(document.querySelectorAll('.horizontal-scroll'), function (container) {
        add(container);
      });
    }

    return {
      add: add,
      list: list,
      init: init,
    };
  }());


  /* =misc
   * =====
   *
   * miscellaneous enhancements that aren't large enough to justify a module
   */

  var misc = (function () {

    var exports = Object.create(null);


    // mobile menu toggle
    exports.addMobileMenuToggle = function addMobileMenuToggle() {
      var inactiveClass = 'mobile-menu-was-open';
      toggles.add(document.getElementsByClassName('page-header__toggle'), {
        targets: toArray(document.querySelectorAll('body, .page-header__content')),
        activeClass: 'mobile-menu-is-open',
        deactivateOnEsc: true,
        onActivate: function (toggle) {
          // add an inactive class only after the menu has been opened and then closed
          if (!toggle.origin.classList.contains(toggle.activeClass)) {
            _.forEach([toggle.origin].concat(toggle.targets), function (el) {
              el.classList.add(inactiveClass);
            });
          } else {
            _.forEach([toggle.origin].concat(toggle.targets), function (el) {
              el.classList.remove(inactiveClass);
            });
          }
        }
      });
    };


    // subnav toggles for mobile drilldown
    exports.addNavDrilldownButtons = function addNavDrilldownButtons() {
      var toggle = document.createElement('button');
      toggle.className = 'header-nav__toggle';
      toggle.setAttribute('type', 'button');
      toggle.setAttribute('data-toggle-target', 'next');
      toggle.innerHTML = 'Expand subnavigation for previous item';

      _.forEach(document.querySelectorAll('.header-nav a + ul'), function (sublist) {
        sublist.parentNode.insertBefore(toggle.cloneNode(true), sublist);
      });
    };


    // allow visual focus and selection indicators of input labels
    exports.focusInputLabels = function focusInputLabels() {
      _.forEach(document.querySelectorAll('label[for]'), function (label) {
        var input = document.getElementById(label.getAttribute('for'));
        // track search container for disclosure search only
        var searchContainer = null;
        if (label.classList.contains('header-search__label')) {
          searchContainer = document.querySelector('.header-search');
        }

        if (input) {
          input.addEventListener('focus', function (ev) {
            label.classList.add('is-focused');
            if (searchContainer) {
              searchContainer.classList.add('is-focused');
            }
          });
          input.addEventListener('blur', function (ev) {
            label.classList.remove('is-focused');
            if (searchContainer) {
              searchContainer.classList.remove('is-focused');
            }
          });
          if (input.type.toLowerCase() === 'radio' || input.type.toLowerCase() === 'checkbox') {
            input.addEventListener('change', function (ev) {
              if (input.checked) {
                label.classList.add('is-selected');
              } else {
                label.classList.remove('is-selected');
              }
            });
          }
          // trigger 'change' event manually in order to populate highlight states on page load
          if ("createEvent" in document) {
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent("change", false, true);
            input.dispatchEvent(ev);
          } else {
            input.fireEvent("onchange");
          }
        }
      });
    };


    // add utility classes to form inputs
    // this makes dynamic labels possible, for example
    exports.addInputUtilityClasses = function addInputUtilityClasses() {
      var inputs = toArray(document.getElementsByTagName('input'))
                   .filter(isTextInput)
                   .concat(toArray(document.getElementsByTagName('textarea')));
      var currentContentClass = 'has-content';
      var pastContentClass = 'did-have-content';

      _.forEach(inputs, function addClassesToInput(input) {
        var hasContainedContent = false;

        // initial state
        if (input.value) {
          input.classList.add(currentContentClass);
          hasContainedContent = true;
        }

        // changes
        input.addEventListener('input', function (ev) {
          if (input.value) {
            hasContainedContent = true;
            input.classList.remove(pastContentClass);
            input.classList.add(currentContentClass);
          } else {
            input.classList.remove(currentContentClass);
            if (hasContainedContent) {
              input.classList.add(pastContentClass);
            }
          }
        });
      });
    };

    var isTextInput = (function () {
      var textInputTypes = ['color', 'date', 'email', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'];
      return function isTextInput(el) {
        return textInputTypes.includes(el.getAttribute('type'));
      };
    })();


    /*
     * Keyboard submenu accessibility
     */
    exports.dropdownKeyboardNav = function dropdownKeyboardNav() {
      const activeClass = 'is-focused';
      const mainNavLinks = Array.from(document.querySelectorAll('.header-nav > ul > li > a'));

      let currentDropdown;

      // open dropdowns on spacebar/downarrow
      mainNavLinks.forEach(function (link) {
        link.addEventListener('keydown', function (ev) {
          if (['ArrowDown', 'Space'].indexOf(ev.code) > -1) {
            ev.preventDefault();
            const dropdown = this.parentNode.querySelector('ul');
            if (!dropdown) return;

            dropdown.classList.add(activeClass);
            dropdown.querySelector('a').focus();

            currentDropdown = dropdown;

            document.body.addEventListener('click', handleClickOutside);
            document.body.addEventListener('keyup', handleEsc);
            Array.from(dropdown.querySelectorAll('a'))
              .forEach(link => link.addEventListener('blur', handleFocusOutside));
          }
        });
      });

      // handle clicking outside a focused dropdown
      function handleClickOutside(ev) {
        if (currentDropdown.contains(ev.target)) return;
        closeDropdown(false);
      }

      function handleEsc(ev) {
        if (ev.code === 'Escape') closeDropdown(true);
      }

      // handle tabbing away from a focused dropdown
      function handleFocusOutside(ev) {
        const links = Array.from(currentDropdown.querySelectorAll('a'));

        // since this is on the blur event of each dropdown link, we need to give
        // the browser time to actually focus the next element
        setTimeout(function () {
          if (links.indexOf(document.activeElement) > -1) return;
          closeDropdown(true);
        }, 0);
      }

      function closeDropdown(focus) {
        currentDropdown.classList.remove(activeClass);

        document.body.removeEventListener('click', handleClickOutside);
        document.body.removeEventListener('keyup', handleEsc);
        Array.from(currentDropdown.querySelectorAll('a'))
          .forEach(link => link.removeEventListener('blur', handleFocusOutside));

        if (focus) currentDropdown.parentNode.firstElementChild.focus();

        currentDropdown = null;
      }
    };


    // automatically create slideshow tab indicators
    exports.createHomeSlideshowTabs = function createHomeSlideshowTabs() {
      var tab = document.createElement('button');
      tab.className = 'home-feature__tab tabs__tab';
      tab.setAttribute('type', 'button');
      _.forEach(document.getElementsByClassName('home-feature'), function (feature) {
        var nav = feature.querySelector('.home-feature__nav');
        if (!nav) {
          nav = document.createElement('div');
          nav.className = 'home-feature__nav';
          feature.appendChild(nav);
        }
        _.forEach(feature.querySelectorAll('.tabs__pane'), function (pane) {
          nav.appendChild(tab.cloneNode(true));
        });
      });
    };


    // initialize ukiyo for parallax effects
    exports.initializeParallax = function initializeParallax() {
      if (typeof Ukiyo === 'function') {
        _.forEach(document.querySelectorAll('.use-parallax'), function (el) {
          new Ukiyo(el, {
            scale: 1.25,
            speed: 1.25,
            willChange: true,
            wrapperClass: 'use-parallax__wrapper',
          });
        });
      }
    };


    // add body waypoint for sticky header
    exports.addHeaderWaypoint = function addHeaderWaypoint() {
      document.body.setAttribute('data-waypoints', '1px: is-scrolled');
    };


    return exports;

  }());


  /* =initialize modules
   * ===================
   */

  var init = function () {
    // functions that must run before large modules
    // e.g. functions that output toggles that must then be initialized
    misc.addHeaderWaypoint();
    misc.addNavDrilldownButtons();
    misc.createHomeSlideshowTabs();

    // large modules
    toggles.init();
    tabs.init();
    sharedHeights.init();
    waypoints.init();
    truncators.init();
    horizontalScrollers.init();
    sharing.init();

    // misc modules
    misc.addMobileMenuToggle();
    misc.focusInputLabels();
    misc.dropdownKeyboardNav();
    misc.addInputUtilityClasses();
    misc.initializeParallax();

    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
  };


  /* =public
   * =======
   */

  return {
    xhr: xhr,
    toggles: toggles,
    tabs: tabs,
    sharedHeights: sharedHeights,
    waypoints: waypoints,
    sharing: sharing,
    init: init
  };

}(window, document));

RDJS.init();
