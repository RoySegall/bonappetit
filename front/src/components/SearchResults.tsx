import * as React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import AppContext from "../Store/AppContext"

export default class SearchResults extends React.Component<RouteComponentProps, any, any> {

    constructor(props) {
        super(props);

        this.state = {
            results: [
                {
                    _id: 50,
                    image: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/d97312e937034475934f5ca16c974dc1/eggsfinalFB.jpg?output-quality=60&resize=600:*",
                    title: "French Omelette",
                    products: ["Egg", "Salt", "Oil"],
                    matchFor: ["Vegetarian", "Carnivore"],
                    steps: [
                        {
                            "text": "Take a pan and hit it"
                        },
                        {
                            "text": "Crack two eggs into a bowel"
                        },
                        {
                            "text": "Add the salt"
                        },
                        {
                            "text": "scramble them together"
                        },
                        {
                            "text": "Once the pan is hot, poor the scramble eggs to the pan"
                        },
                        {
                            "text": "Wait until the scramble eggs solid on the back side and flip it"
                        },
                        {
                            "text": "Repeat again on the previous step"
                        }
                    ],
                    duration: "15m",
                }
            ]
        };
    }

    emptyProductsError = (products) => {

        if (Object.keys(products).length !== 0) {
            return;
        }

        return (
            <div className="search-results-wrapper">
                <div className="alert alert-danger">
                    You did not selected any products.
                    <Link to="/">Select some products and everything will be OK.</Link>
                </div>
            </div>
        )
    };

    getResultsFromServer = (products) => {
        if (Object.keys(products).length === 0) {
            return;
        }

        return (

            <div className="search-results-wrapper">
                <h2>Search results</h2>
                <hr/>

                <div className="results">

                    {this.state.results.map((result: any, index) => {
                        return (
                            <div className="row result" key={index}>
                                <div className="col-2">
                                    <img src={result["image"]} className="img-fluid intro-image"
                                         alt="Recipe example"/>
                                </div>

                                <div className="col-9 recipe-info">
                                                    <span className="title"><Link
                                                        to={"/recipe/" + result._id}>{result.title}</Link></span>

                                    <section className="metadata">
                                        <div className="products">
                                            <b>Products:</b>{result.products.join(", ")}</div>
                                        <div className="diets"><b>Match
                                            for:</b>{result.matchFor.join(", ")}</div>
                                        <div className="steps"><b>Number of
                                            steps:</b>{result.steps.length}</div>
                                        <div className="duration"><b>Duration:</b>{result.duration}
                                        </div>
                                    </section>
                                </div>
                                <p className="col-12 recipe">
                                    {result.steps.map((item, index) => {
                                        return <span
                                            key={index}>{item.text}{index + 1 === result.steps.length ? "" : ", "}</span>;
                                    })}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

        )
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9 mx-auto">

                    <AppContext.Consumer>
                        {(context: any) => (
                            <div>
                                {this.emptyProductsError(context.products)}
                                {this.getResultsFromServer(context.products)}
                            </div>
                        )}
                    </AppContext.Consumer>
                </div>
            </div>
        );
    }
}
