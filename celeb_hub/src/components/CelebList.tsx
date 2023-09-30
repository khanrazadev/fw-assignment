import { CelebAccordion } from "./CelebAccordion";
import celebsData from "../utils/celebrities.json";
export const CelebList = () => {
  return (
    <div className="flex flex-col gap-4">
      <CelebAccordion celebsData={celebsData} />
    </div>
  );
};
