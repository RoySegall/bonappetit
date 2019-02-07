import "./../assets/scss/App.scss";
import * as React from "react";
import Header from "./Header";
import Home from "./Home/Home";
import SearchResults from "./SearchResults";
import {Router} from "@reach/router";
import Recipe from "./Recipe";


export default class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="app">
                    <Header />
                    <Router>
                        <Home path="/" />
                        <SearchResults path="search-results" />
                        <Recipe path="recipe/:id" />
                    </Router>
                </div>
            </div>
        );
    }
}
