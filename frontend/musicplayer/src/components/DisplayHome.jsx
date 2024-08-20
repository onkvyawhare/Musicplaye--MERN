import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import { albumsData } from '../assets/frontend-assets/assets'
import { songsData } from '../assets/frontend-assets/assets'
import SongsItem from './SongsItem'

const DisplayHome = () => {
  return (
    <>
     <Navbar/> 
     <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item, index) => (<AlbumItem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today&apos;s biggest hits</h1>
                <div className="flex overflow-auto">
                    {songsData.map((item, index) => (<SongsItem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />))}
                </div>
            </div>
    </>
  )
}

export default DisplayHome
