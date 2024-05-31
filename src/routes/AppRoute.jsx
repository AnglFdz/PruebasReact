import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom'
import Principal from '../components/Principal'


function AppRoute() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {
                    <Route path='/' element={<Outlet/>}>
                         <Route path='/' element={<>Principal</>}/>
                        <Route path='home' element={<Principal/>}/>
                    </Route>
                },
                {

                }
            </>
        ),
    )
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoute
