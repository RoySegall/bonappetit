import * as React from "react";
import AppContext from "./AppContext";

export default class AppProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            diet: null,
            setDiet: (diet) => {
                this.setState({diet});
            },

            products: [],
            setProducts: (products: []) => {
                this.setState({products});
            },

            strategy: 'exact',
            setStrategy: (strategy: string) => {
                this.setState({strategy});
            },
        };
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>

    }
}
