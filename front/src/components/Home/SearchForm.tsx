import * as React from "react";

export default class SearchForm extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            diets: [
                {
                    key: 'vegan',
                    name: 'Vegan',
                    icon: 'fas fa-seedling',
                },
                {
                    key: 'vegetarian',
                    name: 'Vegetarian',
                    icon: 'fas fa-cheese',
                },
                {
                    key: 'carnivore',
                    name: 'Carnivore',
                    icon: 'fas fa-drumstick-bite',
                },
            ],
            diet: '',
            formError: ''
        };
    }

    handleProductSelection = (event, id) => {
        event.preventDefault();

        let selected = this.state.selected;

        if (selected[id] !== null) {
            selected[id] = !selected[id];
        } else {
            selected[id] = true;
        }

        this.setState({selected});
    };

    getClassForButton = (id) => {
        if (this.state.selected[id] === null) {
            return false;
        }

        return this.state.selected[id];
    };

    handleDietSelection = (event, diet) => {
        event.preventDefault();

        if (this.state.diet === diet) {
            diet = null;
        }

        this.setState({diet})
    };

    resetForm = (event) => {
        event.preventDefault();

        this.setState({
            selected: {},
            diet: '',
            formError: '',
        });
    };

    submitForm = (event) => {
        event.preventDefault();

        this.setState({formError: ''});

        for (let selected in this.state.selected) {
            if (this.state.selected[selected]) {
                return;
            }
        }

        this.setState({formError: 'Please select some products'});
    };

    render() {
        return (
            <div>
                <form className="row">
                    <div className="col-md-10 mx-auto text-center">
                        <h3>Search recipes</h3>

                        <hr/>

                        <div className="diets-wrapper">

                            <label htmlFor="diets">Please select your diet type:</label>

                            <div className="diets" id="diets">
                                {this.state.diets.map((item, key) => {
                                    let className = `btn ${item.key}`;

                                    if (this.state.diet !== '') {
                                        if (this.state.diet === item.key) {
                                            className += ' selected';
                                        }
                                    }

                                    return (
                                        <button
                                            key={key}
                                            onClick={(e) => this.handleDietSelection(e, item.key)}
                                            className={className}
                                        >
                                                <i className={item.icon}></i> {item.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="products-wrapper">

                            <label htmlFor="products">Select the products you currently have:</label>

                            <div className="products" id="products">

                                {this.props.products.map((product, key) => {
                                    return (
                                        <button
                                            key={key}
                                            id={product.id}
                                            onClick={(e) => this.handleProductSelection(e, product._id)}
                                            className={(this.getClassForButton(product._id) ? 'selected' : '') + " btn btn-light"}
                                        >
                                            {this.getClassForButton(product._id) ? (
                                                <i className="fas fa-check"></i>) : ''}
                                            {product.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="actions">

                            {
                                this.state.formError !== '' ? <div className="alert alert-danger">{this.state.formError}</div> : ''
                            }

                            <button
                                type="submit"
                                className={"btn btn-danger reset-button"}
                                onClick={this.resetForm}
                            >
                                <i className="fas fa-power-off"></i> Reset
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.submitForm}
                            >
                                <i className="fas fa-search"></i> Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
