require('tree-cli')({
    base: '.', // or any path you want to inspect.
    noreport: false,
    ignore: ["node_modules", "coverage", "dist"],
    l: 5,
    d: true,
    o: "./README_Resource/file-structure.txt"
}).then(res => {
    // res.data is the data for the file tree.
    // res.report is the stringified scanning report.
    console.log(res.report);
});