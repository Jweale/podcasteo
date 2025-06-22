/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/jobs/route";
exports.ids = ["app/api/jobs/route"];
exports.modules = {

/***/ "(rsc)/./app/api/jobs/route.ts":
/*!*******************************!*\
  !*** ./app/api/jobs/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ulid */ \"(rsc)/./node_modules/ulid/dist/node/index.js\");\n\n\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);\nasync function POST(req) {\n    try {\n        const { title, text_md, language } = await req.json();\n        // Basic validation\n        if (!title || !text_md) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required fields.'\n            }, {\n                status: 400\n            });\n        }\n        if (typeof text_md !== 'string' || text_md.length > 2 * 1024 * 1024) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Transcript too large (max 2MB).'\n            }, {\n                status: 400\n            });\n        }\n        const wordCount = text_md.trim().split(/\\s+/).length;\n        if (wordCount > 15000) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Transcript exceeds 15,000 words.'\n            }, {\n                status: 400\n            });\n        }\n        // Generate a ULID for the job id\n        const jobId = (0,ulid__WEBPACK_IMPORTED_MODULE_2__.ulid)();\n        const orgId = 'demo-org'; // Hardcoded for testing/demo\n        const createdAt = Math.floor(Date.now() / 1000); // Unix timestamp in seconds\n        // Create job\n        const { error: jobError } = await supabase.from('jobs').insert([\n            {\n                id: jobId,\n                org_id: orgId,\n                title,\n                language,\n                state: 'queued',\n                word_count: wordCount,\n                created_at: createdAt\n            }\n        ]);\n        if (jobError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: jobError.message\n            }, {\n                status: 500\n            });\n        }\n        // Create transcript\n        const { error: transcriptError } = await supabase.from('transcripts').insert([\n            {\n                job_id: jobId,\n                text_md,\n                word_count: wordCount\n            }\n        ]);\n        if (transcriptError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: transcriptError.message\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            job_id: jobId\n        }, {\n            status: 201\n        });\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message || 'Unknown error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2pvYnMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUNIO0FBQ3pCO0FBRTVCLE1BQU1HLFdBQVdGLG1FQUFZQSxDQUMzQkcsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQ3hCRixRQUFRQyxHQUFHLENBQUNFLGlCQUFpQjtBQUd4QixlQUFlQyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUgsSUFBSUksSUFBSTtRQUVuRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDSCxTQUFTLENBQUNDLFNBQVM7WUFDdEIsT0FBT1gscURBQVlBLENBQUNhLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUEyQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEY7UUFDQSxJQUFJLE9BQU9KLFlBQVksWUFBWUEsUUFBUUssTUFBTSxHQUFHLElBQUksT0FBTyxNQUFNO1lBQ25FLE9BQU9oQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWtDLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN2RjtRQUNBLE1BQU1FLFlBQVlOLFFBQVFPLElBQUksR0FBR0MsS0FBSyxDQUFDLE9BQU9ILE1BQU07UUFDcEQsSUFBSUMsWUFBWSxPQUFPO1lBQ3JCLE9BQU9qQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQW1DLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN4RjtRQUVBLGlDQUFpQztRQUNqQyxNQUFNSyxRQUFRbEIsMENBQUlBO1FBQ2xCLE1BQU1tQixRQUFRLFlBQVksNkJBQTZCO1FBQ3ZELE1BQU1DLFlBQVlDLEtBQUtDLEtBQUssQ0FBQ0MsS0FBS0MsR0FBRyxLQUFLLE9BQU8sNEJBQTRCO1FBRTdFLGFBQWE7UUFDYixNQUFNLEVBQUVaLE9BQU9hLFFBQVEsRUFBRSxHQUFHLE1BQU14QixTQUMvQnlCLElBQUksQ0FBQyxRQUNMQyxNQUFNLENBQUM7WUFBQztnQkFBRUMsSUFBSVY7Z0JBQU9XLFFBQVFWO2dCQUFPWDtnQkFBT0U7Z0JBQVVvQixPQUFPO2dCQUFVQyxZQUFZaEI7Z0JBQVdpQixZQUFZWjtZQUFVO1NBQUU7UUFFeEgsSUFBSUssVUFBVTtZQUNaLE9BQU8zQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPYSxTQUFTUSxPQUFPO1lBQUMsR0FBRztnQkFBRXBCLFFBQVE7WUFBSTtRQUN0RTtRQUVBLG9CQUFvQjtRQUNwQixNQUFNLEVBQUVELE9BQU9zQixlQUFlLEVBQUUsR0FBRyxNQUFNakMsU0FDdEN5QixJQUFJLENBQUMsZUFDTEMsTUFBTSxDQUFDO1lBQUM7Z0JBQUVRLFFBQVFqQjtnQkFBT1Q7Z0JBQVNzQixZQUFZaEI7WUFBVTtTQUFFO1FBRTdELElBQUltQixpQkFBaUI7WUFDbkIsT0FBT3BDLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7Z0JBQUVDLE9BQU9zQixnQkFBZ0JELE9BQU87WUFBQyxHQUFHO2dCQUFFcEIsUUFBUTtZQUFJO1FBQzdFO1FBRUEsT0FBT2YscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFd0IsUUFBUWpCO1FBQU0sR0FBRztZQUFFTCxRQUFRO1FBQUk7SUFDNUQsRUFBRSxPQUFPdUIsS0FBVTtRQUNqQixPQUFPdEMscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFQyxPQUFPd0IsSUFBSUgsT0FBTyxJQUFJO1FBQWdCLEdBQUc7WUFBRXBCLFFBQVE7UUFBSTtJQUNwRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvam9zaHdlYWxlL0RvY3VtZW50cy9EZXYvcG9kY2FzdGVvL2FwcC9hcGkvam9icy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcbmltcG9ydCB7IHVsaWQgfSBmcm9tICd1bGlkJztcblxuY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCEsXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX0FOT05fS0VZIVxuKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdGl0bGUsIHRleHRfbWQsIGxhbmd1YWdlIH0gPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgLy8gQmFzaWMgdmFsaWRhdGlvblxuICAgIGlmICghdGl0bGUgfHwgIXRleHRfbWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMuJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRleHRfbWQgIT09ICdzdHJpbmcnIHx8IHRleHRfbWQubGVuZ3RoID4gMiAqIDEwMjQgKiAxMDI0KSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1RyYW5zY3JpcHQgdG9vIGxhcmdlIChtYXggMk1CKS4nIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHdvcmRDb3VudCA9IHRleHRfbWQudHJpbSgpLnNwbGl0KC9cXHMrLykubGVuZ3RoO1xuICAgIGlmICh3b3JkQ291bnQgPiAxNTAwMCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdUcmFuc2NyaXB0IGV4Y2VlZHMgMTUsMDAwIHdvcmRzLicgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBhIFVMSUQgZm9yIHRoZSBqb2IgaWRcbiAgICBjb25zdCBqb2JJZCA9IHVsaWQoKTtcbiAgICBjb25zdCBvcmdJZCA9ICdkZW1vLW9yZyc7IC8vIEhhcmRjb2RlZCBmb3IgdGVzdGluZy9kZW1vXG4gICAgY29uc3QgY3JlYXRlZEF0ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7IC8vIFVuaXggdGltZXN0YW1wIGluIHNlY29uZHNcblxuICAgIC8vIENyZWF0ZSBqb2JcbiAgICBjb25zdCB7IGVycm9yOiBqb2JFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKCdqb2JzJylcbiAgICAgIC5pbnNlcnQoW3sgaWQ6IGpvYklkLCBvcmdfaWQ6IG9yZ0lkLCB0aXRsZSwgbGFuZ3VhZ2UsIHN0YXRlOiAncXVldWVkJywgd29yZF9jb3VudDogd29yZENvdW50LCBjcmVhdGVkX2F0OiBjcmVhdGVkQXQgfV0pO1xuXG4gICAgaWYgKGpvYkVycm9yKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogam9iRXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0cmFuc2NyaXB0XG4gICAgY29uc3QgeyBlcnJvcjogdHJhbnNjcmlwdEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ3RyYW5zY3JpcHRzJylcbiAgICAgIC5pbnNlcnQoW3sgam9iX2lkOiBqb2JJZCwgdGV4dF9tZCwgd29yZF9jb3VudDogd29yZENvdW50IH1dKTtcblxuICAgIGlmICh0cmFuc2NyaXB0RXJyb3IpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiB0cmFuc2NyaXB0RXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGpvYl9pZDogam9iSWQgfSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNyZWF0ZUNsaWVudCIsInVsaWQiLCJzdXBhYmFzZSIsInByb2Nlc3MiLCJlbnYiLCJTVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9BTk9OX0tFWSIsIlBPU1QiLCJyZXEiLCJ0aXRsZSIsInRleHRfbWQiLCJsYW5ndWFnZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImxlbmd0aCIsIndvcmRDb3VudCIsInRyaW0iLCJzcGxpdCIsImpvYklkIiwib3JnSWQiLCJjcmVhdGVkQXQiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwibm93Iiwiam9iRXJyb3IiLCJmcm9tIiwiaW5zZXJ0IiwiaWQiLCJvcmdfaWQiLCJzdGF0ZSIsIndvcmRfY291bnQiLCJjcmVhdGVkX2F0IiwibWVzc2FnZSIsInRyYW5zY3JpcHRFcnJvciIsImpvYl9pZCIsImVyciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/jobs/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive":
/*!************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/main/ sync ***!
  \************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_joshweale_Documents_Dev_podcasteo_app_api_jobs_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/jobs/route.ts */ \"(rsc)/./app/api/jobs/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/jobs/route\",\n        pathname: \"/api/jobs\",\n        filename: \"route\",\n        bundlePath: \"app/api/jobs/route\"\n    },\n    resolvedPagePath: \"/Users/joshweale/Documents/Dev/podcasteo/app/api/jobs/route.ts\",\n    nextConfigOutput,\n    userland: _Users_joshweale_Documents_Dev_podcasteo_app_api_jobs_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZqb2JzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZqb2JzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGam9icyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmpvc2h3ZWFsZSUyRkRvY3VtZW50cyUyRkRldiUyRnBvZGNhc3RlbyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZqb3Nod2VhbGUlMkZEb2N1bWVudHMlMkZEZXYlMkZwb2RjYXN0ZW8maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2M7QUFDM0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9qb3Nod2VhbGUvRG9jdW1lbnRzL0Rldi9wb2RjYXN0ZW8vYXBwL2FwaS9qb2JzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9qb2JzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvam9ic1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvam9icy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9qb3Nod2VhbGUvRG9jdW1lbnRzL0Rldi9wb2RjYXN0ZW8vYXBwL2FwaS9qb2JzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/ws","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/ulid","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoshweale%2FDocuments%2FDev%2Fpodcasteo&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();