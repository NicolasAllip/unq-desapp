"use strict";angular.module("advApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile"}).otherwise({redirectTo:"/"})}]),angular.module("advApp").controller("MainCtrl",function(){this["goto"]=function(a,b){setTimeout(function(){window.location.replace(b)},250)},this.searchButtons=[{name:"Gasolera",href:"#/search?strategy=inexpensive",description:"Encontrá opciones gratuitas o baratas para salir y pasarla bien aún cuando estés corto de plata.","class":"card red"},{name:"Con Amigos",href:"#/search?strategy=friends",description:"¿Planificando el fin de semana con amigos? hacé click acá para encontrar las mejores opciones.","class":"card purple"},{name:"Saturday Night Fever",href:"#/search?strategy=saturdaynightfever",description:"Para los que quieren arrancar temprano, y terminar temprano (pero del día siguiente) ;)","class":"card blue"},{name:"Media Naranja",href:"#/search?strategy=couples",description:"Siempre es un buen momento para disfrutar de una salida con tu pareja. Encontrá el lugar ideal.","class":"card orange"},{name:"Sorprendeme",href:"#/search?strategy=surpriseme",description:"Es hora de que hagas algo distinto, dejate sorprender con nuestras opciones más recomendadas.","class":"green "}]}),angular.module("advApp").controller("ProfileCtrl",function(){}),angular.module("advApp").controller("SearchCtrl",function(){}),angular.module("advApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="row"> <div class="col s12 m6 l6" ng-repeat="btn in main.searchButtons"> <div style="height:150px" class="waves-effect waves-light card hoverable {{btn.class}}" ng-click="main.goto(btn.name, btn.href)"> <div class="card-content white-text"> <span class="card-title">{{btn.name}}</span> <p>{{btn.description}}</p> </div> </div> </div> </div>'),a.put("views/profile.html","<p><h3>Configuración del perfil</h3></p>"),a.put("views/search.html","<p><h3>Sección de búsqueda</h3></p>")}]);