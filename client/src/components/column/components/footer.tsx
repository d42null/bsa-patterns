import { useContext } from 'react';
import { CreatorInput } from '../../primitives/creator-input';
import { FooterContainer } from '../styled/footer-container';
import { SocketContext } from '../../../context/socket';
type Props = {
  onCreateCard: (name: string) => void;
  listId: string;
};
const Footer = ({ onCreateCard }: Props) => {
  const socket = useContext(SocketContext);

  return (
    <FooterContainer className="column-footer-container">
      <CreatorInput onSubmit={onCreateCard} />
    </FooterContainer>
  );
};

export { Footer };
