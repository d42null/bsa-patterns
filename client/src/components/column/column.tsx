import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";

import { type Card } from "../../common/types/types";
import { CardsList } from "../card-list/card-list";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Title } from "../primitives/title";
import { Footer } from "./components/footer";
import { Container } from "./styled/container";
import { Header } from "./styled/header";
import { useContext } from "react";
import { SocketContext } from "../../context/socket";
import { CardEvent, ListEvent } from "../../common/enums/enums";

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
};

export const Column = ({ listId, listName, cards, index }: Props) => {
  const socket = useContext(SocketContext);
  return (
    <Draggable draggableId={listId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          className="column-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Header
            className="column-header"
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={(newName) => {
                socket.emit(ListEvent.RENAME, { listId, newName });
              }}
              fontSize="large"
              width={200}
              isBold
            />
            <Splitter />
            <DeleteButton
              color="#FFF0"
              onClick={() => {
                socket.emit(ListEvent.DELETE, listId);
              }}
            />
          </Header>
          <CardsList listId={listId} listType="CARD" cards={cards} />
          <Footer
            onCreateCard={(name) => {
              socket.emit(CardEvent.CREATE, listId, name);
            }}
            listId={listId}
          />
        </Container>
      )}
    </Draggable>
  );
};
