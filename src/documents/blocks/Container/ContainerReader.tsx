import React from 'react';

import { Container } from '@usewaypoint/block-container';

import { ContainerProps } from './ContainerPropsSchema';
import ReaderBlock from "../../reader";
import {useDocument} from "../../editor";

export default function ContainerReader({ style, props }: ContainerProps) {
    const childrenIds = props?.childrenIds ?? [];

    const document = useDocument();

    return (
        <Container style={style}>
            {childrenIds.map((childId) => (
                <ReaderBlock key={childId} {...document[childId ?? console.warn(`Unknown block ${childId}`)]} />
            ))}
        </Container>
    );
}