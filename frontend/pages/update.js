import React from 'react';
import UpdateItem from '../components/UpdateItem';

const Update = props => (
    <div>
        <UpdateItem id={props.query}/>
    </div>
);

export default Update;