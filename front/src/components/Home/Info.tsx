import * as React from "react";
import {RouteComponentProps} from "@reach/router";

export default class Info extends React.Component<any, any> {

    render() {
        return (
            <section className="info bg-primary text-center">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="section-heading">Find out something to cook</h2>
                        <p>With over <b>{this.props.products.length}</b> products
                            and <b>{this.props.recipes}</b> recipes you'll
                            find something to cook
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}
