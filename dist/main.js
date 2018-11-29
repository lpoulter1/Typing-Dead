/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _zombie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zombie.js */ \"./src/zombie.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nconst words = [\"hello\", \"word\"];\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const input = document.getElementById('typing-form');\n  \n  let x = -100;\n  let y = canvas.height / 2 - 70;\n  let dx = 7;\n  let zombieAlive = true;\n  let health = 100;\n  let shift = 0;\n  const frameWidth = 100;\n  let totalFrames = 12;\n  let currentFrame = 0;\n\n  function draw () {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    if (zombieAlive === true) {\n      Object(_zombie_js__WEBPACK_IMPORTED_MODULE_0__[\"drawZombie\"])(ctx, \"hello\", x, y, shift)\n    }\n    if (x < canvas.width - 200) {\n      x+=dx;\n      shift+=frameWidth + 1\n      currentFrame += 1\n      if (currentFrame === totalFrames) {\n        shift = 0;\n        currentFrame = 0;\n      }\n    } else if (health > 0) {\n      health -= .5\n      console.log(health)\n    }\n\n    if (health > 0) {\n      Object(_player__WEBPACK_IMPORTED_MODULE_1__[\"drawPlayer\"])(ctx);\n    }\n  }\n\n  input.addEventListener('keyup', handleZombie)\n  function handleZombie (e) {\n    if (e.keyCode === 13 && words.includes(input.value)) {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n      console.log(input.value);\n      input.value = \"\";\n      zombieAlive = false;\n      Object(_player__WEBPACK_IMPORTED_MODULE_1__[\"drawPlayer\"])(ctx);\n    } else if (e.keycode === 13) {\n      console.log(input.value);\n      input.value = \"\";\n    } else {\n      null\n    }\n  }\n  \n  setInterval(draw, 80);\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: drawPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawPlayer\", function() { return drawPlayer; });\n\nconst drawPlayer = (ctx) => {\n  ctx.beginPath();\n  ctx.rect(canvas.width - 150, canvas.height/2 - 70, 35, 70);\n  ctx.fillStyle = \"#7FFF00\";\n  ctx.fill();\n  ctx.closePath();\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/zombie.js":
/*!***********************!*\
  !*** ./src/zombie.js ***!
  \***********************/
/*! exports provided: drawZombie, drawText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawZombie\", function() { return drawZombie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawText\", function() { return drawText; });\n\nconst frameWidth = 100;\nconst frameHeight = 144;\n\nfunction animate(ctx, image, x, y, shift) {\n  ctx.drawImage(image, shift, 165, frameWidth, frameHeight,\n  x, 150, frameWidth, frameHeight)\n}\n\n\nconst drawZombie = (ctx, word, x, y, shift) => {\n\n  const zombieImage = new Image();\n  zombieImage.src = \"../assets/zombie_sprite.png\";\n\n  animate(ctx, zombieImage, x, y, shift);\n\n  ctx.beginPath();\n  ctx.fillStyle = \"#F8030F\";\n  ctx.fillRect(x, y, 35, 70);\n  ctx.fillStyle = \"black\";\n  ctx.font = \"20pt sans-serif\";\n  ctx.fillText(word, x-8, y-5);\n  ctx.closePath();\n}\n\nconst drawText = (ctx) => {\n  ctx.beginPath();\n\n  ctx.fillStyle = \"red\";\n  ctx.fillRect(x, y, 35, 70);\n  ctx.fillStyle = \"black\";\n  ctx.font = \"20pt sans-serif\";\n  ctx.fillText(\"word1\", 145, canvas.height / 2 - 70);\n}\n\n\n//# sourceURL=webpack:///./src/zombie.js?");

/***/ })

/******/ });