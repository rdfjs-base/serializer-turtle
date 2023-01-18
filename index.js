import Sink from '@rdfjs/sink'
import SerializerStream from './lib/SerializerStream.js'
import TurtleSerializer from './lib/TurtleSerializer.js'

class Serializer extends Sink {
  constructor (options) {
    super(SerializerStream, options)
  }

  transform (quads) {
    return TurtleSerializer.serialize(quads, this.options).join('')
  }
}

export default Serializer
