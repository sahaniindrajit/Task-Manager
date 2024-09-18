import { z } from 'zod';

// Enum Status
export const StatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

// Enum Priority
export const PrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
