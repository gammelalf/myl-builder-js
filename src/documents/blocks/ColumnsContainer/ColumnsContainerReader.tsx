import React from 'react';

import { ColumnsContainer } from '@usewaypoint/block-columns-container';

import { ColumnsContainerProps } from './ColumnsContainerPropsSchema';
import ReaderBlock from "../../reader";
import {useDocument} from "../../editor";

export default function ColumnsContainerReader({ style, props }: ColumnsContainerProps) {
    const { columns, ...restProps } = props ?? {};

    const document = useDocument();

    return <ColumnsContainer
        props={restProps}
        style={style}
        columns={columns && columns.map(
            (column) => column.childrenIds.map(
                (childId) => <ReaderBlock key={childId} {...document[childId ?? console.warn(`Unknown block ${childId}`)]} />
            )
        )}
    />;
}