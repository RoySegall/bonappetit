import "./../assets/scss/App.scss";
import * as React from "react";
import Header from "./Header";
import Home from "./Home/Home";
import { Router } from "@reach/router"

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Router>
                    <Home path="/" />
                </Router>
            </div>
        );
    }
}
