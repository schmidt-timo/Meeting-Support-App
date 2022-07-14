import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  onClose: () => void;
};

const FullAgenda = ({ onClose }: Props) => {
  return (
    <SubPageLayout title="Full agenda" onClose={onClose}>
      <div />
    </SubPageLayout>
  );
};

export default FullAgenda;
