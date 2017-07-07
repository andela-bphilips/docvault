import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';

import CreateDocument from '../documents/CreateDocument.jsx';
import MyDocuments from '../documents/MyDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import {
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userPersonalDocumentRequest
} from '../../actions/documentActions';

const MyDocumentPage = ({
  currentUser,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  userPersonalDocumentRequest,
  documents,
  loading
}) => (
  <div>
    <div className="page">
      <main>
        <div className="breadcrumb grey lighten-3">
          <h6>My Documents</h6>
        </div>
        <Modal
          header="Create Document"
          trigger={
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large pink darken-4">
                <i className="large white-text material-icons">edit</i>
              </a>
            </div>
          }
        >
          <CreateDocument
            currentUser={currentUser}
            userSaveDocumentRequest={userSaveDocumentRequest}
            documentType={'personal'}
          />
        </Modal>
        <br />
        <SearchDocument
          userSearchRequest={userSearchRequest}
          currentUser={currentUser}
          documentType={'personal'}
        />
        <br />
        <div className="row">
          <MyDocuments
            currentUser={currentUser}
            userDocumentRequest={userDocumentRequest}
            documents={documents}
            loading={loading}
            userDeleteDocumentRequest={userDeleteDocumentRequest}
            userUpdateDocumentRequest={userUpdateDocumentRequest}
            userPersonalDocumentRequest={userPersonalDocumentRequest}
            documentType={'personal'}
          />
        </div>
      </main>
    </div>
  </div>
);

MyDocumentPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents,
    loading: state.ajaxCallsInProgress
  };
}

export default connect(mapStateToProps, {
  userPersonalDocumentRequest,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
})(MyDocumentPage);
