import { Location } from "../../models/Location";
import { Speaker } from "../../models/Speaker";
import { Schedule, Session } from "../../models/Schedule";
import { Task } from "../../models/Task";
import { Topic } from "../../models/Topic";
import { RelaxActivity } from "../../models/RelaxActivity";
import { InspirationCategory } from "../../models/Inspirations";
export interface ConfState {
  tasks: Task[];
  topics: Topic[];
  inspirations: InspirationCategory[];
  relaxActivities: RelaxActivity[];
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
