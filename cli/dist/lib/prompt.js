import { createInterface } from "node:readline";
export async function prompt(label) {
    const input = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) => {
        input.question(`${label}: `, resolve);
    });
    input.close();
    return answer.trim();
}
export async function promptPassword(label) {
    if (!process.stdin.isTTY) {
        return prompt(label);
    }
    process.stdout.write(`${label}: `);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    return new Promise((resolve) => {
        let password = "";
        const onData = (chunk) => {
            for (const character of chunk) {
                if (character === "\u0003") {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    process.stdin.off("data", onData);
                    process.exit(130);
                }
                if (character === "\r" || character === "\n") {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    process.stdin.off("data", onData);
                    process.stdout.write("\n");
                    resolve(password);
                }
                else if (character === "\u007f") {
                    password = password.slice(0, -1);
                }
                else {
                    password += character;
                }
            }
        };
        process.stdin.on("data", onData);
    });
}
