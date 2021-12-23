let controls;
import { PointerSettingsMenu } from './settings/settings.js';
export default function init() {
    //console.log('Pointer | Initializing controls');
    setUpControls(null);
}

function setUpControls() {
    controls = { pointer: {}, ping: {}, force: {} };

    const {ALT, SHIFT, CONTROL} = KeyboardManager.MODIFIER_KEYS;

    game.keybindings.register("pointer", "showPointer", {
        name: game.i18n.localize("POINTER.Settings.Controls.pointer.label"),
        hint: game.i18n.localize("POINTER.Settings.Controls.pointer.hint"),
        editable: [
            {
                key: "X",
                modifiers: []
            }
        ],
        onDown: onPointerDown,
        onUp: onPointerUp,
        restricted: false,
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });

    game.keybindings.register("pointer", "showPing", {
        name: game.i18n.localize("POINTER.Settings.Controls.ping.label"),
        hint: game.i18n.localize("POINTER.Settings.Controls.ping.hint"),
        editable: [
            {
                key: "Z",
                modifiers: []
            }
        ],
        onDown: onPing,
        restricted: false,
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });


    game.keybindings.register("pointer", "forcePing", {
        name: game.i18n.localize("POINTER.Settings.Controls.ping.force"),
        hint: game.i18n.localize("POINTER.Settings.Controls.ping.forceHint"),
        editable: [
            {
                key: "Z",
                modifiers: [SHIFT]
            }
        ],
        onDown: onForcePing,
        restricted: true, // GM only!
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
}

function onPointerDown(ev) {
    //console.log('Pointer | Key down', ev);
    controls.pointer.active = true;
    canvas.controls.pointer.start();
}

function onPointerUp(ev) {
    //console.log('Pointer | Key up', ev);
    controls.pointer.active = false;
    canvas.controls.pointer.stop();
}

function onPing(ev) {
    if (controls.ping.pointerActive && !controls.pointer.active) return;
    //console.log('Pointer | on Ping ', ev);
    canvas.controls.pointer.ping();
}

function onForcePing(ev) {
    if (controls.ping.pointerActive && !controls.pointer.active) return;
    //console.log('Pointer | on Force Ping ', ev);
    canvas.controls.pointer.ping({ force: true });
}
