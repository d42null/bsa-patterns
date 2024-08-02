import { useContext } from 'react';
import { ColumnCreatorInput } from './components/column-creator-input';
import { Container } from './styled/container';
import { SocketContext } from '../../context/socket';
import { ListEvent } from '../../common/enums/enums';

type Props = {
  onCreateList: (name: string) => void;
};

export const ColumnCreator = ({ onCreateList }: Props) => {
  const socket = useContext(SocketContext);

  const handleCreateList = (name: string) => {
    socket.emit(ListEvent.CREATE, name );
    onCreateList(name);
  };
  return (
    <Container>
      <ColumnCreatorInput onCreateList={handleCreateList} />
    </Container>
  );
};
