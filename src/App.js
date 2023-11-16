import styled from 'styled-components';
import TodoList from './components/TodoList';
import Weather from './components/widgets/Weather';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

function App() {
  return (
    <StyledApp>
      <Weather />
      <TodoList />
    </StyledApp>
  );
}

export default App;
