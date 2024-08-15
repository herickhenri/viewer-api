import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Note (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to update note', async () => {
    const id = '12345678'

    await request(app.server).post('/note').send({
      author: 'Jhon',
      created_at: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
    })

    const response = await request(app.server).put(`/note/${id}`).send({
      author: 'New name',
      created_at: new Date(),
      description: 'new description',
      equipment_tag: 'I-1502-BB-300',
      id,
      opportunity: 1,
    })

    expect(response.statusCode).toEqual(204)
  })
})
