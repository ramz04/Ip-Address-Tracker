import arrow from './assets/images/icon-arrow.svg'
import background from './assets/images/pattern-bg-desktop.png'
import backgroundMobile from './assets/images/pattern-bg-mobile.png'

function App() {

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
        <div className='header--content'>
          <article className='header--content-wrapper shadow max-w-5xl'>
            <div className='header--content-items'>
              <h2>IP Address</h2>
              <p>192.212.174.101</p>
            </div>
            <div className='header--content-items'>
              <h2>Location</h2>
              <p>Brooklyn, NY 10001</p>
            </div>
            <div className='header--content-items'>
              <h2>Timezone</h2>
              <p>UTC-05:00</p>
            </div>
            <div className='header--content-last'>
              <h2>ISP</h2>
              <p>SpaceX Starlink</p>
            </div>

          </article>
        </div>
      </section>
    </>
  )
}

export default App
