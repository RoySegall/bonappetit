import * as React from "react";
import {Link, NavigateFn, WindowLocation} from "@reach/router";
import Http from "../Http";
import AppProvider from "../Store/AppProvider";

type SearchResultComponentInterface<TParams = {}> = Partial<TParams> & {
    path?: string;
    default?: boolean;
    location?: WindowLocation;
    navigate?: NavigateFn;
    uri?: string;
    context?: AppProvider;
};

export default class SearchResults extends React.Component<SearchResultComponentInterface, any, any> {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
        };
    }

    componentDidMount(): void {

        const http = new Http();

        let context: any = this.props.context;

        http.request("post", "search/recipes", {
            "ids": Object.keys(context.products),
            "strategy": context.strategy})
            .then((data) => {
                this.setState({results: data.data.results});
            }).catch((e) => {
            console.log(e);
        });
    }

    emptyProductsError = () => {

        if (this.state.results.length !== 0) {
            return;
        }

        return (
            <div className="search-results-wrapper">
                <div className="alert alert-danger">
                    You did not selected any products.
                    <Link to="/">Select some products and everything will be OK.</Link>
                </div>
            </div>
        );
    }

    getResultsFromServer = () => {
        if (this.state.results.length === 0) {
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
                                            <b>Products:</b>{result.ingredients.map((item: any) => {
                                                return item.name;
                                        }).join(", ")}</div>
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

        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9 mx-auto">
                    <div>
                        {this.emptyProductsError()}
                        {this.getResultsFromServer()}
                    </div>
                </div>
            </div>
        );
    }
}
