"use strict";
function searchController(a, b, c, d, e, f, g, h) {
  h.fromDetails || (h.places = [], h.events = []), h.fromDetails = !1, a.setEventsPageSize = function (b, c) {
    a.eventsPageSize = b
  }, a.setPlacesPageSize = function (b, c) {
    a.placesPageSize = b
  }, a.isEventsPageSize = function (b) {
    return b == a.eventsPageSize
  }, a.isPlacesPageSize = function (b) {
    return b == a.placesPageSize
  }, a.eventsPageSize = 5, a.placesPageSize = 5, a.responsive = f, a.strategy = "search_strategies." + b.currentStrategy, a.cnt = 1, a.events = h.events ? h.events : [], a.places = h.places ? h.places : [], a.viewPlace = function (a) {
    e(function () {
      h.selectedPlace = a, c.location.replace("#/place_details")
    }, 150)
  }, a.viewEvent = function (a) {
    e(function () {
      h.selectedEvent = a, c.location.replace("#/event_details")
    }, 150)
  }, a.searchAll = function () {
    var c = "?strategy=" + b.currentStrategy + "&user=" + a.user.id + "&assistants=" + a.cnt;
    g.resource("/events/search" + c).query().$promise.then(function (b) {
      a.events = b, h.events = b
    }, function () {
      a.events = [], h.events = []
    }), g.resource("/places/search" + c).query().$promise.then(function (b) {
      a.places = b, h.places = b
    }, function () {
      h.places = [], a.places = []
    })
  }, g.getCurrentUser().then(function (b) {
    a.user = b
  })
}
angular.module("advApp", ["ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ui.materialize", "pascalprecht.translate", "tmh.dynamicLocale", "angular.filter", "adv.gauth", "angularUtils.directives.dirPagination", "psResponsive", "ngMap"]).config(["$routeProvider", function (a) {
  a.when("/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl",
    controllerAs: "main"
  }).when("/#", {
    templateUrl: "views/main.html",
    controller: "MainCtrl",
    controllerAs: "main"
  }).when("/search", {
    templateUrl: "views/search.html",
    controller: "SearchCtrl",
    controllerAs: "search"
  }).when("/profile", {
    templateUrl: "views/profile.html",
    controller: "ProfileCtrl",
    controllerAs: "profile"
  }).when("/friends", {
    templateUrl: "views/friends.html",
    controller: "FriendsCtrl",
    controllerAs: "friends"
  }).when("/event_details", {
    templateUrl: "views/eventDetails.html",
    controller: "eventDetailsCtrl",
    controllerAs: "friends"
  }).when("/place_details", {
    templateUrl: "views/placeDetails.html",
    controller: "placeDetailsCtrl",
    controllerAs: "friends"
  }).otherwise({redirectTo: "/"})
}]).config(["$translateProvider", "tmhDynamicLocaleProvider", function (a, b) {
  a.useStaticFilesLoader({
    prefix: "/i18n/",
    suffix: ".json"
  }).useSanitizeValueStrategy("sanitize").preferredLanguage("es"), b.localeLocationPattern("/i18n/angular-locale_{{locale}}.js")
}]).config(["gauthProvider", function (a) {
  a.setGoogleKey("1012008431025-usfsjk7vqtbe1qgksj60tuh7g32ntv31.apps.googleusercontent.com")
}]).config(["$httpProvider", function (a) {
  a.interceptors.push("httpinterceptor")
}]).run(["$rootScope", function (a) {
  a.currentStrategy = "surprise_me"
}]), $(function () {
  $(".button-collapse").sideNav({menuWidth: 240, edge: "right", closeOnClick: !0})
}), angular.module("psResponsive", []).value("psResponsiveConfig", {
  sizes: [{name: "tiny", minWidth: 0}, {
    name: "small",
    minWidth: 768
  }, {name: "medium", minWidth: 992}, {name: "large", minWidth: 1200}]
}).factory("psResponsive", ["$window", "$filter", "$rootScope", "psResponsiveConfig", function ($window, $filter, $rootScope, psResponsiveConfig) {
  var opRegEx = /[<>]=?\s\w+/, forEach = angular.forEach, filter = angular.filter, sizes = psResponsiveConfig.sizes;
  sizes = $filter("orderBy")(sizes, "-minWidth");
  var getHeight = function () {
    return $window.innerHeight
  }, getWidth = function () {
    return $window.innerWidth
  }, getLabel = function () {
    for (var a = getWidth(), b = 0; b < sizes.length; b++)if (parseInt(a) >= parseInt(sizes[b].minWidth))return sizes[b].name
  }, getWidthFromLabel = function (a) {
    return $filter("filter")(sizes, {name: a}, !0)[0].minWidth
  }, getTest = function (test) {
    var thingy = test.split(" ")[0], against = test.split(" ")[1];
    return isNaN(against) ? eval("(" + getWidth() + " " + thingy + " " + getWidthFromLabel(against) + ")") : eval("(" + getWidth() + thingy + parseInt(against) + ")")
  }, getOrientation = function () {
    return getHeight() > getWidth() ? "portrait" : "landscape"
  };
  return angular.element($window).on("resize", function () {
    $rootScope.$digest()
  }), function (a) {
    return a ? "width" == a ? getWidth() : "height" == a ? getHeight() : "orientation" == a ? getOrientation() : opRegEx.test(a) ? getTest(a) : getLabel() == a : getLabel()
  }
}]), function () {
  angular.module("adv.gauth", [])
}(), function () {
  function a() {
    function a(a, f) {
      function g() {
        r(s().currentUser.get())
      }

      function h() {
        return c
      }

      function i() {
        return d
      }

      function j() {
        return e.clientid
      }

      function k() {
        var b = a.defer();
        return s().signIn().then(function (a) {
          n(a), b.resolve(d.user)
        }, function (a) {
          o(a), b.reject(a)
        }), b.promise
      }

      function l() {
        var b = a.defer(), c = document.getElementById("gSignout");
        "undefined" != typeof c && null != c && c.remove();
        var d = document, e = d.getElementsByTagName("script")[0], f = d.createElement("script");
        return f.src = "https://accounts.google.com/Logout", f.type = "text/javascript", f.id = "gSignout", e.parentNode.insertBefore(f, e), p(), b.resolve(), b.promise
      }

      function m(a) {
        c.push(a)
      }

      function n(a) {
        r(a)
      }

      function o(a) {
        q()
      }

      function p() {
        q()
      }

      function q() {
        d.user = null, d.signedIn = !1
      }

      function r(a) {
        var b = a.getBasicProfile(), c = a.getAuthResponse().id_token;
        d.user = {
          token: c,
          name: b.getGivenName(),
          surname: b.getFamilyName(),
          email: b.getEmail(),
          uid: b.getId(),
          imageUrl: b.getImageUrl()
        }
      }

      function s() {
        return null == b && (b = gapi.auth2.getAuthInstance()), b
      }

      var t = {
        getGoogleKey: j,
        getCurrentState: i,
        reloadState: g,
        addListener: m,
        getListeners: h,
        login: k,
        logout: l
      };
      return t
    }

    var b = null, c = [], d = {user: null, signedIn: !1}, e = {
      clientid: "",
      scope: "email",
      cookie_policy: "single_host_origin"
    };
    this.setGoogleKey = function (a) {
      e.clientid = a
    }, this.$get = a, a.$inject = ["$q", "$http"]
  }

  angular.module("adv.gauth").provider("gauth", a)
}(), function () {
  function a(a, b, c) {
    function d(d, e, f) {
      var g, h = a.document, i = h.getElementsByTagName("script")[0];
      g = h.createElement("script"), g.async = !0, g.src = "//apis.google.com/js/platform.js", g.onload = function () {
        var a = {client_id: b.getGoogleKey(), scope: "email", cookie_policy: "single_host_origin"};
        gapi.load("auth2", function () {
          gapi.auth2.init(a), gapi.auth2.getAuthInstance().isSignedIn.listen(function (a) {
            var d = b.getListeners();
            for (var e in d)b.reloadState(), c(d[e], 0, !0, a)
          })
        })
      }, i.parentNode.insertBefore(g, i)
    }

    var e = {link: d, restrict: "EA"};
    return e
  }

  angular.module("adv.gauth").directive("ngGauth", a), a.$inject = ["$window", "gauth", "$timeout"]
}(), function () {
  function a(b, c, d, e, f, g) {
    function h() {
      var a = g.getCurrentState().user.email;
      return i("/users/:filter/:email").get({filter: "byEmail", email: a}).$promise
    }

    function i(a) {
      var c = d.host(), e = "localhost" === c, f = e ? ":8080/api" : "/api";
      return b((e ? "http://" : "https://") + c + f + a, null, {
        get: {method: "GET"},
        save: {method: "POST"},
        update: {method: "PUT"},
        query: {method: "GET", isArray: !0},
        remove: {method: "DELETE"},
        "delete": {method: "DELETE"}
      })
    }

    function j(a) {
      function b(a) {
        d.resolve(a)
      }

      function c(b) {
        var c = {
          address: ["0.0", "0.0", "Buenos Aires"],
          name: a.name,
          inexpensiveOutingLimit: 100,
          surname: a.surname,
          tags: [],
          friends: [],
          image: a.image,
          email: a.email
        };
        i("/users").save(c).$promise.then(function (a) {
          d.resolve(a)
        })
      }

      var d = f.defer();
      return i("/users/:filter/:email/").get({filter: "byEmail", email: a.email}).$promise.then(b, c), d.promise
    }

    a.$inject = ["$resource", "$rootScope", "$location", "current", "$q", "gauth"];
    var k = {resource: i, getOrCreateUser: j, getCurrentUser: h};
    return k
  }

  angular.module("advApp").factory("API", a), a.$inject = ["$resource", "$rootScope", "$location", "current", "$q", "gauth"]
}(), function () {
  function a(b, c, d) {
    function e() {
      d(function () {
        c.$broadcast("loader_hide")
      }, 500)
    }

    a.$inject = ["$q", "$rootScope", "$timeout"];
    var f = 0;
    return {
      request: function (a) {
        return f++, c.$broadcast("loader_show"), a || b.when(a)
      }, requestError: function (a) {
        return 0 === --f && e(), a || b.when(a)
      }, response: function (a) {
        return 0 === --f && e(), a || b.when(a)
      }, responseError: function (a) {
        return 0 === --f && e(), b.reject(a)
      }
    }
  }

  angular.module("advApp").factory("httpinterceptor", a), a.$inject = ["$q", "$rootScope", "$timeout"]
}(), angular.module("advApp").filter("money", ["$translate", function (a) {
  return function (b) {
    var c = "en" === a.use();
    return c ? b / 15 : b
  }
}]), function () {
  function a(a) {
    return function (a, b, c) {
      return a.$on("loader_show", function () {
        b.hasClass("hidden") && b.removeClass("hidden")
      }), a.$on("loader_hide", function () {
        b.hasClass("hidden") || b.addClass("hidden")
      })
    }
  }

  angular.module("advApp").directive("progressBar", a), a.$inject = ["$rootScope"]
}(), function () {
  function a(a, b, c) {
    a.changeLanguage = function (a) {
      b.use(a), c.set(a)
    }
  }

  angular.module("advApp").controller("LocaleCtrl", a), a.$inject = ["$scope", "$translate", "tmhDynamicLocale"]
}(), function () {
  function a(a, b, c, d, e) {
    a.signedIn = {value: !1}, b.addListener(function (e) {
      d.getOrCreateUser(b.getCurrentState().user).then(function (b) {
        c.user = b, a.signedIn.value = e
      })
    }), a.logout = function () {
      b.logout().then(function () {
        a.signedIn.value = !1, c.user = null
      })
    }, a.login = function () {
      b.login().then(function (b) {
        a.signedIn.value = !0, d.getOrCreateUser(b).then(function (b) {
          c.user = b, a.signedIn.value = !0, e.reload()
        })
      })
    }
  }

  angular.module("advApp").value("current", {user: null}).controller("AuthCtrl", a), a.$inject = ["$scope", "gauth", "current", "API", "$route"]
}(), angular.module("advApp").controller("MainCtrl", ["$rootScope", "$window", "$timeout", "$scope", function (a, b, c, d) {
  var e = this;
  e.a_date = new Date, e["goto"] = function (d, e) {
    a.currentStrategy = d.split(".")[1], c(function () {
      b.location.replace(e)
    }, 150)
  }, e.searchButtons = [{
    name: "search_strategies.inexpensive.title",
    href: "#/search",
    description: "search_strategies.inexpensive.description",
    color: "red"
  }, {
    name: "search_strategies.friends.title",
    href: "#/search",
    description: "search_strategies.friends.description",
    color: "purple"
  }, {
    name: "search_strategies.sat_night_fever.title",
    href: "#/search",
    description: "search_strategies.sat_night_fever.description",
    color: "blue"
  }, {
    name: "search_strategies.couples.title",
    href: "#/search",
    description: "search_strategies.couples.description",
    color: "orange"
  }, {
    name: "search_strategies.surprise_me.title",
    href: "#/search",
    description: "search_strategies.surprise_me.description",
    color: "green "
  }]
}]), function () {
  function a(a, b) {
    function c(b) {
      b.forEach(function (b) {
        b.checked = a.user.tags.indexOf(b.id) > -1;
        var c = b.category;
        a.tags.push(b), c.id < 5 && a.categories.indexOf(c.name) < 0 && a.categories.push(c.name)
      })
    }

    a.loadUser = function () {
      a.tags = [], a.user = {}, a.categories = [], b.getCurrentUser().then(function (b) {
        a.user = b
      }).then(function () {
        b.resource("/tags").query().$promise.then(c)
      })
    }, a.selectTag = function (b) {
      var c = a.user.tags.indexOf(b);
      $("#chk" + b).prop("checked") ? c && a.user.tags.push(b) : a.user.tags.splice(c, 1)
    }, a.loadUser(), a.save = function () {
      a.user.$update(function () {
        Materialize.toast("Cambios guardados correctamente", 2e3)
      })
    }
  }

  angular.module("advApp").controller("ProfileCtrl", a), a.$inject = ["$scope", "API"]
}(), function () {
  function a(a, b, c, d) {
    a.user = c.user, a.searchText = "", a.results = [], a.search = function (c) {
      return c.length < 2 ? void(a.results = []) : void b.resource("/users/byName/" + c).query().$promise.then(function (b) {
        a.results = _.filter(b, function (b) {
          return _.every(a.user.friends, function (c) {
            return c[0] != b[0] && a.user.id != b[0]
          })
        })
      }, function (b) {
        return console.log(b), a.results = [], !1
      })
    }, a.addFriend = function (c) {
      b.resource("/users/" + a.user.id + "/addFriend/" + c[0]).update(null, function (b) {
        a.user = b, Materialize.toast(d("translate")("add_friend_ok"), 2e3)
      })
    }, a.remove = function (c) {
      confirm("¿Desea eliminar a " + c[1] + " de su lista de amigos?") && b.resource("/users/" + a.user.id + "/removeFriend/" + c[0]).update(null, function (b) {
        a.user = b, Materialize.toast(d("translate")("remove_friend_ok"), 2e3)
      })
    }
  }

  angular.module("advApp").controller("FriendsCtrl", a), a.$inject = ["$scope", "API", "current", "$filter"]
}(), angular.module("advApp").controller("SearchCtrl", searchController), searchController.$inject = ["$scope", "$rootScope", "$window", "$location", "$timeout", "psResponsive", "API", "current"], function () {
  function a(a, b, c, d) {
    d.selectedEvent ? b.event = d.selectedEvent : (d.fromDetails = !0, a.location.replace("#/search")), b.backToSearch = function () {
      d.fromDetails = !0, a.location.replace("#/search")
    }, b.getCoords = function (a) {
      if (a) {
        var b = a.address[0], c = a.address[1];
        return b + ", " + c
      }
      return ""
    }, b.toggleAssistance = function () {
      var a = b.is_assistant ? "addAssistant" : "removeAssistant";
      c.resource("/places/" + b.event.id + "/" + a + "/" + d.user.id).update().$promise.then(function (a) {
        b.event.assistants = a.assistants, Materialize.toast("Asistencia guardada correctamente.", 2e3)
      }, function (a) {
        console.log("error al " + (b.is_assistant ? "agregar" : "eliminar") + " el asistente")
      })
    }, b.gmaps = {url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCaV2l2uewZ3-Cqtj9Z-LX2OrsU0zv99dI", zoom: 15}
  }

  angular.module("advApp").controller("eventDetailsCtrl", a), a.$inject = ["$window", "$scope", "API", "current"]
}(), function () {
  function a(a, b, c, d) {
    function e() {
      return b.place.assistants.indexOf(d.user.id) > -1
    }

    d.selectedPlace ? (b.place = d.selectedPlace, b.is_assistant = e()) : a.location.replace("#/search"), b.backToSearch = function () {
      d.fromDetails = !0, a.location.replace("#/search")
    }, b.getCoords = function (a) {
      if (a) {
        var b = a.address[0], c = a.address[1];
        return b + ", " + c
      }
      return ""
    }, b.toggleAssistance = function () {
      var a = b.is_assistant ? "addAssistant" : "removeAssistant";
      c.resource("/places/" + b.place.id + "/" + a + "/" + d.user.id).update().$promise.then(function (a) {
        b.place.assistants = a.assistants, Materialize.toast("Asistencia guardada correctamente.", 2e3)
      }, function (a) {
        console.log("error al " + (b.is_assistant ? "agregar" : "eliminar") + " el asistente")
      })
    }, b.gmaps = {url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCaV2l2uewZ3-Cqtj9Z-LX2OrsU0zv99dI", zoom: 15}
  }

  angular.module("advApp").controller("placeDetailsCtrl", a), a.$inject = ["$window", "$scope", "API", "current"]
}(), angular.module("advApp").run(["$templateCache", function (a) {
  a.put("views/eventDetails.html", '<div class="card-panel"> <div class="row"> <div class="col s12"> <a href="" ng-click="backToSearch()" class="black-text"><i class="material-icons right">close</i></a> </div> <div class="col s12 m8 l9"> <h5> <i class="fa fa-calendar" aria-hidden="true"></i> <strong>{{event.name}}</strong> </h5> </div> <div class="col s12 m4 l3" style="margin-top:10px"> <div class="flow-text"> <input id="assistance" type="checkbox" ng-model="is_assistant" ng-change="toggleAssistance()"> <label for="assistance">Asistiré</label> </div> </div> </div> <div class="row section"> <div class="col s12 m6"> <p class="flow-text"><strong>{{event.startDateTime | date}}</strong><br>{{event.description}}</p> </div> <div class="col s12 m6" style="height:300px"> <img class="responsive-img outingImage" src="{{event.image}}" style="height:450px"> </div> </div> <div class="row section"> <div class="col s12"> <div map-lazy-load map-lazy-load-params="{{gmaps.url}}"> <ng-map zoom="{{gmaps.zoom}}" class="map" center="{{getCoords(event)}}"> <!--{{getCoords(event)}}">--> <marker position="{{getCoords(event)}}" title="{{event.name}}"> <!--{{getCoords(event)}}" icon="/img/pizzeria.png" title="{{event.name}}">--> </marker> </ng-map> </div> </div> </div> </div>'), a.put("views/friends.html", '<div class="card-panel"> <h6 translate="friends_search"></h6> <div class="row section"> <div input-field class="col s12 m6 l4"> <label translate>buscar...</label> <input type="text" ng-model="searchText" ng-change="search(searchText)" ng-model-options="{ updateOn: \'default blur\', debounce: { \'default\': 1000, \'blur\': 0 } }"> </div> <div class="col s12 m7 l9"> <table class="dtable striped"> <tr ng-repeat="r in results"> <td>{{r[1]}}</td> <td><a href="" ng-click="addFriend(r)" class="btn right">agregar</a></td> </tr> </table> </div> </div> <div class="divider"></div> <h5 translate="my_friends"></h5> <div class="row section"> <table> <tr ng-repeat="f in user.friends"> <td><i class="fa fa-user left"></i>{{f[1]}}</td> <td><a href="" ng-click="remove(f)"><i class="material-icons">close</i></a></td> <td></td> </tr> </table> </div> <ul><li></li></ul> </div>'), a.put("views/main.html", '<div class="row"> <div class="col s12 m12 l6 center-align" ng-repeat="btn in main.searchButtons"> <div class="main-btn waves-effect waves-light card-panel small hoverable opacity-80 txt-shadow {{btn.color}}" ng-click="main.goto(btn.name, btn.href)"> <span class="white-text"> <h5 translate>{{btn.name}}</h5> <p translate>{{btn.description}}</p> </span> </div> </div> </div> <p>{{$location.host()}}</p>'), a.put("views/placeDetails.html", '<div class="card-panel"> <div class="row"> <div class="col s12"> <a href="" ng-click="backToSearch()" class="black-text"><i class="material-icons right">close</i></a> </div> <div class="col s12 m8 l9"> <h5> <i class="fa fa-map-marker left" aria-hidden="true"></i> <strong>{{place.name}}</strong></h5> </div> <div class="col s12 m4 l3" style="margin-top:10px"> <div class="flow-text"> <input id="assistance" type="checkbox" ng-model="is_assistant" ng-change="toggleAssistance()"> <label for="assistance">Asistiré</label> </div> </div> </div> <div class="row section"> <div class="col s12 m6"> <p class="flow-text">{{place.description}}</p> </div> <div class="col s12 m6" style="height:300px"> <img class="responsive-img outingImage" src="{{place.image}}" style="width:450px"> </div> </div> <div class="row section"> <div class="col s12"> <div map-lazy-load map-lazy-load-params="{{gmaps.url}}"> <ng-map zoom="{{gmaps.zoom}}" class="map" center="{{getCoords(place)}}"> <marker position="{{getCoords(place)}}" title="{{event.name}}"> </marker> </ng-map> </div> </div> </div> </div>'), a.put("views/profile.html", '<div class="card-panel"> <h5 translate> profile </h5> <div class="divider"></div> <div class="row section"> <div input-field class="col s12 m6 l6"> <label translate>name</label> <input type="text" ng-model="user.name"> </div> <div input-field class="col s12 m6 l6"> <label translate>surname</label> <input type="text" ng-model="user.surname"> </div> <div input-field class="col s12 m6 l6"> <label translate>email</label> <input type="email" ng-model="user.email" readonly> </div> </div> <div class="divider"></div> <div class="row section"> <table style="border-collapse: collapse; padding: 0 0 0 0"> <tr> <td style="text-align: right; width:20px"> $ </td> <td> <div input-field class="col s7 m4 l3"> <label translate>inexpensive_limit</label> <input type="text" ng-model="user.inexpensiveOutingLimit"> </div> </td> </tr> </table> </div> <div class="divider"></div> <div class="row section"> <div class="col s12 m6 l5 offset-l1" ng-repeat="c in categories"> <h6 translate="tag_categories.{{c}}"></h6> <div ng-repeat="t in tags | filter: {category: {name: c}} "> <input type="checkbox" id="chk{{t.id}}" ng-model="t.checked" ng-change="selectTag(t.id)"> <label for="chk{{t.id}}">{{t.name}}</label> </div> </div> </div> <div class="divider"></div> <div class="row section"> <div class="col s12 center-align"> <a class="waves-effect waves-light btn" ng-click="save()">GUARDAR <i class="material-icons right">save</i></a> </div> </div> </div>'), a.put("views/search.html", '<div class="card-panel"> <div class="center-align"><h5 translate="{{strategy}}.title"></h5></div> <div class="row section"> <div class="input-field col s12 m6 l6"> <label translate>assistants</label> <input type="number" ng-model="cnt"> </div> <div class="col s12 m6 l6"> <a class="waves-effect waves-light btn" style="margin-top:14px" ng-click="searchAll()"><i class="material-icons left">search</i>{{\'search\' | translate}}</a> </div> </div> <div class="divider"></div> <div class="row section"> <div class="center-align"><h6 translate="events"></h6></div> <table class="dtable striped"> <tr dir-paginate="e in events | itemsPerPage: eventsPageSize" pagination-id="eventsPager"> <td>{{e.startDateTime | date}}</td> <td>{{e.name}}</td> <td><a href="" ng-click="viewEvent(e)" class="btn-details btn waves-effect waves-light center-align right">{{\'details\' | translate}}</a> </td> </tr> </table> <div class="row center-align"> <div class="col s6"> <dir-pagination-controls auto-hide="false" boundary-links="true" pagination-id="eventsPager"></dir-pagination-controls> </div> <div class="col s6"> <ul class="pagination"> <li class="hide-on-med-and-down"><a translate="page_size"></a></li> <li ng-class="{active:isEventsPageSize(5)}"><a href="" ng-click="setEventsPageSize(5)">5</a></li> <li ng-class="{active:isEventsPageSize(10)}"><a href="" ng-click="setEventsPageSize(10)">10</a></li> <li ng-class="{active:isEventsPageSize(20)}"><a href="" ng-click="setEventsPageSize(20)">20</a></li> </ul> </div> </div> </div> <div class="row section"> <div class="center-align"> <h6 translate="places"></h6> <select></select> </div> <table class="dtable striped"> <tr dir-paginate="p in places | itemsPerPage: placesPageSize" pagination-id="placesPager"> <td style="width:20%">{{p.name}}</td> <td>{{p.description}}</td> <td><a href="" ng-click="viewPlace(p)" class="btn-details btn waves-effect waves-light center-align right">{{\'details\' | translate}}</a> </td> <!--{{\'details\' | translate}}--> </tr> </table> <div class="center-align"> <div class="col s6"> <dir-pagination-controls auto-hide="false" boundary-links="true" pagination-id="placesPager"></dir-pagination-controls> </div> <div class="col s6"> <ul class="pagination"> <li class="hide-on-med-and-down"><a translate="page_size"></a></li> <li ng-class="{active:isPlacesPageSize(5)}"><a href="" ng-click="setPlacesPageSize(5)">5</a></li> <li ng-class="{active:isPlacesPageSize(10)}"><a href="" ng-click="setPlacesPageSize(10)">10</a></li> <li ng-class="{active:isPlacesPageSize(20)}"><a href="" ng-click="setPlacesPageSize(20)">20</a></li> </ul> </div> </div> </div> </div>')
}]);
