let monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", false];

function genTZTable(msg) {
    let output = "```";

    if (!msg.content.split(" ").includes("date")) {
        return
    }
    let str = msg.content.split("date").pop();
    console.log("\n" + str);

    // import timezones
    const fs = require('fs');
    let tzs = JSON.parse(fs.readFileSync('tz.json'));

    let d = new Date(str + " 2021");

    for (const [label, tz] of Object.entries(tzs)) {
        let lbl = label;
        for (let i = 15 - label.length; i > 0; i--) {
            lbl = " " + lbl;
        }
        output += `${lbl}: ${dateToText(d,tz)}\n`;
    }
    msg.channel.send(output+"```")
}

function dateToText(d, tz) {
    return d.toLocaleString('en-gb', {
        timeZone: tz,
        hour12: false,
        day: 'numeric',
        month: 'short',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });
}

module.exports = {
    genTZTable
};