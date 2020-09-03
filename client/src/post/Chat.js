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
var setUser;
var setChannels;

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
(setUser = async () => {
  await chatClient.setUser(
    {
      id: userID,
      name: userName,
      image: 'https://picsum.photos/'},
    userToken,
  );
  return chatClient;
})

setUser(); 

if(localStorage.getItem('chatID') !== userID && localStorage.getItem('chatID') !== null){
  const conversation = chatClient.channel('messaging', {
    name: localStorage.getItem('chatName'),
    image: localStorage.getItem('chatPhoto'),
    members: [localStorage.getItem('chatID'), userID],
  });
  
  conversation.create();
  const state = conversation.watch();
}

// channel.on("message.new", event => {
//   logEvent(event);
// });

const filters = { type: 'messaging', members: { $in: [userID] } };
const sort = { last_message_at: -1 };
setChannels = async() => {
  const channels = await chatClient.queryChannels(filters, sort, {
    watch: true,
    state: true,
  });
  return channels;
}

setChannels();

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