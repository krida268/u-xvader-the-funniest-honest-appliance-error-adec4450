// The Funniest Honest Appliance Error — make.fun entry.
// Writes one line (1-200 chars): the washing machine's honest drain error.
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "Error E20: Cannot drain. There is a sock in my pump. It was your favourite one.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-200 chars, one line.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error(`entry violates gate: ${ENTRY.length} chars`);
}

// Resolve the target: a file path, or a directory (then write entry.txt inside it).
function resolveTarget(arg: string | undefined): string {
  const raw = arg ?? "/output/entry.txt";
  try {
    if (statSync(raw).isDirectory()) return raw.replace(/\/$/, "") + "/entry.txt";
  } catch {
    // path does not exist yet: treat as a file path
  }
  return raw;
}

function main(): void {
  const target = resolveTarget(process.argv[2]);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
