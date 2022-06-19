import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import NodeContext from '../src/context/nodes/NodeContext';

ReactDOM.render(<NodeContext><App /></NodeContext>, document.getElementById('root'));
