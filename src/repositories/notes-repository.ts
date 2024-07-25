export type Note = {
  createdAt: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: number
  equipmentId: string | null
  NotesOnPanoramas?: {
    panorama_id: string
    coord_x: number
    coord_y: number
  }[]
}

export type NoteInput = {
  createdAt: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: number
  equipmentId: string | null
}

export type Coordinates = {
  panorama_id: string
  note_id: string
  coord_x: number
  coord_y: number
}

export type DeleteMarkupRequest = {
  note_id: string
  panorama_id: string
}

export interface NotesRepository {
  create(note: Note): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note | null>
  findMany(): Promise<Note[] | null>
  createMany(notes: Note[]): Promise<void>
  update(updatedNote: NoteInput): Promise<void>
  createMarkup(coordinates: Coordinates): Promise<void>
  deleteMarkup({ note_id, panorama_id }: DeleteMarkupRequest): Promise<void>
}
