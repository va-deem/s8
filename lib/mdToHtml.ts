import { Marked } from '@ts-stack/markdown';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

Marked.setOptions({
  highlight: function (code) {
    return hljs.highlight(code, { language: 'javascript' }).value;
  },
});

const convertToHtml = (mdString: string): string => {
  return Marked.parse(mdString);
};

export default convertToHtml;
