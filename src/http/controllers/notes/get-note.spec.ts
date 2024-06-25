import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Note (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get note', async () => {
    const id = '12345678'

    await request(app.server).post('/note').send({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
    })

    const response = await request(app.server).get(`/note/${id}`)
    expect(response.statusCode).toEqual(200)
  })
})
