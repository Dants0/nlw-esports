import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import logoImg from './assets/Logo.svg'
import GameBanner from './components/GameBanner'
import BannerAd from './components/BannerAd'

interface Game {
  id: string,
  titulo: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])//variavel game é um array de obj Game


  //se nao passar nenhuma variavel para o array de dependencias o codigo executa uma unica vez durante todo o uso, se renderizar, ainda assim ele executa uma unica vez
  useEffect(() => {
    fetch('http://localhost:8080/games')
      .then((response) => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>


      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              titleGame={game.titulo}
              adsCount={game._count.ads} />
          )
        })}
      </div>
      <Dialog.Root>
        <BannerAd />



        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor="game">Qual o game?</label>
                  <input id="game" type="text" placeholder="Selecione o game que deseja jogar" />
                </div>
                <div>
                  <label htmlFor="name">Seu nome ou (nickname)</label>
                  <input id="name" type="text" placeholder="Como te chamam dentro do game?" />
                </div>
                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <input id="discord" type="text" placeholder="Exemplo#0000" />
                  </div>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App
