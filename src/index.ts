import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";

const HEADER_PATTERN = /^(#{1,6}\s+)(\d+(?:\.\d+)*\.?)\s+/;
const LIST_ITEM_PATTERN = /^(\s*[-*+]\s+)(\d+(?:\.\d+)*\.?)\s+/;

type Options = {
   header?: boolean;
   bullet?: boolean;
};

const reporter: TextlintRuleReporter<Options> = (
   { Syntax, RuleError, fixer, report, getSource },
   { header = true, bullet = true } = {}
) => {
   return {
      [Syntax.Header](node) {
         if (!header) {
            return;
         }

         const text = getSource(node);
         const match = text.match(HEADER_PATTERN);

         if (match) {
            const [fullMatch, prefix, number] = match;
            report(
               node,
               new RuleError(`Found number prefix (${number}) in heading`, {
                  index: 0,
                  fix: fixer.replaceText(node, text.replace(fullMatch, prefix)),
               })
            );
         }
      },
      [Syntax.ListItem](node) {
         if (!bullet) {
            return;
         }

         const text = getSource(node);
         const match = text.match(LIST_ITEM_PATTERN);

         if (match) {
            const [fullMatch, prefix, number] = match;
            report(
               node,
               new RuleError(`Found number prefix (${number}) in list item`, {
                  index: 0,
                  fix: fixer.replaceText(node, text.replace(fullMatch, prefix)),
               })
            );
         }
      },
   };
};

export default {
   linter: reporter,
   fixer: reporter,
} as TextlintRuleModule<Options>;
