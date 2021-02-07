import { React } from 'react';
import Name from './Name';

class Hello extends React.Component {
    render() {
      return <h1>Hello <Name /></h1>;
    }
  }
  
  export default Hello;