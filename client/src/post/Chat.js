import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { isAuthenticated } from '../auth';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('gx5a64bj4ptz');

var token;
var userID;
var userName;
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
    image: 'https://picsum.photos/'  },
  userToken,
);

if(localStorage.getItem('chatID') !== userID && localStorage.getItem('chatID') !== null){
  const conversation = chatClient.channel('messaging', {
    name: localStorage.getItem('chatName'),
    image: 'https://picsum.photos/',
    members: [localStorage.getItem('chatID'), userID],
  });
  
  conversation.create();
  const state = conversation.watch();
}

const filters = { type: 'messaging', members: { $in: [userID] } };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort, {
  watch: true,
  state: true,
});


const Appy = () => (
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
);

export default Appy; 