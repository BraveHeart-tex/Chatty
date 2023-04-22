const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    ],
    _id: '617a077e18c25468bc7c4dd4',
    chatName: 'John and Jane',
  },
  {
    isGroupChat: false,
    users: [
      {
        name: 'Guest User',
        email: 'guest@example.com',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
    ],
    _id: '617a077e18c25468b27c4dd4',
    chatName: 'John and Guest User',
  },
  {
    isGroupChat: false,
    users: [
      {
        name: 'Anthony Johnson',
        email: 'anthony@example.com',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
    ],
    _id: '617a077e18c2d468bc7c4dd4',
    chatName: 'John and Anthony',
  },
  {
    isGroupChat: true,
    users: [
      {
        name: 'John Doe',
        email: 'jon@example.com',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      {
        name: 'Guest User',
        email: 'guest@example.com',
      },
    ],
    _id: '617a518c4081150716472c78',
    chatName: 'Friends Group Chat',
    groupAdmin: {
      name: 'Guest User',
      email: 'guest@example.com',
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
    ],
    _id: '617a077e18c25468bc7cfdd4',
    chatName: 'John and Jane Doe',
  },
  {
    isGroupChat: true,
    users: [
      {
        name: 'John Doe',
        email: 'jon@example.com',
      },
      {
        name: 'Guest User',
        email: 'guest@example.com',
      },
      {
        name: 'Mary Smith',
        email: 'mary@example.com',
      },
    ],
    _id: '617a518c4081150016472c78',
    chatName: 'Chill Zone Group Chat',
    groupAdmin: {
      name: 'Guest User',
      email: 'guest@example.com',
    },
  },
];

module.exports = { chats };
