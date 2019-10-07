import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Modal from '../Modal'
import histroy from '../../history'
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions() {
        const { id } = this.props.match.params;
        return (
            <>
                {/* <React.Fragment> */}
                {/* <></> is exactly same as <React.Fragment></React.Fragment> */}
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
            // </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure ou want to delete this stream?'
        }
        return `Are ou sure you want to delete the stream with the title: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal
                title={'Delete Stream'}
                content={this.renderContent()}
                actions={this.renderActions()}
                // this will be used by the modal component 
                onDismiss={() => histroy.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);