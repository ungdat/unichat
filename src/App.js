import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./component/login";
import Chats from "./component/Chats";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
