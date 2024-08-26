type MissionType = {
  id: string;
  label: string;
  beginDate: string;
  endDate: string;
  missionType: string;
  freelance: FreelanceType;
};

type FreelanceType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type { MissionType, FreelanceType };
