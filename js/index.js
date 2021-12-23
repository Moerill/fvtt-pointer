import { initSettingsMenu } from './settings/index.js';
import { PointerContainer } from './pixi/container.js';
import initControls from './keybindings.js';

Hooks.once('init', () => {
    initSettingsMenu();
    initControls();
});

Hooks.on('ready', () => {
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

    PointerContainer.init();
});
