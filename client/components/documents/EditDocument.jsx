import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class EditDocument
 * @extends {React.Component}
 */
class EditDocument extends React.Component {
  /**
   * Creates an instance of EditDocument.
   * @param {object} props
   * @memberof EditDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.document.id,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
      editorState: EditorState.createWithContent(
        convertFromHTML(this.props.document.content),
        null
      ),
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }
  /**
   *
   *
   * @param {object} event
   *
   * @memberof EditDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errors: {} });
  }

  /**
   *
   *
   * @param {object} editorState
   *
   * @memberof EditDocument
   */
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: convertToHTML(editorState.getCurrentContent())
    });
  }

  /**
   *
   *
   * @param {object} event
   *
   * @memberof EditDocument
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.content.length > 12) {
      this.props
        .userUpdateDocumentRequest(
          this.state,
          this.props.currentUser.id,
          this.props.documentType
        )
        .then(() => {
           $('.modal').modal('close');
          const $toastContent =
            '<span id="update-doc">Document Updated Successfully</span>';
          Materialize.toast($toastContent, 5000);
        })
        .catch((error) => {
          this.setState({ errors: error.response.data });
          const { errors } = this.state;
          const $toastContent = `<span>${errors.message}</span>`;
          Materialize.toast($toastContent, 5000);
        });
    } else {
      const $toastContent =
        '<span id="doc_failure"> Content length must be atleast 5 </span>';
      Materialize.toast($toastContent, 5000);
    }
  }

  /**
   *
   *
   * @returns
   * @memberof EditDocument
   */
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <input
              id="icon_prefix"
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.onChange}
              className="validate edit-input"
              required
              icon="book"
            />
            <select
              name="access"
              required
              defaultValue={this.state.access}
              style={{ display: 'block' }}
              onChange={this.onChange}
            >
              <option value="" disabled>Select Role</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
            <br />
            <div className="editbox">
              <Editor
                editorState={editorState}
                toolbarClassName="home-toolbar"
                wrapperClassName="home-wrapper"
                editorClassName="home-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
              {' '}
            </div>
            <div className="input-field center">
              <button className="pink darken-4 btn edit-button" id="edit-doc">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditDocument.defaultProps = {
  documentType: null
};

EditDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string
};
export default EditDocument;
