export type celebsTypes = {
  id: number;
  first: string;
  last: string;
  dob: string;
  picture: string;
  description: string;
  country: string;
  gender: string;
};
export type CelebDetailsProps = {
  celeb: celebsTypes[];
  editCelebDetails: boolean;
  activeCelebTab: string;
  index: string;
  setEditCelebDetails: (value: boolean) => void;
};
export type CelebAccordionProps = {
  celebsData: celebsTypes[];
};

export interface CustomInputProps {
  value: string | number;
  onChange: (value: string) => void;
}
