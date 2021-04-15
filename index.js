const fse = require("fs-extra");

const loadCredentialsToJson = (credPath) => {
    if (!fileExistsSync(credPath)) {
        throw new Error(`Can not find credentials in ${credPath}`);
    }
    let credContent = fse.readFileSync(credPath, { encoding: "utf-8" });
    credContent = credContent
        .trim()
        .split("\n")
        .filter((v) => !!v);

    const res = {};
    let key = "";
    credContent.forEach((item) => {
        if (item.includes("[")) {
            key = item.slice(1, -1);
            if (!res[key]) {
                res[key] = {};
            }
        } else {
            const [kkey, vvalue] = item.split("=");
            res[key][kkey] = vvalue;
        }
    });
    return res;
};

const writeJsonToCredentials = (credPath, content = {}) => {
    if (!credPath) {
        throw new Error("Missing required credentials path field");
    }
    let writeContent = "";
    for (const [key, value] of Object.entries(content)) {
        writeContent += `[${key}]\n`;

        for (const [kkey, vvalue] of Object.entries(value)) {
            writeContent += `${kkey}=${vvalue}\n`;
        }
        writeContent += "\n";
    }
    fse.writeFileSync(credPath, writeContent);
};

module.exports = {
    loadCredentialsToJson,
    writeJsonToCredentials,
};
