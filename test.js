const fs = require("node:fs");
const json = JSON.parse(fs.readFileSync("svatky.json", "utf-8"));

const input = "24. 2.";
const jmena = [];
for (let x in json) {
    if (json[x] === input) {
        jmena.push(x);
    }
}
let output = "";
i = 1;
for (let x of jmena) {
    output += x;
    if (i !== jmena.length) {
        output += ", ";
    }
    i += 1;
}
console.log(`${input} slaví svátek ${output}.`);