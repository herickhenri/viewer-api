import { prisma } from '@/lib/prisma'
import { Note, NoteInput, NotesRepository } from '../notes-repository'

export class PrismaNotesRepository implements NotesRepository {
  async create(note: NoteInput) {
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
      include: {
        NotesOnPanoramas: {
          select: {
            panorama_id: true,
          },
        },
      },
    })

    return note
  }

  async findMany() {
    const notes = await prisma.note.findMany({
      include: {
        NotesOnPanoramas: {
          select: {
            panorama_id: true,
          },
        },
      },
    })

    return notes
  }

  async createMany(notes: Note[]) {
    await prisma.note.createMany({
      data: notes,
    })
  }

  async update(updatedNote: NoteInput) {
    await prisma.note.update({
      where: { id: updatedNote.id },
      data: updatedNote,
    })
  }
}
