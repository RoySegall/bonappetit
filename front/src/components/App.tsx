import "./../assets/scss/App.scss";
import * as React from "react";
import Header from "./Header";
import Home from "./Home/Home";
import SearchResults from "./SearchResults";
import {Router} from "@reach/router";
import Recipe from "./Recipe";
import AppProvider from "../Store/AppProvider";
import Http from "../Http";

export default class App extends React.Component {

    componentDidMount(): void {

        const http = new Http();
        http.request('get', 'products').then((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <AppProvider>
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
            </AppProvider>
        );
    }
}
