import React from 'react'
import SAL from '../Logos/SAL';
import SOL from '../Logos/SOL';

const footerNavigation = {
    products: [
      { name: 'ELECTRIKFUM S.R.L', href: '#' },
      { name: 'CUI:47252845', href: '#' },
      { name: 'Adresă: Timișoara', href: '#' },
      { name: 'Telefon: +40 720 981 443', href: '#' },
      { name: 'Program L-V: 9-17', href: '#' },
      { name: 'Email: info@electrikfum.ro', href: '#' },
    ],
    utils: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Informații livrare', href: '/delivery' },
      { name: 'Politica GPDR', href: '/gpdr' },
      { name: 'Termeni și condiții', href: '/tac' },
    ],
    customerService: [
      { name: 'Setări Cont', href: '/account' },
      { name: 'Istoric Comenzi', href: '/orders' },
    ],
  }

  const year = new Date().getFullYear();

const Footer = () => {
    return(
        <>
        <footer aria-labelledby="footer-heading" className="bg-neutral-900 font-satoshi">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-5">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              {/* Image section */}
              {/*<div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1 text-white">
                <p>Electrik <span className="font-satoshimedium">Fum</span></p>
              </div> */
              }
              {/* Sitemap sections */}
              
              <div className="mt-1 col-span-3 grid grid-cols-2 gap-9 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-1 lg:col-span-8">
               
                <div className="grid grid-cols-1 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                  <p className="text-2xl py-5 text-neutral-100">Electrik <span className="font-satoshimedium">Fum</span></p>
                    <h3 className="text-sm font-medium text-neutral-100">INFORMAȚII</h3>
                    <ul role="list" className="mt-6 space-y-1 font-satoshimedium">
                      {footerNavigation.products.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a  className="text-gray-500 ">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="py-[4.5rem]">
                    <h3 className="text-sm font-medium text-neutral-100">LINK-URI UTILE</h3>
                    <ul role="list" className="mt-6 space-y-1">
                      {footerNavigation.utils.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="py-[4.5rem]">
                  <h3 className="text-sm font-medium text-neutral-100"> CONTUL MEU</h3>
                  <ul role="list" className="mt-6 space-y-1">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment section */}
              <div className="space-y-0 lg:space-y-6 items-center flex-col justify-items-center mt-0 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 className="text-sm font-medium text-gray-100"></h3>
                <img
                  src="../../../netopia.png"
                  alt=""
                  className="h-18 w-auto"
                />
                <div className=' space-y-3 px-28'>
                  <a href="https://anpc.ro/ce-este-sal/">
                    <SAL  />
                  </a>
                  <a href="https://ec.europa.eu/consumers/odr">
                    <SOL />
                  </a>
                </div>
              
              </div>
            </div>
          </div>

          <div className="py-10 text-left">
            <p className="text-sm text-neutral-100">&copy; {year} Electrik Fum SRL, Toate drepturile Rezervate.</p>
          </div>
        </div>
      </footer>
        </>
    )
}

export default Footer;