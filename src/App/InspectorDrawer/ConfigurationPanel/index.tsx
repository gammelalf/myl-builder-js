import React from 'react';

import { Box, Typography } from '@mui/material';

import { setDocument, useDocument, useSelectedBlockId } from '../../../documents/editor/EditorContext';

import AvatarSidebarPanel from './input-panels/AvatarSidebarPanel';
import ButtonSidebarPanel from './input-panels/ButtonSidebarPanel';
import ColumnsContainerSidebarPanel from './input-panels/ColumnsContainerSidebarPanel';
import ContainerSidebarPanel from './input-panels/ContainerSidebarPanel';
import DividerSidebarPanel from './input-panels/DividerSidebarPanel';
import EmailLayoutSidebarPanel from './input-panels/EmailLayoutSidebarPanel';
import HeadingSidebarPanel from './input-panels/HeadingSidebarPanel';
import HtmlSidebarPanel from './input-panels/HtmlSidebarPanel';
import ImageSidebarPanel from './input-panels/ImageSidebarPanel';
import SpacerSidebarPanel from './input-panels/SpacerSidebarPanel';
import TextSidebarPanel from './input-panels/TextSidebarPanel';
import {Block} from "../../../documents/blocks";

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

  const setBlock = (conf: Block) => setDocument({ [selectedBlockId]: conf });
  switch (block.type) {
    case 'Avatar':
      return <AvatarSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Button':
      return <ButtonSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'ColumnsContainer':
      return (
        <ColumnsContainerSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />
      );
    case 'Container':
      return <ContainerSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Divider':
      return <DividerSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Heading':
      return <HeadingSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Html':
      return <HtmlSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Image':
      return <ImageSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'EmailLayout':
      return <EmailLayoutSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Spacer':
      return <SpacerSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    case 'Text':
      return <TextSidebarPanel key={selectedBlockId} data={block.data} setData={(data) => setBlock(block)} />;
    default:
      return <pre>{JSON.stringify(block, null, '  ')}</pre>;
  }
}
