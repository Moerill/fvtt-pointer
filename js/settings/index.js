import { PointerSettingsMenu } from './settings.js';

import initControls from '../keybindings.js';

export function initSettingsMenu() {

	game.settings.register('pointer', 'default', {
		name: "Activate placeables changes.",
		hint: "Changes some behaviours of placeables, like preview snapping to grid. Reload for all connected clients is required for this to take effect if changed!",
		scope: "world",
		config: false,
		default: PointerSettingsMenu.defaultSettings,
		type: Object
	});

	game.settings.registerMenu('pointer', 'design-studio', {
		name: game.i18n.localize('POINTER.Settings.Name'),
		label: game.i18n.localize('POINTER.Settings.Button'),
		icon: 'fas fa-paint-roller',
		type: PointerSettingsMenu,
		restricted: false
	});

	game.settings.register('pointer', 'collection', {
		name: "Collection of all pings and pointers",
		config: false,
		restricted: false,
		scope: "world",
		type: Object,
		default: PointerSettingsMenu.defaultCollection,
		onChange: (data) => {
			canvas.controls.pointer.updateAll();
		}
	});

	loadTemplates([
		'modules/pointer/templates/designer.html',
	]);

	Hooks.on('updateUser', (entity, udata) => {
		if (udata.color) {
			canvas.controls.pointer.updateUserColor(entity);
		}
		if (udata.flags?.pointer?.settings)
			canvas.controls.pointer.update(entity);
	});

	game.settings.register('pointer', 'version', {
		name: "Pointer Version",
		scope: "world",
		config: false,
		default: "0",
		type: String
	});
}
