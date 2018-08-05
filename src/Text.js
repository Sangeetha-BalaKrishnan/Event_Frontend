import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  handleThemeChange (newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
  }


  render() {

    return (
      <ReactQuill
      	theme = {this.state.theme}
      	value={this.state.editorHtml}
      	onChange = {this.handleChange}
      	modules = {TextEditor.modules}
      	formats={TextEditor.formats}
      	placeholder={'Write Something....'} />
    );
  }
}

TextEditor.modules = {
	toolbar: [
	[{header:['1','2','3','4']}],
    [{ 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{color:['red','blue','white','black']}],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
TextEditor.formats = [
  'header', 'font', 'size','color',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent'
]

export default TextEditor ;
