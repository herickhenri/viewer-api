import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import {
  Coordinates,
  DeleteMarkupRequest,
  Note,
  NotesRepository,
} from '../notes-repository'

export class InMemoryNotesRepository implements NotesRepository {
  public notes: Note[] = []

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

  async createMarkup(coordinates: Coordinates) {
    const note = this.notes.find((note) => note.id === coordinates.note_id)

    if (!note) {
      throw new ResourceNotFoundError()
    }

    const newMarkup = {
      panorama_id: coordinates.panorama_id,
      coord_x: coordinates.coord_x,
      coord_y: coordinates.coord_y,
    }

    const updatedNote = {
      ...note,
      NotesOnPanoramas: [newMarkup].concat(note.NotesOnPanoramas || []),
    }

    this.notes = this.notes.map((note) =>
      note.id === coordinates.note_id ? updatedNote : note,
    )
  }

  async deleteMarkup({ note_id, panorama_id }: DeleteMarkupRequest) {
    this.notes = this.notes.map((note) => {
      if (note.id === note_id) {
        const filteredNotesOnPanorama = note.NotesOnPanoramas?.filter(
          (connection) => connection.panorama_id !== panorama_id,
        )

        return { ...note, NotesOnPanoramas: filteredNotesOnPanorama }
      }

      return note
    })
  }
}
