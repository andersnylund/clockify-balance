import ReactDOM from 'react-dom';
import { App } from './App';
import 'arrive';

const containerId = 'clockify-balance';
const containerNotMounted = !document.getElementById(containerId);

const renderBalance = () => {
  const element = document.createElement('div');
  element.style.marginBottom = '2rem';
  element.id = containerId;
  document.arrive('entry-group', () => {
    document.querySelector('entry-group')?.prepend(element);
    ReactDOM.render(<App />, element);
  });
};

if (containerNotMounted) {
  renderBalance();
} else {
  document.getElementById(containerId)?.remove();
  renderBalance();
}
