/* eslint-disable react/react-in-jsx-scope */
import { CreatorInput } from '../../primitives/creator-input';
import { FooterContainer } from '../styled/footer-container';
type Props = {
  onCreateCard: (name: string) => void;
  listId: string;
};
const Footer = ({ onCreateCard }: Props) => {
  return (
    <FooterContainer className="column-footer-container">
      <CreatorInput onSubmit={onCreateCard} />
    </FooterContainer>
  );
};

export { Footer };
