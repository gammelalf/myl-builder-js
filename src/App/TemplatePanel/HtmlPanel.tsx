import React, { useMemo } from 'react';

import { useDocument } from '../../documents/editor';

import HighlightedCodePanel from './helper/HighlightedCodePanel';
import ReactDOM from "react-dom/server";
import ReaderBlock from "../../documents/reader";

export default function HtmlPanel() {
  const document = useDocument();
  const code = useMemo(() => ReactDOM.renderToStaticMarkup(<ReaderBlock {...document.root} />), [document]);
  return <HighlightedCodePanel type="html" value={code} />;
}
