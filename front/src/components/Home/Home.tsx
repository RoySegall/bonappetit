import * as React from "react";
import {RouteComponentProps} from "@reach/router";
import Info from "./Info";
import SearchForm from "./SearchForm";

export default class Home extends React.Component<RouteComponentProps, any, any> {

    constructor(props) {
        super(props);

        this.state = {
            products: [
                {
                    "_id": "01", "name": "Egg", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "02", "name": "Butter", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "03", "name": "Oil", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "04", "name": "Lemon", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "05", "name": "Cucumber", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "051", "name": "Zukini", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "06", "name": "Red Pepper", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "07", "name": "Yellow pepper", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "08", "name": "Green pepper", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "09", "name": "Jalapenio", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "10", "name": "Lettuce", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "11", "name": "Mirin", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "12", "name": "Rice", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "13", "name": "Pholio sheet", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "14", "name": "Pizza dough", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "15", "name": "Black pepper", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "16", "name": "Pene", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "17", "name": "Spagetti", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "18", "name": "Slamon", "diets": ["carnivore"]
                },
                {
                    "_id": "19", "name": "Tuna", "diets": ["carnivore"]
                },
                {
                    "_id": "20", "name": "Egg plant", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "21", "name": "Strawberry", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "22", "name": "Banana", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "23", "name": "Watermelon", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "24", "name": "Melon", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "25", "name": "Blue berries", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "26", "name": "Berries", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "27", "name": "Peach", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "28", "name": "Mango", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "29", "name": "Cacao", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "30", "name": "Nutella", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "31", "name": "Apple", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "32", "name": "Red onion", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "33", "name": "White onion", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "34", "name": "Ground beef", "diets": ["carnivore"]
                },
                {
                    "_id": "35", "name": "Sweet potato", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "36", "name": "Potato", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "37", "name": "Flower", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "38", "name": "Heavy cream", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "39", "name": "Cream", "diets": ["vegetarian", "carnivore"]
                },
                {
                    "_id": "40", "name": "Mushroom", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "41", "name": "Corn", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "42", "name": "Chili", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "43", "name": "Suger", "diets": ["vegan", "vegetarian", "carnivore"]
                },
                {
                    "_id": "44", "name": "Salt", "diets": ["vegan", "vegetarian", "carnivore"]
                }

            ],
            recipes: 30,
        };
    }

    render() {
        return (
            <div className="HomeComponent">
                <Info products={this.state.products} recipes={this.state.recipes}/>
                <SearchForm products={this.state.products} recipes={this.state.recipes}/>
            </div>
        );
    }
}
