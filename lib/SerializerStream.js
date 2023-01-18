import { Readable } from 'readable-stream'
import chunks from 'stream-chunks/chunks.js'
import TurtleSerializer from './TurtleSerializer.js'

class SerializerStream extends Readable {
  constructor (input, { base, prefixes = new Map() } = {}) {
    super({
      objectMode: true,
      read: () => {}
    })

    this._init(input, { base, prefixes })
  }

  async _init (input, { base, prefixes }) {
    try {
      input.on('prefix', (prefix, namespace) => prefixes.set(prefix, namespace))

      const quads = await chunks(input)

      TurtleSerializer.serialize(quads, { base, output: this, prefixes })

      this.push(null)
    } catch (err) {
      this.destroy(err)
    }
  }
}

export default SerializerStream
