// ai-excuse-human-20261124 — writes the excuse line to /output/entry.txt
// Run: node main.ts  (output dir via $MAKEFUN_OUTPUT_DIR, default /output)
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_EXCUSE_CHARS = 200;

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
// The excuse text lives next to this script, never in the working directory,
// so the grader can run main.ts from any cwd and still find it.
const excuseLine = readFileSync(entryPath, "utf8");

if (excuseLine.length < 1 || excuseLine.length > MAX_EXCUSE_CHARS) {
  throw new Error(`excuse must be 1-${MAX_EXCUSE_CHARS} chars, got ${excuseLine.length}`);
}
if (excuseLine.includes("\n")) {
  throw new Error("excuse must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), excuseLine);
