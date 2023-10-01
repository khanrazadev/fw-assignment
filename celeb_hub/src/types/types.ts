export type celebsData = {
  first: string;
  last: string;
  dob: string;
  picture: string;
  description: string;
  country: string;
  gender: string;
};
export type CelebDetailsProps = {
  celeb: celebsData[];
  editCelebDetails: boolean;
  activeCelebTab: string;
  index: string;
  setEditCelebDetails: (value: boolean) => void;
};
export type CelebAccordionProps = {
  celebsData: celebsData[];
};

export interface CustomInputProps {
  value: string | number;
  onChange: (value: string) => void;
}
