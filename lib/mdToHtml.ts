import { Marked } from '@ts-stack/markdown';

const convertToHtml = (mdString: string): string => Marked.parse(mdString);

export default convertToHtml;
