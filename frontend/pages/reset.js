import CreateItem from '../components/CreateItem';

const ResetPassword = props => (
    <div>
        <p>Reset your password {props.query.resetToken}</p>
    </div>
);

export default ResetPassword;