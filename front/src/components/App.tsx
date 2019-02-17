import "./../assets/scss/App.scss";
import * as React from "react";
import Header from "./Header";
import Home from "./Home/Home";
import SearchResults from "./SearchResults";
import {Router} from "@reach/router";
import Recipe from "./Recipe";
import AppProvider from "../Store/AppProvider";
import AppContext from "../Store/AppContext";

export default class App extends React.Component {

    render() {
        return (
            <AppProvider>
                <div className="container-fluid">
                    <div className="app">
                        <Header />
                        <AppContext.Consumer>
                            {(context: any) => (
                                <Router>
                                    <Home path="/" />
                                    <SearchResults path="search-results" context={context} />
                                    <Recipe path="recipe/:id" />
                                </Router>
                            )}
                        </AppContext.Consumer>
                    </div>
                </div>
            </AppProvider>
        );
    }
}
