import { Pointer, Ping } from "./pointer.js";
import { TweenMax } from "../../../../scripts/greensock/esm/all.js";
import { PointerSettingsMenu } from "../settings/settings.js";

export class PointerContainer extends PIXI.Container {
  constructor() {
    super();
    this.initUsers();

    this._socket = "module.pointer";
    this._onMouseMove = (ev) => this._mouseMove(ev);
  }

  get deltaTime() {
    return 1000 / 30;
  }

  static init() {
    // called inside the ready hook, so settings are registered.
    // ready hook *always* is supposed to come after the canvasReady hook
    if (canvas.scene)
      canvas.controls.pointer = canvas.controls.addChild(
        new PointerContainer()
      );

    // window.addEventListener('mousemove', PointerContainer.trackMousePos);
    game.socket.on("module.pointer", PointerContainer.socketHandler);
    // but ready comes only during initialization
    // so we need to take care of future scene changes (or other reasons for canvas rerenders)
    Hooks.on("canvasReady", () => {
      if (canvas.controls.pointer)
        canvas.controls.pointer.destroy({ chidren: true });

      canvas.controls.pointer = canvas.controls.addChild(
        new PointerContainer()
      );
    });
  }

  async initUsers() {
    this._users = {};
    for (let user of game.users) {
      const data = this._getUserPointerData(user);
      const pointer = this.addChild(new Pointer(data.pointer, user.id));
      const ping = this.addChild(new Ping(data.ping, user.id));
      ping.hide();
      pointer.hide();
      this._users[user.id] = { pointer, ping };
    }
  }

  _getUserPointerData(user) {
    const collection =
      game.settings.get("pointer", "collection") ||
      PointerSettingsMenu.defaultCollection;
    const settings = mergeObject(
      PointerSettingsMenu.defaultSettings,
      user.getFlag("pointer", "settings")
    );
    const pointerData =
      collection.find((e) => e.id === settings.pointer) || collection[0];
    const pingData =
      collection.find((e) => e.id === settings.ping) ||
      collection[1] ||
      collection[0];
    return { pointer: pointerData, ping: pingData };
  }

  update(user) {
    const data = this._getUserPointerData(user);
    if (!data.pointer || !data.ping) return;
    this._users[user.id].pointer.update(data.pointer);
    this._users[user.id].ping.update(data.ping);
  }

  updateAll() {
    for (let user of game.users) {
      this.update(user);
    }
  }

  updateUserColor(user) {
    const pointer = this._users[user.id].pointer;
    pointer.update({ tint: pointer.data.tint });
    const ping = this._users[user.id].ping;
    ping.update({ tint: ping.data.tint });
  }

  getMouseWorldCoord() {
    return canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(
      canvas.stage
    );
  }

  ping({
    userId = game.user.id,
    position = this.getMouseWorldCoord(),
    force = false,
    scale = canvas.stage.scale.x,
  } = {}) {
    const ping = this._users[userId].ping;
    ping.update({ position });

    if (force) {
      canvas.animatePan({ x: position.x, y: position.y, scale: scale });
    }

    if (userId !== game.user.id) return;

    const data = {
      senderId: userId,
      position: position,
      sceneId: canvas.scene.id,
      type: "ping",
      force: force,
      scale: canvas.stage.scale.x,
    };
    game.socket.emit(this._socket, data);
  }

  destroy(options) {
    super.destroy(options);
  }

  static socketHandler(data) {
    if (data.stop) {
      canvas.controls.pointer.hidePointer(data.senderId);
      return;
    } else if (data.sceneId !== canvas.scene.id) return;
    else if (data.type === "pointer")
      canvas.controls.pointer.movePointer(data.senderId, data.position);
    else if (data.type === "ping")
      canvas.controls.pointer.ping({
        userId: data.senderId,
        position: data.position,
        force: data.force,
        scale: data.scale,
      });
  }

  movePointer(userId, { x, y }) {
    const pointer = this._users[userId].pointer;
    if (pointer.renderable) {
      // only animate if already visible
      TweenMax.to(pointer.position, this.deltaTime / 1000, { x, y });
    } else {
      pointer.renderable = true;
      this._users[userId].pointer.update({ position: { x, y } });
    }
  }

  hidePointer(userId) {
    const pointer = this._users[userId].pointer;
    pointer.hide();
  }

  start() {
    this.lastTime = 0;
    this._mouseMove();
    window.addEventListener("mousemove", this._onMouseMove);
    this._users[game.user.id].pointer.renderable = true;
  }

  stop() {
    window.removeEventListener("mousemove", this._onMouseMove);
    this._users[game.user.id].pointer.renderable = false;
    const data = {
      senderId: game.user.id,
      stop: true,
    };
    game.socket.emit(this._socket, data);
  }

  _mouseMove(ev) {
    const { x, y } = this.getMouseWorldCoord();
    this._users[game.user.id].pointer.update({ position: { x, y } });

    const dt = Date.now() - this.lastTime;
    if (dt < this.deltaTime)
      // 30 times per second
      return;

    this.lastTime = Date.now();
    let mdata = {
      senderId: game.user.id,
      position: { x, y },
      sceneId: canvas.scene.id,
      type: "pointer",
    };
    game.socket.emit(this._socket, mdata);
  }

  destroy(...args) {
    super.destroy(...args);
    this.stop();
  }
}
