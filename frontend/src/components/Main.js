import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import Home from "./Home";
import { connect } from "react-redux";
import Checkout from "./Checkout/Checkout";
import ShopProducts from "./product/ShopProducts";
import UserShops from "./shop/UserShops";

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, nextState) {}

  componentDidMount() {}

  render() {
    return (
      <div className="BackgroundHome">
        <Router>
          <Switch>
            <Route path="/sign-in" exact component={() => <SignIn />} />

            <Route
              path="/create-account"
              exact
              component={() => <CreateAccount />}
            />

            <Route path="/checkout" component={() => <Checkout />} />

            <Route path="/home" exact component={() => <Home />} />

            <Route path="/my-shops" component={() => <UserShops />} />

            <Route path="/shop/:shopID" component={ShopProducts} />

            <Route render={() => <Redirect to="/home" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(Main);
