import { Marker, Popup, useMap } from 'react-leaflet'
import PropTypes from 'prop-types'
import Icon from './Icon'
import { useEffect } from 'react'

function Markerposition({ address }) {

  const position = [address.location.lat, address.location.lng]
  const map = useMap()


  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    })
  }, [map, position])

  return (
    <div>
        <Marker icon={Icon} position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
        </Marker>
    </div>
  )
}

export default Markerposition

Markerposition.propTypes = {
    address: PropTypes.object.isRequired,
}