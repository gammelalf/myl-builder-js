import React from 'react';

import { Container as BaseContainer } from '@usewaypoint/block-container';

import { setDocument, useDocument, useCurrentBlockId } from '../../editor';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import { ContainerProps } from './ContainerPropsSchema';

export default function ContainerEditor({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];

  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  return (
    <BaseContainer style={style}>
      <EditorChildrenIds
        childrenIds={childrenIds}
        onChange={(childrenIds) => {
          setDocument({
            [currentBlockId]: {
              type: 'Container',
              data: {
                ...document[currentBlockId].data,
                props: { childrenIds: childrenIds },
              },
            },
          });
        }}
      />
    </BaseContainer>
  );
}
