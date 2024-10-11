import React from 'react';

import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined } from '@mui/icons-material';
import { IconButton, Paper, Stack, SxProps, Tooltip } from '@mui/material';

export const EDIT_SIBLINGS_CONTEXT = React.createContext<{
  onMoveUp?: () => void,
  onMoveDown?: () => void,
  onRemove: () => void,
}>({onRemove() {}});

const sx: SxProps = {
  position: 'absolute',
  top: 0,
  left: -56,
  borderRadius: 64,
  paddingX: 0.5,
  paddingY: 1,
  zIndex: 'fab',
};

export default function TuneMenu() {
  const {onMoveUp, onMoveDown, onRemove} = React.useContext(EDIT_SIBLINGS_CONTEXT);

  return (
    <Paper sx={sx} onClick={(event: React.MouseEvent) => event.stopPropagation()}>
      <Stack>
        {onMoveUp && <Tooltip title="Move up" placement="left-start">
          <IconButton onClick={() => onMoveUp()} sx={{color: 'text.primary'}}>
            <ArrowUpwardOutlined fontSize="small" />
          </IconButton>
        </Tooltip>}
        {onMoveDown && <Tooltip title="Move down" placement="left-start">
          <IconButton onClick={() => onMoveDown()} sx={{color: 'text.primary'}}>
            <ArrowDownwardOutlined fontSize="small" />
          </IconButton>
        </Tooltip>}
        <Tooltip title="Delete" placement="left-start">
          <IconButton onClick={() => onRemove()} sx={{color: 'text.primary'}}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
