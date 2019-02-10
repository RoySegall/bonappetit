import * as React from "react";
import {navigate} from "@reach/router";
import AppContext from "../../Store/AppContext";

export default class SearchForm extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            diets: [
                {
                    key: "vegan",
                    name: "Vegan",
                    icon: "fas fa-seedling",
                },
                {
                    key: "vegetarian",
                    name: "Vegetarian",
                    icon: "fas fa-cheese",
                },
                {
                    key: "carnivore",
                    name: "Carnivore",
                    icon: "fas fa-drumstick-bite",
                },
            ],
            cloned_products: props.products,
            strategy: "exact",
            diet: "",
            formError: ""
        };
    }

    /**
     * Marking a product as selected.
     *
     * @param event
     *  The event object.
     * @param id
     *  The ID of the object.
     * @param context
     *  The context service.
     */
    handleProductSelection = (event, id, context: any = {}) => {
        event.preventDefault();

        let selected = this.state.selected;

        if (selected[id] !== null) {
            selected[id] = !selected[id];
        } else {
            selected[id] = true;
        }

        if (context !== {}) {
            context.setProducts(selected);
        }

        this.setState({selected});
    };

    /**
     * Checking if a product marked as selected.
     *
     * @param id
     *  The ID of the product.
     */
    getProductSelectionState = (id) => {
        if (this.state.selected[id] === null) {
            return false;
        }

        return this.state.selected[id];
    }

    /**
     * Handling a diet selection action.
     *
     * @param event
     *  The event object.
     * @param diet
     *  The diet type.
     * @param context
     *  The react context object.
     */
    handleDietSelection = (event, diet, context: any = {}) => {
        event.preventDefault();

        if (this.state.diet === diet) {
            // The user selected the current selected diet. Set the selected diet to none.
            diet = null;
        }

        // When the user select a diet we need to set the current component products as the products from the DB which
        // passed as a property to the component.
        let cloned_products = this.props.products;

        if (diet !== null) {
            // There is a selected diet. Filter products which does not match to the selected diet.
            cloned_products = cloned_products.filter((item) => {
                return item.diets.indexOf(diet) >= 0;
            });
        }

        // Setting the diet type in the context.
        if (context !== {}) {
            context.setDiet(diet);
        }

        // Setting the diet and the filtered products, if they filtered, and clear the selected products property.
        // We need to clear the selected because the user might selected products which not match the current diet.
        this.setState({diet, cloned_products, selected: {}});
    };

    /**
     * Reset the form state.
     *
     * @param event
     *  The event object.
     * @param context
     *  The context object.
     */
    resetForm = (event, context: any = {}) => {
        event.preventDefault();

        this.setState({
            selected: {},
            diet: "",
            formError: "",
            strategy: "exact",
        });

        if (context !== {}) {
            context.setStrategy("exact");
            context.setProducts({});
            context.setDiet("");
        }
    };

    /**
     * Submitting the form.
     *
     * @param event
     *  The event object.
     */
    submitForm = (event) => {
        event.preventDefault();

        this.setState({formError: ""});

        // Checking if the user selected any product. When we got a selected product with true that mean the user
        // selected at least one product and that's OK for us.
        for (let selected in this.state.selected) {
            if (this.state.selected[selected]) {
                navigate("/search-results");
                return;
            }
        }

        this.setState({formError: "Please select some products"});
    }

    /**
     * Switching between products combinations strategy.
     *
     * @param event
     *  The event object.
     * @param strategy
     *  The strategy - exact or contains.
     * @param context
     */
    selectStrategy = (event, strategy, context: any = {}) => {
        event.preventDefault();

        if (context !== {}) {
            context.setStrategy(strategy);
        }

        this.setState({strategy});
    };

    render() {
        return (
            <div>

                <form className="row">
                    <div className="col-md-8 mx-auto text-center">
                        <h3>Search recipes</h3>

                        <hr/>

                        <div className="diets-wrapper">

                            <label htmlFor="diets">Please select your diet type:</label>

                            <div className="diets" id="diets">
                                {this.state.diets.map((item, key) => {
                                    let className = `btn ${item.key}`;

                                    if (this.state.diet !== "") {
                                        if (this.state.diet === item.key) {
                                            className += " selected";
                                        }
                                    }

                                    return (
                                        <AppContext.Consumer key={key}>
                                            {(context: any) => (
                                                <button
                                                    onClick={(e) => this.handleDietSelection(e, item.key, context)}
                                                    className={className}
                                                >
                                                    <i className={item.icon}></i> {item.name}
                                                </button>
                                            )}
                                        </AppContext.Consumer>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="products-wrapper">

                            <label htmlFor="products">Select the products you currently have:</label>

                            <div className="products" id="products">

                                {this.state.cloned_products.map((product, key) => {
                                    return (
                                        <AppContext.Consumer key={key}>
                                            {(context: any) => (
                                                <button
                                                    id={product.id}
                                                    onClick={(e) => this.handleProductSelection(e, product._id, context)}
                                                    className={(this.getProductSelectionState(product._id) ? "selected" : "") + " btn btn-light"}
                                                >
                                                    {this.getProductSelectionState(product._id) ? (
                                                        <i className="fas fa-check"></i>) : ""}
                                                    {product.name}
                                                </button>
                                            )}
                                        </AppContext.Consumer>

                                    );
                                })}
                            </div>
                        </div>

                        <div className="searching-strategy">

                            <label htmlFor="searching-strategy">How would you like to combine the products?</label>

                            <AppContext.Consumer>
                                {(context: any) => (
                                    <div className="selections">
                                        <a
                                            href="#"
                                            onClick={(e) => this.selectStrategy(e, "exact", context)}
                                            className={this.state.strategy === "exact" ? "selected" : ""}
                                        >
                                            <i className={this.state.strategy === "exact" ? "far fa-check-square" : "far fa-square"}></i>
                                            Only selected products
                                        </a>

                                        <a
                                            href="#"
                                            onClick={(e) => this.selectStrategy(e, "contains", context)}
                                            className={this.state.strategy === "contains" ? "selected" : ""}
                                        >
                                            <i className={this.state.strategy === "contains" ? "far fa-check-square" : "far fa-square"}></i>
                                            Selected products and more
                                        </a>
                                    </div>
                                )}
                            </AppContext.Consumer>


                            <p className="explain">
                                This will assure that only recipes which contains the selected items,<b>
                                {this.state.strategy === "exact" ?
                                    " and not more or less" :
                                    " and some other products as well"
                                }
                            </b>, will be picked
                            </p>
                        </div>

                        <AppContext.Consumer>
                            {(context: any) => (
                                <div className="actions">
                                    {
                                        this.state.formError !== "" ?
                                            <div className="alert alert-danger">{this.state.formError}</div> : ""
                                    }

                                    <button
                                        type="submit"
                                        className={"btn btn-danger reset-button"}
                                        onClick={(e) => {this.resetForm(e, context)}}
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

                            )}
                        </AppContext.Consumer>


                    </div>
                </form>
            </div>
        );
    }
}
