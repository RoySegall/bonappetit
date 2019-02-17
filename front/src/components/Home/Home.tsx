import * as React from "react";
import {RouteComponentProps} from "@reach/router";
import Info from "./Info";
import SearchForm from "./SearchForm";

export default class Home extends React.Component<RouteComponentProps, any, any> {

    render() {
        return (
            <div className="HomeComponent">
                <Info/>
                <SearchForm />
            </div>
        );
    }
}
