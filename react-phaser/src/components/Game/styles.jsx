import styled from "styled-components";

export const Main = styled.div`
`;

export const ChatContainer = styled.div`
  width: 400px;
`;

export const ChatArea = styled.div`
  max-height: 660px;
  height: 660px;
  overflow-y: scroll;
`;

export const MessageList = styled.ul`
  list-style: none;
  word-wrap: break-word;
  font-size: 150%;
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
`;

export const CharacterStats = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  left: 0;
  top: 10%;
  width: 260px;
  margin: auto;
`;

export const AvatarPicture = styled.img`
  width: 150px;
  height: 150px;
  padding: 16px;
  margin: 0 auto;
  border: 3px solid #111;
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.2),
  2px 4px 3px 3px rgba(0, 0, 0, 0.2);
`;
export const UList = styled.ul`
  list-style-type: none;
`;

export const Stat = styled.li`
  padding: 8px;
  margin-top: 16px;
`;

export const Label = styled.span`
  font-weight: 600;
  font-size: 125%;
  text-shadow: 0px 2px 2px rgba(255, 255, 255, 0.4),
  2px 2px 2px rgba(255, 255, 255, 0.4);
`;

export const Logout = styled.button`
  padding: 8px;
  font-weight: 500;
  background-color: darkgrey;
  font-size: 150%;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.2),
    2px 4px 3px 3px rgba(0, 0, 0, 0.2);
`;
