import { Pointer } from '../pixi/pointer.js';

export class PointerSettingsMenu extends FormApplication {
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			template: 'modules/pointer/templates/settings.html',
			height: 'auto',
			title: 'Pings and Pointers - Settings',
			width: 700,
			classes: ['pointer', 'pointer-settings'],
			tabs: [
				{
					navSelector: '.tabs',
					contentSelector: 'form',
					initial: 'name',
				},
			],
			submitOnClose: true,
			submitOnChange: true,
			closeOnSubmit: false,
			maxScale: 3,
			pixiOptions: {
				width: 300,
				height: 300,
				transparent: true,
				sharedTicker: true,
				sharedLoader: true,
			},
			gridSize: 50,
		};
	}

	static get defaultCollection() {
		return [
			{
				name: 'Pointer Hand',
				id: 'wztq19uwjl',
				scale: 1,
				angle: 0,
				offset: {
					x: 0.5,
					y: 0.5,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 1,
				animations: {
					rotation: {
						use: false,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: 0,
						max: 180,
					},
					scale: {
						use: false,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: 0.5,
						max: 2,
					},
				},
				img: 'modules/pointer/assets/pointer.svg',
			},
			{
				name: 'Ping Round',
				id: 'gw4tu2ov86',
				scale: 1,
				angle: 0,
				offset: {
					x: 0,
					y: 0,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 5,
				animations: {
					rotation: {
						use: true,
						dur: 5,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: -180,
						max: 180,
					},
					scale: {
						use: false,
						dur: 2.5,
						easing: {
							method: 'sine',
							type: 'inOut',
						},
						yoyo: true,
						min: 1,
						max: 1.5,
					},
				},
				img: 'modules/pointer/assets/focus.svg',
				gridSize: 50,
				default: 'ping',
			},
			{
				name: 'Ping Arrows',
				id: '6p55sd7xi3',
				scale: 1,
				angle: 0,
				offset: {
					x: 0,
					y: 0,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 5,
				animations: {
					rotation: {
						use: false,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: 0,
						max: 180,
					},
					scale: {
						use: true,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: true,
						min: 0.9,
						max: 1.3,
					},
				},
				img: 'modules/pointer/assets/convergence-target.svg',
			},
			{
				name: 'Ping Triangle',
				id: 'eogjz9yjn3',
				scale: 1,
				angle: 0,
				offset: {
					x: 0,
					y: -0.1,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 5,
				animations: {
					rotation: {
						use: true,
						dur: 4,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: -180,
						max: 180,
					},
					scale: {
						use: true,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: true,
						min: 0.9,
						max: 1.3,
					},
				},
				img: 'modules/pointer/assets/triangle-target.svg',
			},
			{
				name: 'Pointer Pin',
				id: 'dvs2vb9y0y',
				scale: 1,
				angle: -15,
				offset: {
					x: 0.35,
					y: -0.6,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 1,
				animations: {
					rotation: {
						use: false,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: 0,
						max: 180,
					},
					scale: {
						use: true,
						dur: 1.5,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: true,
						min: 0.9,
						max: 1,
					},
				},
				img: 'modules/pointer/assets/pin.svg',
			},
			{
				name: 'Pointer Arrow',
				id: '6njoyebxpf',
				scale: 1,
				angle: 0,
				offset: {
					x: 0,
					y: -0.5,
				},
				tint: {
					useUser: true,
					color: '#ffffff',
				},
				pingDuration: 1,
				animations: {
					rotation: {
						use: false,
						dur: 1,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: false,
						min: 0,
						max: 180,
					},
					scale: {
						use: true,
						dur: 1.5,
						easing: {
							method: 'none',
							type: 'in',
						},
						yoyo: true,
						min: 0.9,
						max: 1,
					},
				},
				img: 'modules/pointer/assets/plain-arrow.svg',
			},
		];
	}

	static get defaultSettings() {
		return {
			controls: {
				pointer: {
					key: 'X',
				},
				ping: {
					key: 'Left Click',
					force: 'Right Click',
					pointerActive: true,
				},
			},
		};
	}

	activateListeners(html) {
		super.activateListeners(html);
		html[0].querySelectorAll('.pointer-control-chooser').forEach((e) => this._initControlChooser(e));

		this._initDesigner(html[0].querySelector('.designer'));

		const chooser = html[0].querySelector('.chooser');
		chooser.addEventListener('click', (ev) => {
			let target = ev.target.closest('.pointer-name');
			if (target) {
				this._onClickName(ev);
			}

			target = ev.target.closest('.delete-pointer');
			if (target) {
				const li = target.closest('li');
				let collection = duplicate(game.settings.get('pointer', 'collection'));
				const pointerData = li.dataset.pointerId === this.pointer.data.id ? {} : duplicate(this.pointer.data);
				collection = collection.filter((e) => e.id !== li.dataset.pointerId);
				if (collection.length === 0) collection = duplicate(this.constructor.defaultCollection);
				game.settings.set('pointer', 'collection', collection).then(async (e) => {
					await this._render();
					this._selectPointer(pointerData);
				});
			}

			target = ev.target.closest('.add-pointer');
			if (target) {
				this._addPointer();
			}
		});

		chooser.querySelectorAll('input').forEach((e) =>
			e.addEventListener('change', (ev) => {
				ev.preventDefault();
				ev.stopPropagation();
				const target = ev.currentTarget;
				const list = target.closest('.chooser');
				const checkboxes = Array.from(list.querySelectorAll(`input[name=${target.name}]`)).filter((e) => e !== target);
				target.checked = true;
				for (let checkbox of checkboxes) {
					checkbox.checked = false;
				}
			})
		);

		if (!game.user.isGM) return;

		html[0].querySelector('.pointer-apply-settings').addEventListener('click', async (ev) => {
			const settings = this.userData;
			console.log(settings);
			for (let user of game.users) {
				await user.unsetFlag('pointer', 'settings');
				await user.setFlag('pointer', 'settings', settings);
			}
			ui.notifications.info('Finished applying settings to all users!');
		});
	}

	async _addPointer() {
		const idx = Math.floor(Math.random() * PointerSettingsMenu.defaultCollection.length);
		const pointerData = duplicate(PointerSettingsMenu.defaultCollection[idx]);
		pointerData.name = 'New';
		pointerData.id = randomID();

		const collection = duplicate(game.settings.get('pointer', 'collection'));
		collection.push(pointerData);
		await game.settings.set('pointer', 'collection', collection);

		await this._render(false, {});

		this._selectPointer(pointerData);
	}

	async _onClickName(ev) {
		const li = ev.target.closest('.pointer-selection');
		if (this.canConfigure) await this.pointer.save();
		const pointerId = li.dataset.pointerId;

		const collection = game.settings.get('pointer', 'collection');
		const pointerData = collection.find((e) => e.id === pointerId);
		this._selectPointer(pointerData);
	}

	async _selectPointer(pointerData) {
		this.pointer.update(pointerData);

		const designer = this.form.querySelector('.designer');
		const flatData = flattenObject(pointerData);
		console.log(flatData);
		for (let key of Object.keys(flatData)) {
			const inp = designer.querySelector(`input[name="pointer.${key}"]`);
			if (!inp) continue;
			if (inp.type === 'checkbox') inp.checked = flatData[key];
			else if (inp.type === 'range') {
				inp.value = flatData[key];
				inp.parentNode.querySelector('.range-value').innerText = flatData[key];
			} else inp.value = flatData[key];
		}
	}

	_initControlChooser(inp) {
		inp.addEventListener('focusout', (ev) => {
			this._onSubmit(ev);
			this._focusedControl = null;
			ev.preventDefault();
			ev.stopPropagation();
		});

		inp.addEventListener('click', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();

			if (this._focusedControl !== ev.currentTarget) {
				this._focusedControl = ev.currentTarget;
				return;
			}
			ev.currentTarget.value = this._getMetaKeys(ev) + 'Left Click';
		});

		inp.addEventListener('contextmenu', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();

			if (this._focusedControl !== ev.currentTarget) {
				this._focusedControl = ev.currentTarget;
				return;
			}
			ev.currentTarget.value = this._getMetaKeys(ev) + 'Right Click';
		});

		inp.addEventListener('keydown', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();

			if (this._focusedControl !== ev.currentTarget) {
				this._focusedControl = ev.currentTarget;
				return;
			}
			let key = game.keyboard.getKey(ev);
			if (['Control', 'Shift', 'Alt', 'Meta'].includes(key)) {
				ev.currentTarget.value = key;
				return;
			}
			ev.currentTarget.value = this._getMetaKeys(ev) + game.keyboard.getKey(ev).toUpperCase();
		});
	}

	_getMetaKeys(ev) {
		let keys = [];
		if (ev.shiftKey) keys.push('Shift');
		if (ev.ctrlKey) keys.push('Ctrl');
		if (ev.altKey) keys.push('Alt');
		if (ev.metaKey) keys.push('Meta');
		if (keys.length > 0) return keys.join(' + ') + ' + ';
		return '';
	}

	get canConfigure() {
		return game.user.can('SETTINGS_MODIFY');
	}

	get userData() {
		return mergeObject(PointerSettingsMenu.defaultSettings, game.user.getFlag('pointer', 'settings') || {});
	}

	getData() {
		let data = super.getData();
		data = mergeObject(data, this.userData);

		data.canConfigure = this.canConfigure;
		// data.pixi = Pointer.defaultSettings;
		data.easingMethod = {
			none: 'Linear',
			sine: 'Sine',
			expo: 'Exponential',
			elastic: 'Elastic',
			bounce: 'Bounce',
		};
		data.easingType = {
			in: 'In',
			out: 'Out',
			inOut: 'In and Out',
		};

		data.collection = game.settings.get('pointer', 'collection');
		if (data.canConfigure && !data.collection.length) {
			data.collection = duplicate(this.constructor.defaultCollection);
			game.settings.set('pointer', 'collection', data.collection);
		}

		const userSettings = this.userData;

		let selectedPointer = data.collection.find((e) => e.id === userSettings.pointer);
		if (!userSettings.pointer || !selectedPointer) {
			selectedPointer = data.collection[0];
			userSettings.pointer = selectedPointer.id;
		}
		selectedPointer.selectedAsPointer = true;
		data.pixi = selectedPointer;

		let selectedPing = data.collection.find((e) => e.id === userSettings.ping);
		if (!userSettings.ping || !selectedPing) {
			selectedPing = data.collection[1] || data.collection[0];
			userSettings.ping = selectedPing.id;
		}
		selectedPing.selectedAsPing = true;

		data.isGM = game.user.isGM;
		return data;
	}

	async _updateObject(event, formData) {
		const data = expandObject(formData);
		if (this.canConfigure) {
			// this.pointer.save();
			data.pointer.img = this.pointer.data.img;
			const pointer = new Pointer(data.pointer);
			pointer.save();
		}
		if (event.currentTarget?.closest('.designer')) return;
		let settings = duplicate(this.userData);
		settings = mergeObject(settings, data.user);
		const chooser = this.form.querySelector('.chooser');
		const pingId = chooser.querySelector('input[name="selectedAsPing"]:checked').closest('li').dataset.pointerId;
		settings.ping = pingId;
		const pointerId = chooser.querySelector('input[name="selectedAsPointer"]:checked').closest('li').dataset.pointerId;
		settings.pointer = pointerId;

		await game.user.setFlag('pointer', 'settings', settings);
		this.render();
	}

	/** PIXI STUFF */

	_initDesigner(container) {
		container.querySelectorAll('input, select').forEach((el) => {
			el.addEventListener('input', this._designerInputChange.bind(this));
			// el.addEventListener('change', ev => this.pointer.save());
			el.addEventListener('wheel', (ev) => {
				ev.stopPropagation();
				ev.preventDefault();
			});
		});
		if (this._pixiApp) {
			container.querySelector('.canvas-container').appendChild(this._pixiApp.view);
			return;
		}
		const { stage } = this._initPixiApp(container);

		this._pixiApp.view.addEventListener('click', (ev) => {
			new FilePicker({
				type: 'imagevideo',
				current: this.pointer.data.img || '',
				callback: (path) => {
					this.pointer.update({ img: path });
				},
				top: this.position.top + 40,
				left: this.position.left + 10,
			}).browse(this.pointer.data.img);
		});
		const pointerId = this.userData.pointer;
		const collection = game.settings.get('pointer', 'collection');
		const pointerData = collection.find((e) => e.id === pointerId) || collection[0];
		pointerData.position = new PIXI.Point(this._pixiApp.view.width / 2, this._pixiApp.view.height / 2);

		this.pointer = stage.addChild(new Pointer(pointerData, game.user.id, this.options.gridSize));
	}

	_designerInputChange(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		let udata = {};
		const val =
			ev.currentTarget.type === 'range'
				? Number(ev.currentTarget.value)
				: ev.currentTarget.type === 'checkbox'
				? !!ev.currentTarget.checked
				: ev.currentTarget.value;

		if (ev.currentTarget.type === 'range') {
			const rangevalue = ev.currentTarget.parentNode.querySelector('.range-value');
			rangevalue.innerText = ev.currentTarget.value;
		}
		const prop = ev.currentTarget.name.split('.').slice(1).join('.');
		udata[prop] = val;
		this.pointer.update(udata).then(async () => {
			if (prop === 'name') {
				const pointerData = this.pointer.data;
				await this.render();
				this._selectPointer(pointerData);
			}
		});
	}

	_initPixiApp(container) {
		const pixiOptions = this.options.pixiOptions;

		const app = new PIXI.Application(pixiOptions);
		this._pixiApp = app;
		container.querySelector('.canvas-container').appendChild(app.view);
		app.view.style.cursor = 'pointer';
		const stage = app.stage;
		const grid = app.stage.addChild(new PIXI.Graphics());
		this.grid = grid;
		const gridColor = document.body.classList.contains('dark-mode') ? 0xaaaaaa : 0x666666;
		const gridSize = this.options.gridSize;
		grid.lineStyle(3, gridColor, 0.8);
		const gridLength = 20 * gridSize;
		for (let x = 0; x <= gridLength; x += gridSize) {
			for (let y = 0; y <= gridLength; y += gridSize) {
				grid.moveTo(x, 0).lineTo(x, gridLength).moveTo(0, y).lineTo(gridLength, y);
			}
		}
		grid.position = new PIXI.Point(pixiOptions.width * 0.5, pixiOptions.height * 0.5);
		grid.pivot = new PIXI.Point(gridLength * 0.5, gridLength * 0.5);
		const target = app.stage.addChild(new PIXI.Graphics());
		target.lineStyle(5, 0xcc0000, 1.0);
		const targetSize = gridSize * 0.25;
		const x = pixiOptions.width * 0.5,
			y = pixiOptions.height * 0.5;
		target
			.moveTo(x - targetSize, y - targetSize)
			.lineTo(x + targetSize, y + targetSize)
			.moveTo(x - targetSize, y + targetSize)
			.lineTo(x + targetSize, y - targetSize);

		return {
			stage,
		};
	}
}
