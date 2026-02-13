/**
 * Shared trial types template file.
 *
 * Purpose:
 * - Keep shared interfaces/types for all trial modules in one place.
 * - Update these types as your trial data/layout structures evolve.
 */
export interface TrialBuildOptions {
  trialIndex: number;
  condition: number;
  itemCount: number;
  isPractice: boolean;
}

export interface StimulusSpec {
  id: string;
  value: string;
  condition: number;
}

export type PsychophysicsObject = {
  obj_type?: string;
  [key: string]: unknown;
};

export interface TrialBundle {
  options: TrialBuildOptions;
  stimuli: StimulusSpec[];
  psychophysicsObjects: PsychophysicsObject[];
}
