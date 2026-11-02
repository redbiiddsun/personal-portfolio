---
name: code-principles-review
description: Review the Svelte 5 / SvelteKit code in this repo (a prerendered single-page portfolio) against Clean Code, DRY, KISS and SOLID, and report ranked, actionable findings per area (components, lib modules, routes, styles). Use this whenever the user asks for a code review, a quality pass, a refactor suggestion, or mentions clean code, DRY, KISS, SOLID, SRP, coupling, duplication, "is this well structured", or wants the codebase reviewed by an agent team. Also use it before merging a large change, even if the user only says "look over this".
---

# Code principles review

This repo is a personal portfolio: one prerendered SvelteKit page (`adapter-static`, `prerender = true`) built with Svelte 5 runes, Tailwind v4 and TypeScript. Imports use the `#lib/*` alias. It is animation-heavy (intro sequence, hero parallax collage, scroll reveals, rotating words) and bilingual (English/Thai).

Where things live:
- `src/routes/` — `+page.svelte` composes the sections and owns SEO head tags and JSON-LD; `+layout.ts` turns on prerendering; `robots.txt/` and `sitemap.xml/` are `+server.ts` endpoints.
- `src/lib/components/` — one Svelte component per section or widget (`Hero`, `Intro`, `Showcase`, `ProjectCard`, `Nav`, ...).
- `src/lib/types.ts` — every shared type, as string-union types and interfaces. No enums.
- `src/lib/data.ts` — all content and site constants (`OWNER`, `SITE_URL`, projects, hero shots, socials). `tech-icons.ts` holds the SVG icon data.
- `src/lib/i18n.svelte.ts` — the `en`/`th` dictionaries, the `locale` rune state, `t()`, `setLang`, `restoreLang`.
- `src/lib/actions.ts` — Svelte actions for DOM behaviour (`reveal`, `inView`).
- `src/lib/utils.ts` — small framework-free helpers (`wait`, `prefersReducedMotion`, `afterNextPaint`, safe `storage`, `onScrollFrame`).
- `src/lib/style.css` — Tailwind entry, theme tokens and shared keyframes.

Structure rules worth checking on every review:
- This is frontend code. Do not recommend backend layering (`models/`, `enums/`, `services/` folders, one type per file, repositories). Shared types stay in `types.ts`, unions beat enums, content stays in `data.ts`.
- Components render and wire behaviour; they do not own content. Copy goes through `t()`, project and site data come from `data.ts`. A hard-coded user-facing string or URL inside a component is a finding.
- Reusable DOM behaviour (observers, scroll/resize listeners, pointer tracking) belongs in a Svelte action or a `utils.ts` helper, not copied into each component's `onMount`.
- Shared reactive state lives in a `*.svelte.ts` module. Props flow down; `bind:` is used only where a parent genuinely needs a child's element or value (e.g. hero cards for the intro).
- Every dictionary key exists in both `en` and `th`. Only keys documented as trusted markup are rendered with `{@html}`.

The goal of a review is a short, ranked list of changes that make the code easier to change safely, not a tour of everything that could theoretically be different. A finding earns its place only if a reader can act on it.

## Procedure

1. **Check first.** Run `npm run check` and `npm run build` before reading anything. A review of code that does not type-check or prerender is a review of the wrong code, and the first finding should be the break.
2. **Scope.** Decide what is under review: the whole repo, one area, or a diff (`git diff`). For the whole repo, run one reviewer per area in parallel (components, `lib/` modules, routes + styles) and give each the list below plus the files it needs for context. Reviewers are read-only; the lead applies fixes afterwards.
3. **Read before judging.** Read every file in scope fully. Trace the page load end to end (`+page.svelte` -> `restoreLang` -> `Intro` animating the hero cards -> scroll reveals and parallax) so you know which code runs every frame.
4. **Apply the checklist** in the next section. For each hit, confirm it is real by pointing at the exact lines.
5. **Rank and cap.** Most important first. Cap at roughly 12 findings per area. Drop nits when there are substantive issues.
6. **Report** in the format at the end. Then, if asked to fix, apply the high and medium findings, rerun `npm run check` and `npm run build`, and look at the page with `npm run dev` (both languages, and with reduced motion on).

## What each principle means here

**Clean Code.** Names say what a thing is for, not how it is built (`isQueued`, `heroCardElements`, not `flag`, `arr`). No single-letter variables. Functions and components do one thing at one level of abstraction. No magic numbers or strings: durations, thresholds, offsets and breakpoints get a named constant, a Tailwind/CSS token, or a field in `data.ts`. Comments explain why, never what. Dead code, unused props and unused CSS go. Errors are handled where something can be done about them (e.g. clipboard or storage failures) and never swallowed without a reason.

