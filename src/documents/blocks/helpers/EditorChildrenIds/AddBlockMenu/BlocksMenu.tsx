import React from 'react';

import { Box, Menu } from '@mui/material';

import BlockButton from './BlockButton';
import {Block, BLOCKS} from "../../../../blocks";

const BUTTONS: Array<{
  label: string;
  icon: React.ReactNode;
  block: () => Block;
}> = Object.entries(BLOCKS).flatMap(([type, declaration]) => {
  if (!declaration.creatable) return [];
  const {label, icon, block} = declaration.creatable;
  return [{
    label,
    icon,
    block: () => ({type, data: block()} as Block),
  }];
});

type BlocksMenuProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (v: HTMLElement | null) => void;
  onSelect: (block: Block) => void;
};
export default function BlocksMenu({ anchorEl, setAnchorEl, onSelect }: BlocksMenuProps) {
  const onClose = () => {
    setAnchorEl(null);
  };

  const onClick = (block: Block) => {
    onSelect(block);
    setAnchorEl(null);
  };

  if (anchorEl === null) {
    return null;
  }

  return (
    <Menu
      open
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box sx={{ p: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        {BUTTONS.map((k, i) => (
          <BlockButton key={i} label={k.label} icon={k.icon} onClick={() => onClick(k.block())} />
        ))}
      </Box>
    </Menu>
  );
}
