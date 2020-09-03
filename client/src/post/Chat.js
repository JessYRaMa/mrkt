import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { isAuthenticated } from '../auth';

import 'stream-chat-react/dist/css/index.css';


const chatClient = new StreamChat('gx5a64bj4ptz');
const userToken = chatClient.devToken(isAuthenticated().user._id);

chatClient.setUser(
  {
    id: isAuthenticated().user._id,
    name: isAuthenticated().user.name,
    image: 'https://picsum.photos/'  },
  userToken,
);

const conversation = chatClient.channel('messaging', {
  name: 'Founder Chat 2',
  image: 'https://picsum.photos/',
  members: ['Elon', isAuthenticated().user._id],
});
conversation.create();

const state = conversation.watch();

const filters = { type: 'messaging', members: { $in: [isAuthenticated().user._id] } };
const sort = { last_message_at: -1 };
const Channels = chatClient.queryChannels(filters, sort, {
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