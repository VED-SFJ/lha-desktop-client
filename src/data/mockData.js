// src/data/mockData.js

export const CURRENT_USER = {
  name: 'Ocirej',
  handle: 'titi',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  xp: 12309,
  rank: { name: 'Divine Monarch', color: '#00f3fc' },
  bio: "Just a comic enthusiast exploring new worlds.",
  stats: [
    { label: 'Read', value: '2K' },
    { label: 'Rank', value: '#1' },
    { label: 'Guild', value: 'Apex' }
  ],
  badges: [
    { id: 'b1', icon: 'pencil', name: 'The Designer', rarity: 'Primeval' },
    { id: 'b2', icon: 'book', name: 'First Read', rarity: 'Common' },
    { id: 'b3', icon: 'moon', name: 'Night Owl', rarity: 'Rare' }
  ]
};

export const GUILDS = [
  { id: '1', name: 'Syntax City', members: '45.2k', icon: 'code', color: '#6366F1', desc: 'A hub for frontend & backend wizards.' },
  { id: '2', name: 'Canvas Realm', members: '12.5k', icon: 'palette', color: '#EC4899', desc: 'Digital painters and designers.' },
  { id: '3', name: 'Respawn Point', members: '89.1k', icon: 'gamepad', color: '#10B981', desc: 'Discuss everything gaming.' }
];

export const MARKET_ITEMS = [
  { id: 'm1', title: 'Legendary Sword Replica', price: '1,500 Gold', image: 'https://images.unsplash.com/photo-1589252084795-356c8db2778e?auto=format&fit=crop&w=400&q=80', seller: 'KnightWalker' },
  { id: 'm2', title: 'Code Review Session', price: '300 Credits', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80', seller: 'DevGuru' },
  { id: 'm3', title: 'Digital Art Pack', price: '50 Gems', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', seller: 'Artsy' },
  { id: 'm4', title: 'Gaming Headset', price: '200 Gold', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80', seller: 'ProGamer' },
];

export const EVENTS = [
  { id: 'e1', title: 'CyberFest 2024', date: 'DEC 12', location: 'Neon District', image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=800' },
  { id: 'e2', title: 'Indie Game Jam', date: 'DEC 18', location: 'Tech Hub A', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800' }
];

export const COMICS = [
  { id: '1', title: 'Cybernetic Dawn', cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800', progress: 0.75, lastChapter: '15', status: 'Ongoing' },
  { id: '2', title: 'Solo Leveling', cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800', progress: 0.1, lastChapter: '1', status: 'Ongoing' },
  { id: '3', title: 'The Quantum Mage', cover: 'https://images.unsplash.com/photo-1614726365206-897379203a5e?w=800', progress: 0, lastChapter: null, status: 'Completed' }
];

export const CHATS = [
  { id: '1', name: 'Syntax City', type: 'guild', lastMessage: 'CodeNinja: Anyone up for the hackathon?', time: '2m', unread: 2 },
  { id: '2', name: 'Jessica Parker', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=jess', lastMessage: 'Sent an attachment', time: '1h', unread: 0 },
];