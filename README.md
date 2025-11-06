# textlint-rule-no-numbered-headings-and-bullets

[textlint](https://textlint.github.io/) rule which detects and reports numbered headings and bullet list items in your markdown document.

This rule prevents the use of numbered prefixes (like `1.`, `2.`, etc.) in:

- ATX-style markdown headings (e.g., `# 1. First Heading`)
- Bullet list items, including nested/indented lists (e.g., `- 1. First item`)
- Headings with inline formatting (e.g., `# 1. **Bold** Heading`)

**Note:** Only ATX-style headings (`# Heading`) are supported. Setext-style headings with underlines (`Heading\n=====`) cannot be detected.

## Install

Install with [pnpm](https://pnpm.io/):

```sh
pnpm add @0x6b/textlint-rule-no-numbered-headings-and-bullets
```

Or with npm:

```sh
npm install @0x6b/textlint-rule-no-numbered-headings-and-bullets
```

This module requires Node.js >= 20.0.0.

## Usage

Via `.textlintrc`(recommended):

```json
{
  "rules": {
    "@0x6b/no-numbered-headings-and-bullets": true
  }
}
```

Via CLI:

```
textlint --rule @0x6b/no-numbered-headings-and-bullets README.md
```

### Build

Builds source codes for publish to the `lib/` folder.

```sh
pnpm install && pnpm run build
```

### Test

Run test code in `test` folder by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

```sh
pnpm test
```

## References

- [Creating textlint rules](https://textlint.github.io/docs/rule.html)
- [Markdown AST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md)

## License

MIT © 0x6b
