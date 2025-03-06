import React, { useState } from 'react';

export default function Page() {        
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 -z-10">
          <img className="object-cover w-full h-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png" alt="" />
      </div>

      <section className="relative py-12 sm:py-16 lg:py-8 lg:pb-36">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-8">
                  <div className="lg:pl-12">
                      <div className="text-center lg:text-left">
                          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">A special credit card made for Developers.</h1>
                          <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.</p>

                          <form action="#" method="POST" className="bg-white mt-8 sm:mt-10">
                              <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-900 sm:focus-within:border-gray-900">
                                  <input
                                      type="email"
                                      name=""
                                      id=""
                                      placeholder="Enter email address"
                                      className="block w-full px-4 py-4 text-gray-900 placeholder-gray-900 bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                                  />
                                  <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                                      <button type="submit" className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-gray-600 font-pj hover:bg-gray-600">Get Free Card</button>
                                  </div>
                              </div>
                          </form>
                      </div>

                      <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                          <div className="flex items-center">
                              <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">2943</p>
                              <p className="ml-3 text-sm text-gray-900 font-pj">Cards<br />Delivered</p>
                          </div>

                          <div className="hidden sm:block">
                              <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                                  <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                                  <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                                  <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                                  <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                              </svg>
                          </div>

                          <div className="flex items-center">
                              <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">$1M+</p>
                              <p className="ml-3 text-sm text-gray-900 font-pj">Transaction<br />Completed</p>
                          </div>
                      </div>
                  </div>

                  <div>
                      <img className="w-full" src="https://d33wubrfki0l68.cloudfront.net/a78a55b3add0dc26d3587d02ecc23bebc28bf5f8/67091/images/hero/5.2/illustration.png" alt="" />
                  </div>
              </div>
          </div>
      </section>
    </div>
  )
}