import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import AddToCart, { ADD_TO_CART_MUTATION} from '../components/AddToCart';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from "../components/User";
import {fakeUser, fakeCartItem} from "../lib/testUtils";

const mockedMutationCall = [
    {
        request : { query : CURRENT_USER_QUERY },
        result : { data : { me : {
                    ...fakeUser(),
                    cart : []
                }
            }
        }
    },
    {
        request : { query : ADD_TO_CART_MUTATION, variables : { id : 'abc123'} },
        result : { data : {
                addToCart : {
                    ...fakeCartItem(),
                    quantity : 1
                }
            }
        }
    }
];

describe('<AddToCart/>', () => {
    
})
