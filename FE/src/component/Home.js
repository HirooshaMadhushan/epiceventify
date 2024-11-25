import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import gallery from './gallery'
import completed from './completed'
import pending from './pending'
import eventdetails from './eventdetails'

import Appstart from '../Appstart'

export default function Home() {
  return (
    <div>
        
        <BrowserRouter>
            <Routes>

                <Route index Component={Appstart} />
                {/* <Route path="/completed" Component={completed} />
                <Route path="/pending" Component={pending} />
                <Route path='/eventdetails/:id' Component={eventdetails} /> */}

                
            </Routes>
        </BrowserRouter>

    </div>
  )
}
