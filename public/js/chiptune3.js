/*
	chiptune3 (worklet version) - patched for <script> loading
	Source: npm chiptune3, only export+import.meta.url changed
*/

const defaultCfg = {
	repeatCount: -1,
	stereoSeparation: 100,
	interpolationFilter: 0,
	context: false,
}

class ChiptuneJsPlayer {
	constructor(cfg) {
		this.config = {...defaultCfg, ...cfg}

		if (this.config.context) {
			if (!this.config.context.destination) {
				throw('ChiptuneJsPlayer: This is not an audio context')
			}
			this.context = this.config.context
			this.destination = false
		} else {
			this.context = new AudioContext()
			this.destination = this.context.destination
		}
		delete this.config.context

		this.gain = this.context.createGain()
		this.gain.gain.value = 1

		this.handlers = []

		this.context.audioWorklet.addModule('/js/chiptune3.worklet.js')
		.then(()=>{
			this.processNode = new AudioWorkletNode(this.context, 'libopenmpt-processor', {
				numberOfInputs: 0,
				numberOfOutputs: 1,
				outputChannelCount: [2]
			})
			this.processNode.port.onmessage = this.handleMessage_.bind(this)
			this.processNode.port.postMessage({cmd:'config', val:this.config})
			this.fireEvent('onInitialized')

			this.processNode.connect(this.gain)
			if (this.destination) this.gain.connect(this.destination)
		})
		.catch(e=>console.error(e))
	}

	handleMessage_(msg) {
		switch (msg.data.cmd) {
			case 'meta':
				this.meta = msg.data.meta
				this.duration = msg.data.meta.dur
				this.fireEvent('onMetadata', this.meta)
				break
			case 'pos':
				this.currentTime = msg.data.pos
				this.order = msg.data.order
				this.pattern = msg.data.pattern
				this.row = msg.data.row
				this.fireEvent('onProgress', msg.data)
				break
			case 'end':
				this.fireEvent('onEnded')
				break
			case 'err':
				this.fireEvent('onError', {type: msg.data.val})
				break
			case 'fullAudioData':
				this.fireEvent('onFullAudioData', msg.data)
				break
			default:
				console.log('Received unknown message',msg.data)
		}
	}

	fireEvent(eventName, response) {
		const handlers = this.handlers
		if (handlers.length) {
			handlers.forEach(function (handler) {
				if (handler.eventName === eventName) {
					handler.handler(response)
				}
			})
		}
	}
	addHandler(eventName, handler) { this.handlers.push({eventName: eventName, handler: handler}) }
	onInitialized(handler) { this.addHandler('onInitialized', handler) }
	onEnded(handler) { this.addHandler('onEnded', handler) }
	onError(handler) { this.addHandler('onError', handler) }
	onMetadata(handler) { this.addHandler('onMetadata', handler) }
	onProgress(handler) { this.addHandler('onProgress', handler) }
	onFullAudioData(handler) { this.addHandler('onFullAudioData', handler) }

	postMsg(cmd, val) {
		if (this.processNode)
			this.processNode.port.postMessage({cmd:cmd,val:val})
	}
	load(url) {
		fetch(url)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => this.play(arrayBuffer))
		.catch(e=>{this.fireEvent('onError', {type: 'Load'})})
	}
	play(val) { this.postMsg('play', val) }
	stop() { this.postMsg('stop') }
	pause() { this.postMsg('pause') }
	unpause() { this.postMsg('unpause') }
	togglePause() { this.postMsg('togglePause') }
	setRepeatCount(val) { this.postMsg('repeatCount', val) }
	setPitch(val) { this.postMsg('setPitch', val) }
	setTempo(val) { this.postMsg('setTempo', val) }
	setPos(val) { this.postMsg('setPos', val) }
	setOrderRow(o,r) { this.postMsg('setOrderRow', {o:o,r:r}) }
	setVol(val) { this.gain.gain.value = val }
	selectSubsong(val) { this.postMsg('selectSubsong', val) }
	seek(val) { this.setPos(val) }
	getCurrentTime() { return this.currentTime }
	decodeAll(ab) { this.postMsg('decodeAll', ab) }
}

window.ChiptuneJsPlayer = ChiptuneJsPlayer;
