import * as React from "react";
import {RouteComponentProps} from "@reach/router";

export default class Recipe extends React.Component<RouteComponentProps, any, any> {

    constructor(props) {
        super(props);
        this.state = {
            item: {
                "image": 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/d97312e937034475934f5ca16c974dc1/eggsfinalFB.jpg?output-quality=60&resize=600:*',
                "_id": "5c4a0e6188c73a4dba66063b",
                "title": "Omelette",
                "description": "Making a simple omelette",
                "matchFor": ['Vegetarian', 'Carnivore'],
                "created": "June 25th 2018",
                "ingredients": [
                    {
                        "product_id": "Egg",
                        "amount": 2,
                        "quantity": "pieces"
                    },
                    {
                        "product_id": "Butter",
                        "amount": 5,
                        "quantity": "gram"
                    },
                    {
                        "product_id": "Salt",
                        "amount": 1,
                        "quantity": "tbs"
                    }
                ],
                "steps": [
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
                "notes": [
                    {
                        "text": "You can switch the butter with oil",
                    },
                    {
                        "text": "You might want to use a non-stick pan which can reduce the amount of oil",
                    },
                    {
                        "text": "Eggs can be a good source for protein",
                    }
                ],
            },

        };
    }

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <div className="recipe-page">
                            <h2>{this.state.item.title}</h2>
                            <h3>{this.state.item.description}, published: {this.state.item.created}</h3>
                            <hr/>

                            <div className="row">
                                <div className="col-7">
                                    {this.state.item.steps.map((item, key) => {
                                        return (
                                            <div className="steps" key={key}>
                                                <p className="step">
                                                    <span className="counter">Step No. {key + 1}</span>
                                                    <span className="text">{item.text}</span>
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="col-5">
                                    <section className="metadata">
                                        <div className="image">
                                            <img src={this.state.item['image']} className="img-fluid intro-image" alt="Recipe example" />
                                        </div>

                                        <div className="row">
                                            <div className="first col-4"><b>Match for</b></div>
                                            <div className="second col-8">{this.state.item.matchFor.join(', ')}</div>
                                        </div>

                                        {this.state.item.ingredients.map((item, key) => {
                                            return (
                                                <div className="row" key={key}>
                                                    <div className="first col-4">{item.product_id}</div>
                                                    <div className="second col-8">{item.amount} {item.quantity}</div>
                                                </div>
                                            )
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
                            {this.state.item.notes.map((item, key) => {
                                return (
                                    <li key={key}>{item.text}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


