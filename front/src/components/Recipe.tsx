import * as React from "react";
import {RouteComponentProps} from "@reach/router";
import Http from "../Http";

export default class Recipe extends React.Component<RouteComponentProps, any, any> {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
        };
    }

    componentDidMount() {
        const http = new Http();

        let props: any = this.props;

        http.request("get", "recipe/" + props.id)
            .then(({data: item}) => this.setState({item})).catch((e) => {
            console.log(e);
        });
    }

    render() {
        const {item} = this.state;
        if (Object.keys(item).length === 0) {
            return (
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-9 mx-auto text-center">
                            <i className="fa fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <div className="recipe-page">
                            <h2>{item.title}</h2>
                            <h3>{item.description}, published: {item.created}</h3>
                            <hr/>

                            <div className="row">
                                <div className="col-7">
                                    {item.steps.map(({text}, key) => {
                                        return (
                                            <div className="steps" key={key}>
                                                <p className="step">
                                                    <span className="counter">Step No. {key + 1}</span>
                                                    <span className="text">{text}</span>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="col-5">
                                    <section className="metadata">
                                        <div className="image">
                                            <img src={item["image"]} className="img-fluid intro-image" alt="Recipe example" />
                                        </div>

                                        <div className="row">
                                            <div className="first col-4"><b>Match for</b></div>
                                            <div className="second col-8">{this.state.item.matchFor.join(", ")}</div>
                                        </div>

                                        {item.ingredients.map(({quantity, amount, name}, key) => {
                                            return (
                                                <div className="row" key={key}>
                                                    <div className="first col-4">{name}</div>
                                                    <div className="second col-8">{amount} {quantity}</div>
                                                </div>
                                            );
                                        })}
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <h4><i className="fas fa-info"></i> Notes</h4>

                        <hr />


                        <ul>
                            {item.notes.map(({text}, key) => {
                                return (
                                    <li key={key}>{text}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


