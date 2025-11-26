import TextLintTester from "textlint-tester";
import rule from "../src";

const tester = new TextLintTester();

tester.run("textlint-rule-no-numbered-headings-and-bullets", rule, {
   valid: [
      // Headings without number prefixes
      "# Normal Heading",
      "## Another Heading",
      "### Third Level Heading",

      // Headings with numbers but not as prefixes
      "# Heading with number 123 inside",
      "## Version 2.0 Release Notes",

      // Lists without number prefixes
      `- List item
- Another item
- Third item`,

      `* List item
* Another item`,

      // Lists with numbers but not as prefixes
      `- Item with number 123 inside
- Item with version 2.0`,

      // Mixed content
      `# Heading

Some text

- List item 1
- List item 2`,

      // Setext headings without number prefixes
      `Normal Heading
=============`,

      `Another Heading
---------------`,

      // Headings with inline formatting (but no number prefix)
      "# **Bold** Heading",
      "# *Italic* Text",
   ],
   invalid: [
      // Headings with number prefixes
      {
         text: "# 1. First Heading",
         output: "# First Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.) in heading",
            },
         ],
      },
      {
         text: "## 2. Second Heading",
         output: "## Second Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (2.) in heading",
            },
         ],
      },
      {
         text: "### 3. Third Level Heading",
         output: "### Third Level Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (3.) in heading",
            },
         ],
      },

      // List items with number prefixes
      {
         text: "- 1. First item",
         output: "- First item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.) in list item",
            },
         ],
      },
      {
         text: "* 2. Second item",
         output: "* Second item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (2.) in list item",
            },
         ],
      },
      {
         text: "+ 3. Third item",
         output: "+ Third item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (3.) in list item",
            },
         ],
      },

      // Multiple violations
      {
         text: `# 1. First Heading

## 2. Second Heading

- 1. First item
- 2. Second item`,
         output: `# First Heading

## Second Heading

- First item
- Second item`,
         errors: [
            {
               message: "Found number prefix (1.) in heading",
            },
            {
               message: "Found number prefix (2.) in heading",
            },
            {
               message: "Found number prefix (1.) in list item",
            },
            {
               message: "Found number prefix (2.) in list item",
            },
         ],
      },

      // Large numbers
      {
         text: "# 100. Large Number Heading",
         output: "# Large Number Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (100.) in heading",
            },
         ],
      },
      {
         text: "- 999. Large Number Item",
         output: "- Large Number Item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (999.) in list item",
            },
         ],
      },

      // Indented/nested bullet lists with number prefixes
      {
         text: `- Item
  - 1. Nested item`,
         output: `- Item
  - Nested item`,
         errors: [
            {
               message: "Found number prefix (1.) in list item",
            },
         ],
      },
      {
         text: `* Top level
    * 2. Nested with spaces`,
         output: `* Top level
    * Nested with spaces`,
         errors: [
            {
               message: "Found number prefix (2.) in list item",
            },
         ],
      },

      // Headings with inline formatting and number prefixes
      {
         text: "# 1. **Bold** Heading",
         output: "# **Bold** Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.) in heading",
            },
         ],
      },
      {
         text: "## 2. *Italic* Heading",
         output: "## *Italic* Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (2.) in heading",
            },
         ],
      },

      // Hierarchical number prefixes (e.g., 1.1, 1.2., 1.4.1)
      {
         text: "### 1.1 Heading",
         output: "### Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.1) in heading",
            },
         ],
      },
      {
         text: "### 1.2. Heading",
         output: "### Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.2.) in heading",
            },
         ],
      },
      {
         text: "#### 1.4.1 Heading",
         output: "#### Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.4.1) in heading",
            },
         ],
      },
      {
         text: "#### 1.4.2. Heading",
         output: "#### Heading",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.4.2.) in heading",
            },
         ],
      },

      // Hierarchical number prefixes in list items
      {
         text: "- 1.1 Item",
         output: "- Item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (1.1) in list item",
            },
         ],
      },
      {
         text: "* 2.3.4. Item",
         output: "* Item",
         errors: [
            {
               index: 0,
               message: "Found number prefix (2.3.4.) in list item",
            },
         ],
      },
   ],
});
