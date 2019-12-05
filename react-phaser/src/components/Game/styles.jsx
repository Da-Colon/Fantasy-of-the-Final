import styled from 'styled-components'

export const GameContainer = styled.div`
`

export const Main = styled.div`
  width: 100%;
`

export const ChatContainer = styled.div`
  width: 400px;
`

export const ChatArea = styled.div`
  max-height: 660px;
  height: 660px;
  overflow-y: scroll;
`

export const MessageList = styled.ul`
  list-style: none;
  word-wrap: break-word;
  font-size: 150%;
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
`

export const CharacterStats = styled.div`
  position: relative;
  z-index: 2;
  width: 250px;
  height: 100px;
  background-color: rgba(0,0,0,0.2)
`

