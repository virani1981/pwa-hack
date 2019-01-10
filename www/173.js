(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[173],{

/***/ "./node_modules/kws-weather-widgets/dist/esm/es5/build/52hfsfct.sc.entry.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/kws-weather-widgets/dist/esm/es5/build/52hfsfct.sc.entry.js ***!
  \**********************************************************************************/
/*! exports provided: KwsUvIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KwsUvIndex", function() { return KwsUVIndex; });
/* harmony import */ var _kwsweather_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../kwsweather.core.js */ "./node_modules/kws-weather-widgets/dist/esm/es5/kwsweather.core.js");
/*! Built with http://stenciljs.com */
var KwsUVIndex=function(){function e(){}return e.prototype.mainClass=function(){var e=this.description();switch(e){case"Low":return"low-risk";case"Moderate":return"moderate-risk";case"High":return"high-risk";case"Very High":return"very-high-risk";case"Extreme":return"extreme-risk";default:e&&console.error("kws-uv-index: unknown description "+this.description())}},e.prototype.description=function(){if(this.uvIndex||0===this.uvIndex)return this.uvIndex<3?"Low":this.uvIndex<6?"Moderate":this.uvIndex<8?"High":this.uvIndex<11?"Very High":"Extreme"},e.prototype.render=function(){return Object(_kwsweather_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div",{class:this.mainClass()},Object(_kwsweather_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div",{class:"value"},this.uvIndex||0===this.uvIndex?this.uvIndex.toFixed(1):""),Object(_kwsweather_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div",{class:"description"},this.description()))},Object.defineProperty(e,"is",{get:function(){return"kws-uv-index"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{uvIndex:{type:Number,attr:"uv-index"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".value.sc-kws-uv-index{font-size:var(--kws-uv-index-value-font-size);font-weight:var(--kws-uv-index-value-font-weight)}.description.sc-kws-uv-index{font-size:var(--kws-uv-index-description-font-size);font-weight:var(--kws-uv-index-description-font-weight)}.low-risk.sc-kws-uv-index{color:#4f912a}.moderate-risk.sc-kws-uv-index{color:#f5e24d}.high-risk.sc-kws-uv-index{color:#e5632b}.very-high-risk.sc-kws-uv-index{color:#c52a2a}.extreme-risk.sc-kws-uv-index{color:#6350c1}"},enumerable:!0,configurable:!0}),e}();

/***/ })

}]);
//# sourceMappingURL=173.js.map