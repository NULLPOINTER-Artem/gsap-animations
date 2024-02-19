import $ from 'jquery';
import { supportsWebp } from "./modules/functions.js";
import { init as initHoverTextAnim } from './modules/hoverTextAnim.js';

$(() => {
  supportsWebp();
  initHoverTextAnim();
});
