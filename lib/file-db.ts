import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'db')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// File paths for each collection
const getFilePath = (collection: string) => path.join(DATA_DIR, `${collection}.json`)

// Read data from file
function readCollection<T>(collection: string): T[] {
  const filePath = getFilePath(collection)
  try {
    if (!fs.existsSync(filePath)) {
      return []
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${collection}:`, error)
    return []
  }
}

// Write data to file
function writeCollection<T>(collection: string, data: T[]): void {
  const filePath = getFilePath(collection)
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing ${collection}:`, error)
    throw error
  }
}

// Generate ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Database operations
export const fileDb = {
  // Find all
  findMany<T>(collection: string, filter?: (item: T) => boolean): T[] {
    const data = readCollection<T>(collection)
    if (filter) {
      return data.filter(filter)
    }
    return data
  },

  // Find one
  findFirst<T>(collection: string, filter: (item: T) => boolean): T | null {
    const data = readCollection<T>(collection)
    return data.find(filter) || null
  },

  // Find unique (by id or unique field)
  findUnique<T>(collection: string, where: { id?: string; [key: string]: any }): T | null {
    const data = readCollection<T>(collection)
    if (where.id) {
      return data.find((item: any) => item.id === where.id) || null
    }
    // Find by any unique field
    const key = Object.keys(where)[0]
    const value = where[key]
    return data.find((item: any) => item[key] === value) || null
  },

  // Create
  create<T extends { id?: string }>(collection: string, data: Omit<T, 'id'>): T {
    const items = readCollection<T>(collection)
    // We know this matches T because all our stored models follow this shape
    const newItem = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as T
    items.push(newItem)
    writeCollection(collection, items)
    return newItem
  },

  // Update
  update<T extends { id?: string }>(collection: string, where: { id: string }, data: Partial<T>): T | null {
    const items = readCollection<T>(collection)
    const index = items.findIndex((item: any) => item.id === where.id)
    if (index === -1) return null
    
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    writeCollection(collection, items)
    return items[index]
  },

  // Update many
  updateMany<T>(collection: string, where: (item: T) => boolean, data: Partial<T>): number {
    const items = readCollection<T>(collection)
    let count = 0
    items.forEach((item: any, index: number) => {
      if (where(item)) {
        items[index] = {
          ...item,
          ...data,
          updatedAt: new Date().toISOString(),
        }
        count++
      }
    })
    if (count > 0) {
      writeCollection(collection, items)
    }
    return count
  },

  // Delete
  delete(collection: string, where: { id: string }): boolean {
    const items = readCollection<any>(collection)
    const filtered = items.filter((item: any) => item.id !== where.id)
    if (filtered.length < items.length) {
      writeCollection(collection, filtered)
      return true
    }
    return false
  },

  // Count
  count<T>(collection: string, filter?: (item: T) => boolean): number {
    const data = readCollection<T>(collection)
    if (filter) {
      return data.filter(filter).length
    }
    return data.length
  },
}


