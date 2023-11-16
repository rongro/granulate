import styled, { css } from 'styled-components';

const ListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Title = styled.span`
    font-size: 16px;
    width: 100%;

    ${({ $complete }) => $complete &&
        css`
            color: grey;
            text-decoration: line-through;
        `
    };  
`;

const Button = styled.button`
    height: 22px;
`;

export default function TodoListItem({ id, title, complete, handleDelete, handleComplete }) {
    return (
        <ListItem>
            <input type="checkbox" checked={complete} onChange={() => handleComplete(id)} />
            <Title $complete={complete}>{title}</Title>
            <Button onClick={() => {
                if (window.confirm('Are you sure that you want to delete it?')) {
                    handleDelete(id);
                }
                }}>Delete</Button>
        </ListItem>
    );
  }

