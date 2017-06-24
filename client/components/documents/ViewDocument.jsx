import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { Modal, Icon } from 'react-materialize';

class ViewDocument extends React.Component {
  render() {
    const { document } = this.props;
    return (
      <div>
        <div className="col s12">
          <div className="row">
              <hr />
            <div> <center><h5>Title: {document.title} </h5> </center></div>
            <hr />
             <p className="meta-info">Created on: {new Date(document.createdAt).toDateString()},
            by: <span className="pink-text darken-4">{ document.username }</span></p>
            <div>{renderHTML(document.content)} </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewDocument.propTypes = {
  //   currentUser: PropTypes.object.isRequired,
  //   userPersonalDocumentRequest: PropTypes.func.isRequired,
//   userSearchRequest: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default ViewDocument;