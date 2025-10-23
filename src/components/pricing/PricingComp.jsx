import React from "react";
import EnvelopeImage from "../../assets/images/envelope.png";
import { templates } from "@/TemplateData";
import { useSelector } from "react-redux";
import SecureCanvasImage from "../SecureCanvaImage";
import { Button } from "../ui/button";
import { LuImageDown } from "react-icons/lu";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import { Badge } from "../ui/badge";

const PricingComp = () => {
  const templateId = useSelector((state) => state.stage.templateId);
  const stageImage = useSelector((state) => state.stage.currentStage);
  const stageWidth = useSelector((state) => state.stage.templateWidth);
  const stageHeight = useSelector((state) => state.stage.templateHeight);
  const templateData = templates.filter(
    (val) => val.id == templateId && templateId
  );
  const data = templateData[0];

  const includedData = [
    {
      name: "Download image",
      icon: <LuImageDown />,
    },
    {
      name: "Download PDF",
      icon: <MdOutlinePictureAsPdf />,
    },
    {
      name: "Share",
      icon: <MdOutlineShare />,
    },
  ];

  return (
    <div className="w-full h-[80vh] mt-30 flex">
      <div className="w-[70%] h-full flex items-center justify-center">
        <div
          className={`w-full h-[700px] rounded-xl ${data.backgroundColor} shadow-md flex items-center justify-center`}
        >
          <img src={EnvelopeImage} className="rotate-90 w-[600px] h-auto" />
          <SecureCanvasImage src={stageImage} />
        </div>
      </div>
      <div className="w-[30%] p-10 h-full rounded-xl">
        <h1 className="text-3xl font-semibold">{data.name}</h1>
        <h2 className="capitalize text-lg mt-2">{data.categorie} Invitation</h2>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mt-2">
            Size: {stageWidth} x {stageHeight}
          </h2>
          <Badge className={"capitalize text-md"}>{data.term}</Badge>
        </div>
        <Button className="w-full py-6 text-lg mt-4 rounded-full">Make it yours</Button>
        <div className="border p-5 mt-6 rounded-xl">
          <h1 className="font-semibold mb-3">Spread the joy</h1>
          {includedData.map((val) => (
            <h2 className="flex items-center gap-3">
              {val.icon} {val.name}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComp;
