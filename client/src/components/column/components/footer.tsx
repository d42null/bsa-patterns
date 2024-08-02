import { useContext } from 'react';
import { CreatorInput } from '../../primitives/creator-input';
import { FooterContainer } from '../styled/footer-container';
import { SocketContext } from '../../../context/socket';
import { CardEvent } from '../../../common/enums/enums';

type Props = {
  onCreateCard: (name: string) => void;
  listId: string;
};

const Footer = ({ onCreateCard ,listId}: Props) => {
  const socket = useContext(SocketContext);

  const handleCreateCard = (name: string) => {
    socket.emit(CardEvent.CREATE, { name, listId });
    onCreateCard(name);
  };
  return (
    <FooterContainer className="column-footer-container">
      <CreatorInput onSubmit={handleCreateCard} />
    </FooterContainer>
  );
};

export { Footer };
