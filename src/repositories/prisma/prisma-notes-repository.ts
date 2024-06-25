import { prisma } from '@/lib/prisma'
import { Note, NotesRepository } from '../notes-repository'

export class PrismaNotesRepository implements NotesRepository {
  async create(note: Note) {
    await prisma.note.create({
      data: note,
    })
  }

  async delete(id: string) {
    await prisma.note.delete({
      where: { id },
    })
  }

  async findById(id: string) {
    const note = await prisma.note.findUnique({
      where: { id },
    })

    return note
  }

  async findMany() {
    const notes = await prisma.note.findMany()

    return notes
  }

  async createMany(notes: Note[]) {
    await prisma.note.createMany({
      data: notes,
    })
  }
}
