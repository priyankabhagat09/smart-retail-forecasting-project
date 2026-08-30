module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/project/postcss.config.mjs { CONFIG => \"[project]/project/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/17ak_0080oic._.js",
  "chunks/[root-of-the-server]__1-un0ac._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/project/postcss.config.mjs { CONFIG => \"[project]/project/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];