import React from 'react';
import { connect } from "react-redux";
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '926302602377-3o9pa50b2udrptk6ohcn5t06ehi3qbm6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // this is the google auth object which has all the methods assigned to it 
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                //this will listen when the user signs in 
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return <button className="ui red google button"
                onClick={this.onSignOutClick}
            >
                <i className="google icon" />
                Sign Out
            </button>
        } else {
            return (
                <button className="ui red google button"
                    onClick={this.onSignInClick}
                >
                    <i className="google icon" />
                    Sign In
            </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToPros = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToPros, { signIn, signOut })(GoogleAuth);