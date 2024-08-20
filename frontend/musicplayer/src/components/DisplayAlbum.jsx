import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData,songsData, assets } from '../assets/frontend-assets/assets'
import { PlayerContext } from '../Context/PlayerContext'

const DisplayAlbum = () => {

    const{id}=useParams();
    const albumData=albumsData[id]; 
    const{playWithId}=useContext(PlayerContext)
  return (
    <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className="flex flex-col gap-3">
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-2 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='flex'>
                        <div>
                            <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="spotify_logo" />
                            <b className='mr-2'>Spotify</b>
                        </div>
                        <div className='text-gray-300'>
                            <span>• 1,323,154 likes</span>
                            <b> • 50 songs </b>
                            <span>- about 2 hr. 30 min.</span>
                        </div>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-[0.5fr_2fr_2fr_0.5fr] mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>#<b className='mr-4'>Title</b></p>
                <p>Name</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="clock_icon" />
            </div>
            <hr />

            {
                songsData.map((item,index)=>(
                    <div onClick={()=> playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center'>
                        <p className='text-white'>
                          <b className='mr-4 text-[#a7a7a7]'>
                            {index+1}
                          </b>
                          <img className='inline w-10 mr-5' src={item.image} alt=''/>
                          {item.name}

                        </p>
                        <p className='text-[15px] font-bold'>{item.name}</p>
                        <p className='text-[15px] hidden sm:block'>5 days ago</p>
                        <p className='text-[15px] text-center'>{item.duration}</p>


                    
                    </div>
                ))
            }
            
             
        </>
    
  )
}

export default DisplayAlbum
