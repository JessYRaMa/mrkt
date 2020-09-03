import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { isAuthenticated } from '../auth';
// import DefaultProfile from '../images/circlewhitebgMRKT.4.png'

import 'stream-chat-react/dist/css/index.css';

const Appy = () => {

const chatClient = new StreamChat('gx5a64bj4ptz');

var token;
var userID;
var userName;

let chatID = localStorage.getItem('chatID');
let chatName = localStorage.getItem('chatName');
let chatPic = localStorage.getItem('chatPhoto');

try {
  token = chatClient.devToken(isAuthenticated().user._id);
  userID = isAuthenticated().user._id;
  userName = isAuthenticated().user.name;
} catch (error) {
  token = chatClient.devToken('john');
  userID = 'john';
  userName = 'john';
}
const userToken = token;

  chatClient.setUser(
    {
      id: userID,
      name: userName,
      image: 'https://picsum.photos/'},
    userToken,
  );

const createConversation = () => {
  const conversation = chatClient.channel('messaging', {
    name: chatName,
    image: chatPic,
    members: [chatID, userID],
  });
  
  conversation.create();
  const state = conversation.watch();
}
if(chatID !== userID && chatID !== null){
  createConversation();
}
// channel.on("message.new", event => {
//   logEvent(event);
// });

const filters = { type: 'messaging', members: { $in: [userID] } };
const sort = { last_message_at: -1 };
  const channels = chatClient.queryChannels(filters, sort, {
    watch: true,
    state: true,
  });

  return(
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      filters={filters}
      sort={sort}
    />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
  )
};

export default Appy; 