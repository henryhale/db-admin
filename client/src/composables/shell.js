import { dim, gray, green, magenta, cyan, red, white } from "inken";

// API route
const apiURL = "/api";

/**
 * function to simulate a simple database shell
 */
export function setupShell(term) {
    // help information
    const manual =
        green(".clear  ") + 
        gray("clear the screen") + 
        green("\n.help   ") + 
        gray("display this help message") + 
        green("\n[hint]: ") + 
        gray(`enter SQL query on ${magenta("sql>")} prompt`) + 
        green("\n[hint]: ") + 
        gray(`enter comma-separated parameters on ${magenta("params>")} prompt in case of parameterized queries`);

    // startup message
    function init() {
        term.writeln(
            cyan("Welcome to DB-Admin!") +
            green("\n[hint]:") + 
            gray(` Type ${white(".help")} for more information.`)
        );
        term.resume();
        term.focus();
    }

    // readline function
    async function readline(qn = ">") {
        return await new Promise((resolve, reject) => {
            term.write(magenta(qn));
            function handleKey(ev) {
                if (ev.ctrlKey && ev.key.toLowerCase() === "c") {
                    ev.cancel();
                    reject("\n[x]: aborted!");
                }
            }
            term.on("keypress", handleKey);
            term.once("data", input => {
                term.off("keypress", handleKey);
                resolve(input);
            });
        });
    }

    // function to start database REPL
    async function run() {
        let sql, params;
        while (true) {
            try {
                term.resume();
                sql = await readline("sql> ");
                if (!sql?.length) {
                    continue;
                }
                if (sql.includes("?")) {
                    params = await readline("params> ");
                }
                term.pause();
                if (sql.trim() === ".clear") {
                    term.clear();
                    continue;
                }
                if (sql.trim() === ".help") {
                    term.writeln(manual);
                    continue;
                }
                term.write("<span class='spinner'></span> executing, please wait...");
                const { 
                    db = "", 
                    result = [], 
                    error = "" 
                } = await postRequest(sql, params);
                term.clearLast();
                if (error) throw error;
                if (result) term.write(renderResult(result, db));
            } catch (error) {
                term.writeln(red(error?.toString()));
                console.trace(error);
            }
        }
    }

    // function to post sql query to the server and return result 
    async function postRequest(sql = "", params = "") {
        const result = await fetch(apiURL, { 
            method: 'post', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sql, params }) 
        });
        return await result.json();
    }

    // function to prepare the server result into a meaningful display message
    function renderResult(result = [], db = "db") {
        if (!(result instanceof Array)) {
            let output = db + ": ";
            if (result?.affectRows) {
                output += result.affectRows +  " rows affected"; 
            } else if (result?.insertId) {
                output += "last insert id => " + result.insertId; 
            } else if (result?.changedRows) {
                output += result.changedRows +  " rows changed"; 
            } else if (result?.info) {
                output += result.info;
            } else {
                output += "query successfully executed";
            }
            return dim(output + "\n");
        } 
        const first = result[0];
        if (!first) return "";
        const head = Object.keys(first);
        let output = "<table><thead><tr>";
        head.forEach(h => {
            output += "<th>" + green(" " + h + " ") + "</th>";
        });
        output += "</tr></thead>";
        for (const row of result) {
            output += "<tr>";
            head.forEach(h => {
                output += "<td> " + row[h] + " </td>";
            });
            output + "</tr>";
        }
        output += "</table>";
        return output;
    }

    // shell api
    return { init, run };
}
