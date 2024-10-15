import React, {Fragment} from 'react';

import {EditorBlock, EditorBlockContext} from '../../../editor/core';

import AddBlockButton from './AddBlockMenu';
import {setDocument, setSelectedBlockId, useDocument, useSelectedBlockId} from "../../../editor/EditorContext";
import {Box, IconButton, Paper, Stack, Tooltip} from "@mui/material";
import {ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined} from "@mui/icons-material";
import {Block} from "../../../blocks";

function createBlock(block: Block): string {
  const blockId = `block-${Date.now()}`;
  setDocument({
    [blockId]: block,
  });
  setSelectedBlockId(blockId);
  return blockId;
}

export type EditorChildrenIdsProps = {
  childrenIds: string[] | null | undefined;
  onChange: (childrenIds: string[]) => void;
};
export default function EditorChildrenIds(props: EditorChildrenIdsProps) {
  const { onChange } = props;
  const childrenIds = props.childrenIds ?? [];

  const document = useDocument();
  const selectedBlock = useSelectedBlockId();

  const [hoveredBlock, setHoveredBlock] = React.useState<string>();

  const appendBlock = (block: Block) => onChange([
    ...childrenIds, createBlock(block)
  ]);

  const insertBlock = (block: Block, index: number) => onChange([
    ...childrenIds.slice(0, index),
    createBlock(block),
    ...childrenIds.slice(index)
  ]);

  const moveBlockUp = (index: number) => {
    onChange([
      ...childrenIds.slice(0, index - 1),
      childrenIds[index],
      childrenIds[index - 1],
      ...childrenIds.slice(index + 1),
    ]);
    setSelectedBlockId(childrenIds[index]);
  };
  
  const moveBlockDown = (index: number) => {
    onChange([
      ...childrenIds.slice(0, index),
      childrenIds[index + 1],
      childrenIds[index],
      ...childrenIds.slice(index + 2),
    ]);
    setSelectedBlockId(childrenIds[index]);
  };

  const removeBlock = (index: number) => {
    onChange([
        ...childrenIds.slice(0, index),
        ...childrenIds.slice(index + 1),
    ]);
    // TODO: find better solution
    // @ts-ignore
    setDocument({[childrenIds[index]]: undefined});
  };

  if (childrenIds.length === 0)
    return <AddBlockButton placeholder onSelect={appendBlock} />;
  else
    return (
      <>
        {childrenIds.map((childId, index) => (
          <Fragment key={childId}>
            <AddBlockButton onSelect={(block) => insertBlock(block, index)} />
            <EditorBlockContext.Provider value={childId}>
              {childId === selectedBlock &&
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: -56,
                    borderRadius: 64,
                    paddingX: 0.5,
                    paddingY: 1,
                    zIndex: 'fab',
                  }}
                  onClick={(event: React.MouseEvent) => event.stopPropagation()}
                >
                  <Stack>
                    {index !== 0 && <Tooltip title="Move up" placement="left-start">
                      <IconButton onClick={() => moveBlockUp(index)} sx={{color: 'text.primary'}}>
                        <ArrowUpwardOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>}
                    {index !== childrenIds.length - 1 && <Tooltip title="Move down" placement="left-start">
                      <IconButton onClick={() => moveBlockDown(index)} sx={{color: 'text.primary'}}>
                        <ArrowDownwardOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>}
                    <Tooltip title="Delete" placement="left-start">
                      <IconButton onClick={() => removeBlock(index)} sx={{color: 'text.primary'}}>
                        <DeleteOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              }
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '100%',
                  outlineOffset: '-1px',
                  outline: childId === selectedBlock ? '2px solid rgba(0,121,204, 1)' : childId === hoveredBlock ? '2px solid rgba(0,121,204, 0.3)' : undefined,
                }}
                onMouseEnter={(event: React.MouseEvent) => {
                  setHoveredBlock(childId);
                  event.stopPropagation();
                }}
                onMouseLeave={() => {
                  setHoveredBlock((hoveredBlock) => hoveredBlock === childId ? undefined : hoveredBlock);
                }}
                onClick={(event: React.MouseEvent) => {
                  setSelectedBlockId(childId);
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                <EditorBlock {...document[childId ?? console.warn(`Unknown block ${childId}`)]} />
              </Box>
            </EditorBlockContext.Provider>
          </Fragment>
        ))}
        <AddBlockButton onSelect={appendBlock} />
      </>
    );
}
