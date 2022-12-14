import { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import './styles/main.css'
import logoImg from './assets/Logo.svg'
import GameBanner from './components/GameBanner'
import BannerAd from './components/BannerAd'
import { Check, GameController } from 'phosphor-react'
import { Input } from './components/Form/InputModal'

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
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)


  //se nao passar nenhuma variavel para o array de dependencias o codigo executa uma unica vez durante todo o uso, se renderizar, ainda assim ele executa uma unica vez
  useEffect(() => {
    axios('http://localhost:8080/games')
      .then(res => {
        setGames(res.data)
      })
  }, [])

  async function handleSendForm(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData)

    console.log(data)

    if(!data.name){
      return 1;
    }

    try{
      await axios.post(`http://localhost:8080/games/${data.game}/ads`,{
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discordId: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      console.log(data.game)
      alert('Sucesso ao criar anúncio')
    }catch(err){
      console.log(err);
      alert('Erro ao criar anúncio')
    }
  }

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

            <form className="mt-8 flex flex-col gap-4" onSubmit={handleSendForm}>
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select defaultValue="" name="game" id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none">
                  <option disabled value=""></option>
                  {games.map(game => {
                    return (
                      <option key={game.id} value={game.id}>{game.titulo}</option>
                    )
                  })}



                  Selecione o game que deseja jogar

                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome ou (nickname)</label>
                <Input name='name' id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu discord?</label>
                  <Input name="discord" id="discord" type="text" placeholder="Exemplo#0000" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <ToggleGroup.Root type="multiple" className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
                    <ToggleGroup.Item value='0' title="Domingo" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : ''}`}>D</ToggleGroup.Item>
                    <ToggleGroup.Item value='1' title="Segunda" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value='2' title="Terça" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : ''}`}>T</ToggleGroup.Item>
                    <ToggleGroup.Item value='3' title="Quarta" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : ''}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value='4' title="Quinta" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : ''}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value='5' title="Sexta" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value='6' title="Sabado" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                  </ToggleGroup.Root>

                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                    <Input name='hourEnd' id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex gap-2 text-sm text-white items-center">
                <Checkbox.Root
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked == true) {
                      setUseVoiceChannel(true);
                    }
                    else {
                      setUseVoiceChannel(false);
                    }
                  }}
                  className='w-6 h-6 rounded bg-zinc-900 flex justify-center items-center'>
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz?
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold  hover:bg-zinc-600'>
                  Cancelar
                </Dialog.Close >
                <button type="submit" className='px-5 h-12 rounded-md font-semibold bg-violet-500 flex gap-3 items-center hover:bg-violet-600'>
                  <GameController className='w-8 h-7' />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
