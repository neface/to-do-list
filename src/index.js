import './style.css';
import todoManager from './todoManager.js';
import { render } from './dom/render.js';

todoManager.init();
render();

window.addEventListener("app:render", render);

