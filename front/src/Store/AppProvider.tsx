import * as React from "react";
import AppContext from "./AppContext";

export default class AppProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            diet: null,
            setDiet: (e, diet) => {
                e.preventDefault();

                this.setState({diet});
            }
        };
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>

    }
}
