import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
// import { isAuthenticated } from '../auth';

import 'stream-chat-react/dist/css/index.css';


const chatClient = new StreamChat('gx5a64bj4ptz');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZnJhZ3JhbnQtZHJlYW0tOCJ9.rJtnznKXjIOOaVAyFsMVZAVe3XRbUtbI3cRUOizMygc';

chatClient.setUser(
  {
    id: 'fragrant-dream-8',
    name: 'Fragrant dream',
    image: 'https://getstream.io/random_png/?id=fragrant-dream-8&name=Fragrant+dream'  },
  userToken,
);

const filters = { type: 'messaging', members: { $in: ['fragrant-dream-8'] } };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

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