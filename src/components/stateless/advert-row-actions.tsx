import OtherActionMenu from "./other-actions-menu";

function AdvertRowActions() {
  return (
    <OtherActionMenu
      actionArr={[
        { text: "Edit", type: "default", onClick: () => {} },
        { text: "Delete Advert", type: "destructive", onClick: () => {} },
      ]}
    />
  );
}

export default AdvertRowActions;
