export type Note = {
  createdAt: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: number
}

export interface NotesRepository {
  create(note: Note): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note | null>
  findMany(): Promise<Note[] | null>
  createMany(notes: Note[]): Promise<void>
}
