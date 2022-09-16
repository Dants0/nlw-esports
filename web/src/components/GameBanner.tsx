interface GameBannerProps{
    bannerUrl: string;
    titleGame: string;
    adsCount: number;
}

import React from 'react'

const GameBanner = (props: GameBannerProps) => {
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{props.titleGame}</strong>
                <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
            </div>
        </a>
    )
}

export default GameBanner