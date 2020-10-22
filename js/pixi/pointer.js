import { TimelineMax } from '/scripts/greensock/esm/all.js';

export class Pointer extends PIXI.Container {
	constructor(data = {}) {
		super();
		this.data = data; //{gridSize: data.gridSize};
		if (!this.data.tint.user)
			this.data.tint.user = game.user.color;
		this.draw();
	}

	static get defaultSettings() {
		return this.default('pointer'); 
	}

	static default(type) {
		return {
			pointer: {
				name: 'Default Pointer',
				id: randomID(),
				scale: 1,
				img: 'modules/pointer/assets/pointer.svg',
				// tint: game.user.color,
				angle: 0,
				offset: {x: 0.5, y: 0.5},
				tint: {
					color: '#FFFFFF',
					useUser: true
				},
				gridSize: canvas.grid.size,
				pingDuration: 1,
				animations: {
					rotation: {
						use: false,
						dur: 1,
						min: 0,
						max: 180,
						yoyo: false,
						easing: {
							method: 'none',
							type: 'in'
						}
					},
					scale: {
						use: false,
						dur: 1,
						min: 0.5,
						max: 2,
						yoyo: false,
						easing: {
							method: 'none',
							type: 'in'
						}
					}
				}
			},
			ping: {
				name: 'Default Ping',
				id: randomID(),
				scale: 1,
				img: 'modules/pointer/assets/focus.svg',
				// tint: game.user.color,
				angle: 0,
				offset: {x: 0, y: 0},
				tint: {
					color: '#FFFFFF',
					useUser: true
				},
				gridSize: canvas.grid.size,
				pingDuration: 1,
				animations: {
					rotation: {
						use: true,
						dur: 5,
						min: -180,
						max: 180,
						yoyo: false,
						easing: {
							method: 'none',
							type: 'in'
						}
					},
					scale: {
						use: false,
						dur: 2.5,
						min: 1,
						max: 1.5,
						yoyo: true,
						easing: {
							method: 'sine',
							type: 'inOut'
						}
					}
				}
			}
		}[type]
	}

	async draw(newData = this.data) {
		if (this._drawing) return;
		this._drawing = true;
		const data = this.data;
		if (newData.img) {

			if (this.sprite) this.sprite.destroy();
		
			const tex = await loadTexture(data.img);
			this.sprite = this.addChild(new PIXI.Sprite(tex));
	
			const src = (tex.baseTexture.resource.source); // .cloneNode()
			if (src.tagName === 'VIDEO') {
				src.loop = true;
				src.muted = true;
				game.video.play(src);
			};
			const { height, width } = tex;
	
			this.sprite.pivot.x = width  / 2;
			this.sprite.pivot.y = height / 2; 
			newData = this.data;
		}
		
		if (newData.position) {
			this.position = data.position;
		}

		if (newData.scale) {

			const { height, width } = this.sprite.texture;
			const ratio = height / width;
			this.sprite.scale = new PIXI.Point(
				data.gridSize / width * data.scale,
				data.gridSize / height * data.scale * ratio
			);
		}

		if (newData.offset) {
			this.sprite.position = new PIXI.Point(
				data.offset.x * data.gridSize * data.scale,
				data.offset.y * data.gridSize * data.scale,
			);
		}

		if (newData.angle) {
			this.sprite.angle = data.angle;
		}

		if (newData.tint) {
			if (this.data.tint.useUser)
				this.sprite.tint = Number('0x' + data.tint.user.slice(1));
			else 
				this.sprite.tint = Number('0x' + data.tint.color.slice(1));
		}

		if (newData.animations) {
			if (this.timeline)
				this.timeline.clear();
			else
				this.timeline = new TimelineMax();
			
			if (this.data?.animations?.rotation?.use) {
				const rotData = this.data.animations.rotation;
				const min = rotData.min,
							max = rotData.max,
							dur = rotData.dur,
							yoyo = rotData.yoyo,
							ease = rotData.easing.method === 'none' ? 'none' : rotData.easing.method + '.' + rotData.easing.type;
				this.timeline.set(this, {angle: min}, 0);
				this.timeline.to(this, dur, {angle: max, ease, repeat: -1, yoyo}, 0);
			} else {
				this.rotation = 0;
			}
			if (this.data?.animations?.scale?.use) {
				const scaleData = this.data.animations.scale;
				const min = scaleData.min,
							max = scaleData.max,
							dur = scaleData.dur,
							yoyo = scaleData.yoyo,
							ease = scaleData.easing.method === 'none' ? null : scaleData.easing.method + '.' + scaleData.easing.type;
				this.timeline.set(this.scale, {x: min, y: min}, 0);
				this.timeline.to(this.scale, dur, {x: max, y: max, ease, repeat: -1, yoyo}, 0);
			} else {
				this.scale = new PIXI.Point(1,1);
			}

			this.timeline.play();
		}

		this._drawing = false;
	}

	update(udata) {
		this.data = mergeObject(this.data, udata);
		this.draw(expandObject(udata));

		return;
	}

	async save() {
		// do update stuff here
		const collection = game.settings.get('pointer', 'collection');
		let pointer = collection.find(e => e.id === this.data.id);
		pointer = mergeObject(pointer, this.data);
		return game.settings.set('pointer', 'collection', collection);
	}

	hide() {
		this.renderable = false;
	}

	ping(position) {
		return;
	}
}

export class Ping extends Pointer {
	draw(newData) {
		super.draw(newData);
		this.renderable = true;
		if (!this.timeline)
			this.timeline = new TimelineMax();

		this.timeline.set(this, {onComplete: () => {
				this.renderable = false;
				this.timeline.pause();
			}
		}, this.data.pingDuration || 3);
		this.timeline.restart();
	}
}