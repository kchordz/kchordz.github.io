const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const pStart = html.indexOf('const projects=[');
const pEnd = html.indexOf('];', pStart);

if (pStart !== -1 && pEnd !== -1) {
    const jsonStr = html.substring(pStart + 'const projects='.length, pEnd + 1);
    const data = JSON.parse(jsonStr);

    // Original keys to match user's explicit mentions:
    // oppo, sureadmissions, realestate... end with peacefulvoices (key is peaceful)
    const order = ["oppo", "sureadmissions", "realestate", "bdglobal", "vasiti", "political", "church", "kiks", "random", "peaceful"];

    data.sort((a, b) => {
        let ai = order.indexOf(a.key);
        let bi = order.indexOf(b.key);
        if (ai === -1) ai = 999;
        if (bi === -1) bi = 999;
        return ai - bi;
    });

    const newJsonStr = JSON.stringify(data);
    html = html.substring(0, pStart + 'const projects='.length) + newJsonStr + html.substring(pEnd + 1);
    fs.writeFileSync('index.html', html);
    console.log("Updated projects order successfully!");
} else {
    console.log("Could not find start/end");
}
