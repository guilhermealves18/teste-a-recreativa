import type { Activity } from "./activity.type";
import type { Evaluation } from "./evaluation.type";
import type { Objective } from "./objective.type";

export interface LessonPlan {
  id?: string;
  title?: string;
  filePath: string;
  uploadedFilePath: string;
  createdAt?: string;
  Activities?: Activity[];
  Evaluations?: Evaluation[];
  Objectives?: Objective[];
}