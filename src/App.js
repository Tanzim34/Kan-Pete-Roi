import Home from "./pages/home/Home";
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom/cjs/react-router-dom.min';

import SignUpPage from "./pages/signup/signup";  // Assuming SignUpPage is imported

import LoginPage from "./pages/login/login";
import UserPage from "./pages/user_page/user_page";
import Sidebar from "./componants/drawer/dwarer";
import CreatePost from "./pages/create_post/create";
import Postview from "./pages/post_view/postview";
import View from "./componants/view/view";
import Other from "./pages/other_user/other";

function App() {
  //localStorage.setItem('genre','all')
  return (
    <Router>
    <div className="App">
      <div className='componat'>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/signup">
            <SignUpPage></SignUpPage>
          </Route>

          <Route path="/login">
              <LoginPage></LoginPage>
          </Route>

          <Route path="/Cu_user">
            <UserPage></UserPage>
          </Route>

          <Route path="/create_post">
            <CreatePost></CreatePost>
          </Route>

          <Route path="/posts">
            <Postview gener={"all"}></Postview>
          </Route>

          <Route path="/post/:id">
            <View></View>
          </Route>

          <Route path="/user/:id">
            <Other></Other>
          </Route>
 
        </Switch>
      </div>

    </div>
    </Router>
  );
}

export default App;
