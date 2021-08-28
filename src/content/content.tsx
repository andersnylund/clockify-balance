import ReactDOM from 'react-dom';
import { Balance } from './Balance';

const element = document.createElement('div');

document.querySelector('time-tracker-recorder')?.append(element);

ReactDOM.render(<Balance />, element);
