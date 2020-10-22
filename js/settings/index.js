import { PointerSettingsMenu } from './settings.js';

import initControls from '../keybindings.js';

export function initSettingsMenu() {
	// game.settings.register('pointer', 'gmSettings', {

	// });

	game.settings.register('pointer', 'default', {
		name: "Activate placeables changes.",
		hint: "Changes some behaviours of placeables, like preview snapping to grid. Reload for all connected clients is required for this to take effect if changed!",
		scope: "world",
		config: false,
		default: PointerSettingsMenu.defaultSettings,
		type: Object
	});
	
	// for (let user of game.users) {
	// 	game.settings.register('pointer', user.id, {
	// 		name: "Activate placeables changes.",
	// 		hint: "Changes some behaviours of placeables, like preview snapping to grid. Reload for all connected clients is required for this to take effect if changed!",
	// 		scope: "world",
	// 		config: false,
	// 		restricted: false,
	// 		default: PointerSettingsMenu.defaultSettings,
	// 		type: Object,
	// 		onChange: data => {
	// 			initControls();
	// 			if (canvas.controls.pointer)
	// 				canvas.controls.pointer.update(user.id, data);
	// 		}
	// 	});
	// }


	game.settings.registerMenu('pointer', 'design-studio', {
		name: 'Design your pointer!',
		label: 'Design Studio',
		icon: 'fas fa-paint-roller',
		type: PointerSettingsMenu,
		restricted: false
	});

	game.settings.register('pointer', 'collection', {
		name: "Collection of all pings and pointers",
		config: false,
		restricted: false,
		scope: "world",
		type: Object
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

		
		if (udata.flags?.pointer?.settings?.controls && entity.id === game.user.id)
			initControls();
	});

	game.settings.register('pointer', 'version', {
		name: "Pointer Version",
		scope: "world",
		config: false,
		default: "0",
		type: String
	});
	if (game.user.isGM) {
		const version = game.settings.get('pointer', 'version');
		// only do this once after upgrading to 2.0.0
		if (isNewerVersion("2.0.0", version)) {
			new (PointerSettingsMenu)().render(true);
		}
		// Update version to newest mod version - every time
		if (isNewerVersion(game.modules.get('pointer').data.version, version)) {
			game.settings.set('pointer', 'version', game.modules.get('pointer').data.version);
		}
	}
}