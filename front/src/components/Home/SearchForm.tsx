import * as React from "react";

export default class SearchForm extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {};
    }

    handleProductSelection = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <form>
                <h3>Search recipes</h3>

                <hr />

                <div className="products-wrapper">

                    <label htmlFor="products">Select the products you currently have:</label>

                    <div className="products" id="products">

                        {this.props.products.map((product, key) => {
                            return <button key={key} id={product.id} onClick={this.handleProductSelection}>{product.name}</button>
                        })}
                    </div>
                </div>
            </form>
        )
    }
}
