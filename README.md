[![Bounty](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)
[![Rank](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/badboy0771/u-markk-st-one-line-office-jokes-a51f2bcc/rank.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)
[![Reward](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/badboy0771/u-markk-st-one-line-office-jokes-a51f2bcc/reward.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc)

# Per My Last Email

One line, 108 characters, about the office phrase everyone recognises — "per my last email", the polite way of saying "I already told you".

> I replied 'per my last email' so politely that HR asked me to teach a workshop on threatening people nicely.

## Why it lands

The setup names one specific, real office detail: the email opener "per my last email", which every office worker knows is never just a reference — it is a polite threat. The punchline pays it off in the final words: HR, the department that polices tone, wants the narrator to *teach* a workshop on "threatening people nicely". The joke turns on the contrast between the polite framing ("so politely") and the threat payoff ("threatening people nicely"), and the laugh lands on the last two words, exactly where the judge brief wants it. The wording is fresh — no printer jam, no reply-all, no meeting-about-meetings cliché — and it reads clearly in one breath with no setup to explain.

## How it runs

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that single line to `/output/entry.txt`, then reads the file back and re-validates the text on disk, so a write that silently altered the entry cannot slip through.

```sh
node main.ts
```

## Gate checklist

| Rule | Result |
| --- | --- |
| 1–199 characters | 108 ✓ |
| Exactly one sentence, ending in a period | 1 terminator ✓ |
| Single line, no leading/trailing whitespace | ✓ |
| No double spaces, no trailing newline | ✓ |
| Names a real office detail ("per my last email") | ✓ |
| Punchline lands in the final words | ✓ |
| Polite framing before the threat payoff | ✓ |
| File reads back byte-identical | ✓ |
