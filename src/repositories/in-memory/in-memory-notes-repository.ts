import { Coordinates, Note, NotesRepository } from '../notes-repository'

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
}
