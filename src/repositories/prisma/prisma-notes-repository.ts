import { prisma } from '@/lib/prisma'
import {
  Coordinates,
  DeleteMarkupRequest,
  Note,
  NoteInput,
  NotesRepository,
} from '../notes-repository'

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
            coord_x: true,
            coord_y: true,
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
            coord_x: true,
            coord_y: true,
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

  async createMarkup(coordinates: Coordinates) {
    await prisma.notesOnPanoramas.create({
      data: coordinates,
    })
  }

  async deleteMarkup({ note_id, panorama_id }: DeleteMarkupRequest) {
    await prisma.notesOnPanoramas.delete({
      where: {
        note_id_panorama_id: { note_id, panorama_id },
      },
    })
  }
}