**DRY.** One source of truth for each rule. Watch for decisions that will drift: the same IntersectionObserver or scroll listener in several components instead of `reveal`/`inView`/`onScrollFrame`; reduced-motion checks done differently in different places; the same easing, duration or colour repeated as literals instead of a token in `style.css`; site URL, email or owner name retyped instead of imported from `data.ts`; the same card or button markup copied between sections instead of a component. Duplicated three lines of markup is fine; duplicated decisions are not.

**KISS.** Prefer the plainest construct that meets the requirement: CSS over JS for animation and layout, a native element over a scripted one (`<a>`, `<button>`, `<details>`), `$derived` over an `$effect` that writes state, a plain function over a class, a prop over a context. Do not add stores, generics, config options or abstraction layers for a future that is not planned. But do not confuse simplicity with brevity: a rAF-coalesced scroll handler is simple because every line is there for a reason.

**SOLID** (applied to components and modules):
- *SRP*: a component has one reason to change. A section that renders, fetches/derives data, runs its own animation timeline and manages global state is a smell worth naming, even if the fix is deferred.
- *OCP*: adding a project, hero shot, social link or dev-art kind should mean adding data in `data.ts` (and a union member in `types.ts`), not editing a chain of `if`s in a component.
- *LSP*: every member of a discriminated union (`HeroShot`, `Banner`, ...) must be handled by every consumer; a branch that silently drops one variant is a finding.
- *ISP*: components take the props they use. Passing a whole object when the child reads one field, or a wide prop list that is mostly unused, is a finding.
- *DIP*: components depend on `data.ts`, `i18n`, `actions` and `utils`, never the reverse. `lib/` modules must not import components.

## Svelte 5 and frontend specifics

- Runes only: `$state`, `$derived`, `$props`, `$effect`. Legacy `export let`, `$:` and `on:` directives in new code are findings.
- `$effect` is for syncing with the outside world (DOM, timers, listeners). Deriving state inside an effect is a finding; use `$derived`.
- Every listener, observer, timer and rAF loop has a cleanup (action `destroy`, `onMount` return, `$effect` return). A leak is high severity.
- Code that touches `window`, `document`, `localStorage` or `matchMedia` must only run in the browser (`onMount`, actions, effects), because the page is prerendered.
- Animations respect `prefersReducedMotion()` and never hide content permanently if JS or the animation fails.
- Accessibility basics: interactive things are buttons or links, images have `alt`, decorative art is `aria-hidden`, focus is visible, the language switch updates `lang` on `<html>`.
- `{@html}` only with trusted, static input; the JSON-LD escape in `+page.svelte` must stay.

## Patterns worth checking first

Cheap to spot, and the usual sources of real findings in a page like this.

- **A copied observer.** An `IntersectionObserver` or scroll/resize listener written inline in a component when `reveal`, `inView` or `onScrollFrame` already does it.
- **Untranslated copy.** A literal English string in markup, or a key added to `en` but not `th`.
- **Content in components.** Project names, URLs, stats or the email address hard-coded in a component instead of `data.ts`.
- **Magic timing.** `setTimeout(…, 1200)`, `delay: 0.35`, `rotate(-6deg)` sprinkled through script and markup with no name, often duplicated between the JS timeline and the CSS.
- **Per-frame work that does not need to be per-frame.** Layout reads (`getBoundingClientRect`) inside a scroll handler for values that only change on resize, or reads and writes interleaved causing layout thrash.
- **An effect that writes state it reads**, or an effect standing in for `$derived`.
- **A union variant with no branch**, e.g. a new `DevArtKind` that `DevArt.svelte` renders as nothing.
- **Backend-style structure creeping in**: an `enums.ts`, a `services/` folder, a class wrapping two functions.

## Speed caveat

Animation code is exempt from "simplify" findings when the complexity buys smoothness: rAF coalescing, cached measurements, `will-change`, transform-only animations, `afterNextPaint` to commit a start state. If you think such code is not pulling its weight, say what you would measure (DevTools performance trace, dropped frames, layout shifts) rather than recommending removal outright.

## Finding format

For every finding:

```
N. [severity] file:line — Principle
   What is wrong (one sentence).
   Change: the concrete edit you recommend.
```

Severity: **high** = real maintainability, correctness, accessibility or leak risk, **medium** = worth doing this iteration, **low** = nit, mention only if the list is short.

End each area's review with two or three sentences on overall health: what is good, what the single most valuable change would be.

## Things that are not findings

- Style that `svelte-check`, TypeScript or Prettier already enforces.
- Tailwind class order or long class lists, unless the same list is repeated enough to deserve a component.
- Missing tests; this repo has none by design. Say "hard to verify because X" if the structure makes manual checking hard.
- Features the user has not asked for.
- Rewriting working code into a different pattern of equal merit.
