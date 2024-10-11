import React, { Fragment } from 'react';

import { TEditorBlock } from '../../../editor/core';
import EditorBlock from '../../../editor/EditorBlock';

import AddBlockButton from './AddBlockMenu';
import {setDocument, setSelectedBlockId} from "../../../editor/EditorContext";
import {EDIT_SIBLINGS_CONTEXT} from "../block-wrappers/TuneMenu";

function createBlock(block: TEditorBlock): string {
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

  const appendBlock = (block: TEditorBlock) => onChange([
    ...childrenIds, createBlock(block)
  ]);

  const insertBlock = (block: TEditorBlock, index: number) => onChange([
    ...childrenIds.slice(0, index),
    createBlock(block),
    ...childrenIds.slice(index)
  ]);

  if (childrenIds.length === 0)
    return <AddBlockButton placeholder onSelect={appendBlock} />;
  else
    return (
      <>
        {childrenIds.map((childId, index) => (
          <Fragment key={childId}>
            <AddBlockButton onSelect={(block) => insertBlock(block, index)} />
            <EDIT_SIBLINGS_CONTEXT.Provider value={{
              onMoveUp: index === 0 ? undefined : (() => {
                onChange([
                  ...childrenIds.slice(0, index - 1),
                  childrenIds[index],
                  childrenIds[index - 1],
                  ...childrenIds.slice(index + 1),
                ]);
                setSelectedBlockId(childId);
              }),
              onMoveDown: index === childrenIds.length - 1 ? undefined : (() => {
                onChange([
                  ...childrenIds.slice(0, index),
                  childrenIds[index + 1],
                  childrenIds[index],
                  ...childrenIds.slice(index + 2),
                ]);
                setSelectedBlockId(childId);
              }),
              onRemove: () => {
                onChange([
                  ...childrenIds.slice(0, index),
                  ...childrenIds.slice(index + 1),
                ]);
                setDocument({[childId]: undefined});
              },
            }}>
              <EditorBlock id={childId} />
            </EDIT_SIBLINGS_CONTEXT.Provider>
          </Fragment>
        ))}
        <AddBlockButton onSelect={appendBlock} />
      </>
    );
}
