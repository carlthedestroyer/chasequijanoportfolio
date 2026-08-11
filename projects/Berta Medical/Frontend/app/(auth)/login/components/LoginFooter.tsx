import React from 'react'

const LoginFooter = () => {
  return (
    <div id="footer" className="fixed bottom-0 z-50 w-full flex flex-col pointer-events-none">
        {/* Blend */}
        <div className="z-50 bg-gradient-to-t from-black opacity-100 w-full h-18 sm:h-36 pointer-events-none"></div>
        <div className="min-w-full flex flex-col bg-black bg-opacity-100">
            {/* Footer Content */}
            <div id="footer-content" className="pb-6 sm:pb-16 w-[80%] sm:w-7/12 mx-auto bg-black">
                        
                {/* Divider */}
                <div className="border-t border-gray-500 lg:w-full lg:mb-0 lg:text-left py-1 sm:py-3"></div>

                {/* Bottom */}
                <div className="flex justify-center sm:justify-between sm:flex-row sm:space-x-4">
                    <div className="flex flex-col w-max items-center sm:items-start">
                        <p className="text-sm text-gray-500">
                            © 2023 Berta Medical.
                        </p>
                        <p className="text-xs text-gray-500">
                        All rights reserved.
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex space-x-8 pointer-events-auto w-max">
                        <a
                            href="https://twitter.com"
                            className="text-gray-500 hover:text-gray-600 hidden sm:block"
                        >
                        {/* Twitter */}
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" className="w-8 h-8" alt="twitter logo"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginFooter