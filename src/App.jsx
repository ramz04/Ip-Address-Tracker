import arrow from './assets/images/icon-arrow.svg'
import background from './assets/images/pattern-bg-desktop.png'
import backgroundMobile from './assets/images/pattern-bg-mobile.png'

function App() {

  return (
    <>
      <section className='App'>
        <div className='header' >
          <picture>
            <source media='min-width: 1024px' srcSet={background} />
            <img src={ backgroundMobile } className='image' alt="Background" />
          </picture>
        </div>
        <article className='header--content'>
           <h1>IP Address Tracker</h1>
           <form>
            <input id="ipaddress" name="ipaddress" type="text" placeholder="Search for any IP address or domain" />
            <button type="submit">
              <img src={arrow} alt="" />
            </button>
           </form>
        </article>
      </section>
    </>
  )
}

export default App
