import * as React from "react";
import {RouteComponentProps} from '@reach/router';
import Info from "./Info";
import SearchForm from "./SearchForm";

export default class Home extends React.Component<RouteComponentProps, any, any> {

    constructor(props) {
        super(props);

        this.state = {
            products: [
                {"_id": "5c4a0e6188c73a4dba66060e", "name": "Egg"},
                {"_id": "5c4a0e6188c73a4dba66060f", "name": "Butter"},
                {"_id": "5c4a0e6188c73a4dba660610", "name": "Oil"},
                {"_id": "5c4a0e6188c73a4dba660611", "name": "Lemon"},
                {"_id": "5c4a0e6188c73a4dba660612", "name": "Cucumber"},
                {"_id": "5c4a0e6188c73a4dba660613", "name": "Zukini"},
                {"_id": "5c4a0e6188c73a4dba660614", "name": "Red Pepper"},
                {"_id": "5c4a0e6188c73a4dba660615", "name": "Yellow pepper"},
                {"_id": "5c4a0e6188c73a4dba660616", "name": "Green pepper"},
                {"_id": "5c4a0e6188c73a4dba660617", "name": "Jalapenio"},
                {"_id": "5c4a0e6188c73a4dba660618", "name": "Lettuce"},
                {"_id": "5c4a0e6188c73a4dba660619", "name": "Mirin"},
                {"_id": "5c4a0e6188c73a4dba66061a", "name": "Rice"},
            ],
            recipes: 30,
        };
    }

    render() {
        return (
            <div>
                <Info products={this.state.products} recipes={this.state.recipes} />
                <SearchForm products={this.state.products} recipes={this.state.recipes} />
            </div>
        )
    }
}
