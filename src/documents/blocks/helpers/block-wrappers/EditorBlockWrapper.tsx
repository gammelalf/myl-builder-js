import React, { useState } from 'react';

import { Box } from '@mui/material';

import { setSelectedBlockId, useSelectedBlockId } from '../../../editor/EditorContext';

import TuneMenu from './TuneMenu';
import {useCurrentBlockId} from "../../../editor/core";

type TEditorBlockWrapperProps = {
  children: JSX.Element;
};

export default function EditorBlockWrapper({ children }: TEditorBlockWrapperProps) {
  const selectedBlockId = useSelectedBlockId();
  const [mouseInside, setMouseInside] = useState(false);
  const blockId = useCurrentBlockId();

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '100%',
        outlineOffset: '-1px',
        outline: selectedBlockId === blockId ? '2px solid rgba(0,121,204, 1)' : mouseInside ? '2px solid rgba(0,121,204, 0.3)' : undefined,
      }}
      onMouseEnter={(event: React.MouseEvent) => {
        setMouseInside(true);
        event.stopPropagation();
      }}
      onMouseLeave={() => {
        setMouseInside(false);
      }}
      onClick={(event: React.MouseEvent) => {
        setSelectedBlockId(blockId);
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {selectedBlockId !== blockId ? null : <TuneMenu />}
      {children}
    </Box>
  );
}
