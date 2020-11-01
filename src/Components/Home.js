import React from 'react'
import '../css/Home.css'
import Product from './Product'

export default function Home() {
    return (
        <div className='home'>
            <div className='home_container'>
                <img 
                className='home_banner' 
                src='https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWPhase1/2_Desktop-Hero_Rec_1500x600._CB419213952_.jpg'
                alt='' />

                <div className='home_row'>
                    <Product 
                    title='Saregama Carvaan Hindi - Portable Music Player with 5000 Preloaded Songs, FM/BT/AUX (Oak Wood Brown)'
                    price={85.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/712PAzksiRL._SL1484_.jpg'
                    rating={5} />
                    <Product 
                    title='Apple iPhone 11 (64GB) - Purple (Includes EarPods, Power Adapter)'
                    price={699.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51oXVi%2BZhhL._SL1024_.jpg'
                    rating={5} />
                </div>

                <div className='home_row'>
                    <Product 
                    title='Relish Mens Black Stainless Steel Case Leather Strap Day and Date Wrist Watch for Boys and Mens | RE-BT976DD'
                    price={15.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/71t1R%2Bx2iyL._UL1500_.jpg'
                    rating={3} />
                    <Product 
                    title='boAt Airdopes 441 TWS Ear-Buds with IWP  Technology,  Immersive Audio, Up to 30H  Total Playback'
                    price={23.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/61rlb0IYNuL._SL1500_.jpg'
                    rating={4} />
                    <Product 
                    title='POLESTAR XPLORE 55 ltrs with Rain Cover Rucksack Hiking Backpack'
                    price={9.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/910go3oR3-L._SL1500_.jpg'
                    rating={5} />
                </div>

                <div className='home_row'>
                <Product 
                    title='Lenovo D24-20 23.8" Work+Play Near Edgeless Monitor 1920x1080 FHD VA Panel 178° Angle,LEDbacklit,75Hz 4ms Response, AMD FreeSync, 1HDMI, 1VGA Port, AudioOut, VESA Mount, TÜV Rheinland Low Blue Light'
                    price={299.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/518eJr6dEtL._SL1112_.jpg'
                    rating={4} />
                </div>
            </div>
        </div>
    )
}
