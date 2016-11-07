"use strict";angular.module("advApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ui.materialize"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile"}).otherwise({redirectTo:"/"})}]),$(function(){$(".button-collapse").sideNav({menuWidth:300,edge:"right",closeOnClick:!0})}),angular.module("advApp").controller("MainCtrl",function(){this["goto"]=function(a,b){setTimeout(function(){window.location.replace(b)},150)},this.searchButtons=[{name:"Gasolera",href:"#/search?strategy=inexpensive",description:"Encontrá opciones gratuitas o baratas para salir y pasarla bien aún cuando estés corto de plata.","class":"card red"},{name:"Con Amigos",href:"#/search?strategy=friends",description:"¿Planificando el fin de semana con amigos? hacé click acá para encontrar las mejores opciones.","class":"purple"},{name:"Saturday Night Fever",href:"#/search?strategy=saturdaynightfever",description:"Si para vos el horario no es un problema, acá te damos opciones para una salida de sol a sol.","class":"blue"},{name:"Media Naranja",href:"#/search?strategy=couples",description:"Siempre es un buen momento para disfrutar de una salida con tu pareja. Encontrá el lugar ideal.","class":"orange"},{name:"Sorprendeme",href:"#/search?strategy=surpriseme",description:"Es hora de que hagas algo distinto, dejate sorprender con nuestras opciones más recomendadas.","class":"green "}]}),angular.module("advApp").controller("ProfileCtrl",["$scope","$resource",function(a,b){a.user=b("http://localhost:8080/api/users/1").get()}]),angular.module("advApp").controller("SearchCtrl",function(){}),angular.module("advApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="row"> <div class="col s12 m12 l6 center-align" ng-repeat="btn in main.searchButtons"> <div style="height:170px; width:100%" class="waves-effect waves-light card-panel hoverable {{btn.class}}" ng-click="main.goto(btn.name, btn.href)"> <span class="white-text"> <h5>{{btn.name}}</h5> <p>{{btn.description}}</p> </span> </div> </div> </div>'),a.put("views/profile.html",'<h5>Tu perfil</h5> <div class="row"> <div input-field class="col s12 m6 l5"> <label>Nombre</label> <input type="text" ng-model="user.name"> </div> <div input-field class="col s12 m6 l5"> <label>Apellido</label> <input type="text" ng-model="user.surname"> </div> <div input-field class="col s12 m6 l5"> <label>Email</label> <input type="text"> </div> </div> <h5>Preferencias</h5> <div class="row"> <div input-field class="col s12 m6 l5"> <label>Limite para salidas baratas</label> <input type="number"> </div> <div> <input type="checkbox" id="chk1" checked> <label for="chk1">Rock</label> </div> <div> <input type="checkbox" id="chk2" checked> <label for="chk2">Cumbia</label> </div> <div> <input type="checkbox" id="chk3" checked> <label for="chk3">Jazz</label> </div> <div> <input type="checkbox" id="chk4" checked> <label for="chk4">Pop</label> </div> </div>'),a.put("views/search.html",'<p><h3>Sección de búsqueda</h3></p> <p ng-repeat="u in search.users">{{u.name}}</p>')}]);