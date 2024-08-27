import { FreelanceType } from "./freelance";

type MissionType = {
  id: number;
  label: string;
  beginDate: string;
  endDate: string;
  missionType: string;
  freelance: FreelanceType;
};

export type { MissionType };
