import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        title : String!
        description : String!
        price : Int!
        image : String
        largeImage : String
    ) {
        createItem(
            title
            description
            price
            image
            largeImage
        )
    }
`;

class CreateItem extends Component {
    state = {
        title : 'lol',
        description : 'piu piu tool',
        image : 'lol.jpeg',
        largeImage : 'l.jpeg',
        price : 45
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name] : val });
    }

    render() {
        return (
            <div>
                <Form onSubmit={e => {
                    e.preventDefault();
                    console.log(this.state)
                }}>
                    <fieldset>
                        <label htmlFor={'title'}>
                            Title
                            <input
                                type={'text'}
                                id={'title'}
                                name={'title'}
                                placeholder={'Title'}
                                required
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label htmlFor={'price'}>
                            Price
                            <input
                                type={'number'}
                                id={'price'}
                                name={'price'}
                                placeholder={'Price'}
                                required
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label htmlFor={'price'}>
                            Description
                            <textarea
                                id={'description'}
                                name={'description'}
                                placeholder={'Enter a description'}
                                required
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </label>
                    </fieldset>
                    <button>SUBMIT</button>
                </Form>
            </div>
        );
    }
}

CreateItem.propTypes = {};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
