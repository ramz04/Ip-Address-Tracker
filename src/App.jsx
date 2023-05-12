import arrow from './assets/images/icon-arrow.svg'
import background from './assets/images/pattern-bg-desktop.png'
import backgroundMobile from './assets/images/pattern-bg-mobile.png'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import Markerposition from './components/Markerposition'

function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState('')
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ki1y91b0731ykqhC125KuazJSdgMx&ipAddress=${ipAddress}`)
        const data = await res.json()
        setAddress(data)
      }
      getInitialData()
    }
    catch (e) {
        console.trace(e)
    }
  }, [])

  const getEnteredData = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=
      at_ki1y91b0731ykqhC125KuazJSdgMx
      &${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    )
    const data = await res.json()
    setAddress(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getEnteredData()
    setIpAddress("")
  }

  

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
           <form onSubmit={handleSubmit} autoComplete='off'>
            <input id="ipaddress" name="ipaddress" type="text" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="Search for any IP address or domain" />
            <button type="submit">
              <img src={arrow}  alt="" />
            </button>
           </form>
        
            {address &&
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
              }
          </article>
          {address &&
            <MapContainer 
            center={[address.location.lat, address.location.lng]} 
            zoom={13} 
            scrollWheelZoom={false}
            style={{ height: '100vh', width: '100vw'}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markerposition address={address}/>
            </MapContainer>
          }
      </section>
    </>
  )
}

export default App
