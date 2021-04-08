import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
 const propTypes = {
    onChange: PropTypes.func
  };
export default class MyStatefulEditor extends Component {
  
  componentDidMount() {
    let nv = ReactDOM.findDOMNode(this.nv);
    if(nv) {
      nv.addEventListener('keyup', this.handleNvkeyup);
    }
  
  }

  componentWillUnmount() {
    let nv = ReactDOM.findDOMNode(this.nv);
    if(nv)
      nv.removeEventListener("keyup", this.handleNvkeyup);
  }


  handleNvkeyup = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        
    }
  };

  state = {
    value: RichTextEditor.createValueFromString(this.props.value, 'html'),
  }
 
  onChange = (value) => {
    this.props.ha(value.toString('html'))
    
    this.setState({value});
    if (this.props.onChange) {
        this.props.onChange(
          value.toString('html')
        );
    }
  };
 
  render () {
    const attrs = this.props.index === 0 ? {"aria-nv-el-current": true} : {};

    return (
      <RichTextEditor
        ref={elem => this.nv = elem} 
        aria-nv-el {...attrs} 
        className="menu_item nv-default"
        value={this.state.value}
        onChange={this.onChange}
        readOnly={this.props.read}
      />
    );
  }
}

