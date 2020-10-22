import { initSettingsMenu } from './settings/index.js';
import { PointerContainer } from './pixi/container.js';
import initControls from './keybindings.js';

Hooks.on('ready', () => {
	initSettingsMenu();


	PointerContainer.init();
	initControls();
	Hooks.on('canvasReady', initControls);
});
