import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import {
  DeleteMarkupRequest,
  Note,
  NotesOnPanoramasInput,
  NotesRepository,
} from '../notes-repository'

export class InMemoryNotesRepository implements NotesRepository {
  private notes: Note[] = []

  async create(note: Note) {
    this.notes.push(note)
  }

  async delete(id: string) {
    this.notes = this.notes.filter((prevNote) => prevNote.id !== id)
  }

  async findById(id: string) {
    const note = this.notes.find((note) => note.id === id)

    return note || null
  }

  async findMany() {
    return this.notes
  }

  async createMany(notes: Note[]) {
    this.notes = this.notes.concat(notes)
  }

  async update(updatedNote: Note) {
    this.notes = this.notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note,
    )
  }

  async createMarkup(input: NotesOnPanoramasInput) {
    const note = this.notes.find((note) => note.id === input.note_id)

    if (!note) {
      throw new ResourceNotFoundError()
    }

    const newMarkup = {
      panorama_id: input.panorama_id,
      yaw: input.yaw,
      pitch: input.pitch,
    }

    const updatedNote: Note = {
      ...note,
      panoramas: [newMarkup].concat(note.panoramas || []),
    }

    this.notes = this.notes.map((note) =>
      note.id === input.note_id ? updatedNote : note,
    )
  }

  async deleteMarkup({ note_id, panorama_id }: DeleteMarkupRequest) {
    this.notes = this.notes.map((note) => {
      if (note.id === note_id) {
        const filteredNotesOnPanorama = note.panoramas?.filter(
          (connection) => connection.panorama_id !== panorama_id,
        )

        return { ...note, panoramas: filteredNotesOnPanorama }
      }

      return note
    })
  }
}
