import type { DraggableProvided } from '@hello-pangea/dnd';

import { type Card } from '../../common/types/types';
import { CopyButton } from '../primitives/copy-button';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Text } from '../primitives/text';
import { Title } from '../primitives/title';
import { Container } from './styled/container';
import { Content } from './styled/content';
import { Footer } from './styled/footer';
import { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { CardEvent } from '../../common/enums/enums';

type Props = {
  card: Card;
  isDragging: boolean;
  provided: DraggableProvided;
};

export const CardItem = ({ card, isDragging, provided }: Props) => {
  const socket = useContext(SocketContext);
  return (
    <Container
      className="card-container"
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          onChange={(newText) => {
            socket.emit(CardEvent.RENAME, { cardId: card.id, newText });
          }}
          title={card.name}
          fontSize="large"
          isBold
        />
        <Text
          text={card.description}
          onChange={(newText) => {
            socket.emit(CardEvent.CHANGE_DESCRIPTION, {
              cardId: card.id,
              newText,
              isDescription: true,
            });
          }}
        />
        <Footer>
          <DeleteButton
            onClick={() => {
              socket.emit(CardEvent.DELETE, card.id);
            }}
          />
          <Splitter />
          <CopyButton
            onClick={() => {
              socket.emit(CardEvent.DUPLICATE, card.id);
            }}
          />
        </Footer>
      </Content>
    </Container>
  );
};
