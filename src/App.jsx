import arrow from './assets/images/icon-arrow.svg'
import background from './assets/images/pattern-bg-desktop.png'
import backgroundMobile from './assets/images/pattern-bg-mobile.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Icon from './components/Icon'
import { useState, useEffect } from 'react'

function App() {

  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState('')

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ki1y91b0731ykqhC125KuazJSdgMx&ipAddress=8.8.8.8`)
        const data = await res.json()
        setAddress(data)
        console.log(data)
      }
      getInitialData()
    }
    catch (e) {
        console.trace(e)
    }
  }, [])

  return (
    <>
      <section className='App'>
        <div className='header' >
          <picture>
            <source media='(min-width: 1024px)' srcSet={background} />
            <img src={ backgroundMobile } className='image' alt="Background" />
          </picture>
        </div>
        <article className='header--search'>
           <h1>IP Address Tracker</h1>
           <form>
            <input id="ipaddress" name="ipaddress" type="text" placeholder="Search for any IP address or domain" />
            <button type="submit">
              <img src={arrow} alt="" />
            </button>
           </form>
        </article>
        {address &&
        <>
            <div className='header--content'>
              <article className='header--content-wrapper shadow max-w-5xl'>
                <div className='header--content-items'>
                  <h2>IP Address</h2>
                  <p>{address.ip}</p>
                </div>
                <div className='header--content-items'>
                  <h2>Location</h2>
                  <p>{address.location.city}, {address.location.region}</p>
                </div>
                <div className='header--content-items'>
                  <h2>Timezone</h2>
                  <p>UTC-{address.location.timezone}</p>
                </div>
                <div className='header--content-last'>
                  <h2>ISP</h2>
                  <p>{address.isp}</p>
                </div>
              </article>
            </div>
            <MapContainer 
            center={[address.location.lat, address.location.lng]} 
            zoom={13} 
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100vw',}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={Icon} position={[address.location.lat, address.location.lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
        </>}
      </section>
    </>
  )
}

export default App
