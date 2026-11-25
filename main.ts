// Per My Last Email — one-line office joke
// make.fun bounty: u-markk-st-one-line-office-jokes-a51f2bcc
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one joke, one line, 108 characters —
// to /output/entry.txt, then proves the write before it exits.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const JOKE =
  "I replied 'per my last email' so politely that HR asked me to teach a workshop on threatening people nicely.";

const GATE = {
  minChars: 1,
  maxChars: 199,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "single-line",
    check: (text) => {
      if (/[\r\n]/.test(text)) {
        throw new Error("entry must be a single line");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
  {
    name: "exactly-one-sentence",
    check: (text) => {
      // One terminal period, at the very end, and no other terminator.
      const terminators = (text.match(/[.!?]/g) ?? []).length;
      if (terminators !== 1 || !text.endsWith(".")) {
        throw new Error("entry must be exactly one sentence ending with a period");
      }
    },
  },
  {
    name: "polite-threat-contrast",
    check: (text) => {
      // The joke works because the polite framing and the threat payoff
      // sit in the same line: "so politely" up front, "threatening"
      // at the end. Lose either half and the joke has no turn.
      if (!/so politely/i.test(text)) {
        throw new Error("entry must keep the polite framing ('so politely')");
      }
      if (!/threatening people nicely/i.test(text)) {
        throw new Error("entry must keep the threat payoff ('threatening people nicely')");
      }
      if (text.indexOf("politely") > text.indexOf("threatening")) {
        throw new Error("the polite framing must come before the threat payoff");
      }
    },
  },
  {
    name: "office-detail-present",
    check: (text) => {
      // The joke must turn on a real office detail, not a generic setup.
      if (!/per my last email/i.test(text)) {
        throw new Error("entry must name the real office detail it turns on");
      }
    },
  },
  {
    name: "punchline-lands-last",
    check: (text) => {
      // The laugh must sit in the final words, not up front.
      const tail = text.slice(-30);
      if (!/threatening people nicely\.$/.test(tail)) {
        throw new Error("punchline must land in the final words of the line");
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(" ").length;
  const quoteEnd = text.indexOf("' so");
  const setup = quoteEnd === -1 ? text : text.slice(0, quoteEnd + 1);
  const punchline = quoteEnd === -1 ? "" : text.slice(quoteEnd + 1).trim();
  const politeAt = text.indexOf("politely");
  const threatAt = text.indexOf("threatening");
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`setup (${setup.length} chars): ${setup}`);
  console.log(`punchline (${punchline.length} chars): ${punchline}`);
  console.log(`contrast: "politely" at char ${politeAt}, "threatening" at char ${threatAt} — ${threatAt - politeAt} chars apart`);
  console.log(text);
}

function main(): void {
  validate(JOKE);
  writeEntry(JOKE);
  verifyRoundTrip(JOKE);
  report(JOKE);
}

main();
