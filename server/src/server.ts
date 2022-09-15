import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesHourString } from './utils/convertMinutesHourString';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173/'
}))

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }

        }
    })


    return res.json(games);
})

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const body: any = req.body;


    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discordId: body.discordId,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return res.status(201).json(ad);
})

app.get('/games/:id/ads', async(req, res) => {
    const gamesId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
        },
        where:{
            gameId: gamesId,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return res.json(ads.map(ad=>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(', '),
            hourStart: convertMinutesHourString(ad.hourStart),
            hourEnd: convertMinutesHourString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async(req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discordId: true,
        },
        where: {
            id: adId,
        }
    })

    return res.json({
        discordId: ad.discordId,
    })
})

app.listen(8080, () => { console.log('listening on port 8080') })