import './App.css';
import Chat from './components/Chat/Chat';
import ChatWidget from "./components/ChatWidget";

const users = [123, 124, 125].map((id) => ({
  id,
  mainEmail: "user-" + id + "@mail.com",
  firstName: "user" + id,
  lastName: "user",
  avatarUrl: "",
}));

function App() {
  return (
    <ChatWidget currentUser={users[0]} users={users} />
  );
}

export default App;
