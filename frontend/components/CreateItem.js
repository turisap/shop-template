import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import qgl from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';


class CreateItem extends Component {
    state = {
        title : "",
        description : "",
        image : "",
        largeImage : "",
        price : 0
    };

    /**
     * This is only one handler which works with all inputs at once (lecture 17)
     * @param e
     */
    handleChange = e => {
        // destructuring the synthetic event and obtaining value as well as type and name of the input
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name] : value});
    };

    render() {
        return (
            <Form onSubmit={e => {
                e.preventDefault();
                console.log(this.state)
            }}>
                <fieldset>
                    <label htmlFor="title">
                        Title
                        <input
                            value={this.state.title}
                            onChange={this.handleChange}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="title"
                            required
                        />
                    </label>
                    <label htmlFor="price">
                        Price
                        <input
                            value={this.state.price}
                            onChange={this.handleChange}
                            type="number"
                            id="price"
                            name="price"
                            placeholder="price"
                            required
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea
                            value={this.state.description}
                            onChange={this.handleChange}
                            id="description"
                            name="description"
                            placeholder="description"
                            required
                        />
                    </label>
                </fieldset>
                <button>Submit</button>
            </Form>
        );
    }
}

CreateItem.propTypes = {};

export default CreateItem;
