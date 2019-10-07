import _ from 'lodash'
import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm'

class StremeEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }
    render() {
        if (!this.props.stream) {
            return <div>...Loading</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    // this adds required values and id and  userId which we don't need
                    // initialValues={this.props.stream} 
                    // we are using lodash to pick only the required field from the object
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )
    }

};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StremeEdit);