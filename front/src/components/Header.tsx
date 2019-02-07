import * as React from "react";
import {Link} from "@reach/router";

export default class Header extends React.Component {
    render() {
        return (
            <header className="navbar" id="mainNav">
                <Link to="/">Bonapetit</Link>
            </header>
        );
    }
}
