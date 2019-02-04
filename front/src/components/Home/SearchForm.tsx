import * as React from "react";

export default class SearchForm extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            selected: {}
        };
    }

    handleProductSelection = (event, id) => {
        event.preventDefault();

        let selected = this.state.selected;

        selected[id] = true;

        this.setState({selected});
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
                            return <button key={key} id={product.id} onClick={(e) => this.handleProductSelection(e, product._id)}>{product.name}</button>
                        })}
                    </div>
                </div>
            </form>
        )
    }
}
