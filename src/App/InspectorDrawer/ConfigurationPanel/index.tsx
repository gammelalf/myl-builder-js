import React from 'react';

import { Box, Typography } from '@mui/material';

import { setDocument, useDocument, useSelectedBlockId } from '../../../documents/editor';

import {BLOCKS} from "../../../documents/blocks";

function renderMessage(val: string) {
  return (
    <Box sx={{ m: 3, p: 1, border: '1px dashed', borderColor: 'divider' }}>
      <Typography color="text.secondary">{val}</Typography>
    </Box>
  );
}

export default function ConfigurationPanel() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();

  if (!selectedBlockId) {
    return renderMessage('Click on a block to inspect.');
  }
  const block = document[selectedBlockId];
  if (!block) {
    return renderMessage(`Block with id ${selectedBlockId} was not found. Click on a block to reset.`);
  }

  const Inspector = BLOCKS[block.type].Inspector;
  // @ts-ignore
  return <Inspector data={block.data} setData={(newData) => setDocument({ [selectedBlockId]: {...block, data: newData} })} />;
}
