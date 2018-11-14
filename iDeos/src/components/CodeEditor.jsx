// external dependencies
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as Themes from '../themes/generator';

const theme = Themes.loadTheme(Themes.Themes.cobalt2);
// console.log(`THEME: \n${JSON.stringify(theme, null, '\t')}`);

class CodeEditor extends Component {
  // Removed this 'useless constructor' based on Chrome dev tools console warnings
  // constructor(props) {
  //   super(props);
  // }

  editorWillMount(monaco) {
    monaco.editor.defineTheme('myTheme', theme);
    monaco.editor.setTheme('myTheme');
  }

  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    editor.focus();
  };

  onChange = (newValue, e) => {
    // console.log('iN ONCHANGE', this.props.editorChange(newValue));
    this.props.editorChange(newValue);
    this.props.editFileContents(this.props.currFilePath);
  };

  getCode() {
    // return this.state.code;
    return 'got code';
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
      minimap: {
        enabled: false,
      },
      fontSize: 14,
      automaticLayout: true,
      fontLigatures: true,
    };

    return (

      <MonacoEditor
        width="100%"
        height="100%"
        language="cpp"
        value={this.props.code}
        options={options}
        // theme="vs-dark"
        onChange={this.onChange}
        editorWillMount={this.editorWillMount}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default CodeEditor;
