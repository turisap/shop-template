import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import * as CONFIG from '../config';
import ErrorMessage from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION (
        $title : String!
        $description : String!
        $price : Int!
        $image : String,
        $largeImage : String
    ){
        createItem (
            title : $title
            description : $description
            price : $price,
            image : $image,
            largeImage : $largeImage
        )
        {
            id
        }
    }
`;

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

    handleSubmit = async (e, createItemFunction) => {
        e.preventDefault();
        const response = await createItemFunction();
        Router.push({
            pathname : '/item',
            query : { id : response.data.createItem.id }
        })
    };

    uploadFile = async e => {
        console.log('uploading file...');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'shop-template');

        const res = await fetch(CONFIG.CLOUDINARY_API_ENDPOINT, {
            method: 'POST',
            body: data,
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        });
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_ITEM_MUTATION}
                variables={this.state}
            >
                {(createItemFunction, { loading, error }) => (
                    <Form onSubmit={ e => this.handleSubmit(e, createItemFunction)}>
                        <ErrorMessage error={error}/>
                        {/** setting loading animations and disabling inputs while submitting the form **/}
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                                <input
                                    onChange={this.uploadFile}
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="upload an image"
                                    required
                                />
                                {this.state.image && <img src={this.state.image} width={"200"} alt={"upload preview"}/>}
                            </label>
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
                )}
            </Mutation>
        );
    }
}

CreateItem.propTypes = {};

export default CreateItem;
export { CREATE_ITEM_MUTATION };