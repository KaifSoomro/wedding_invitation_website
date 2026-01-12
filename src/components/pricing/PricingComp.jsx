import React from "react";
import { Link, Navigate } from "react-router-dom";
import EnvelopeImage from "../../assets/images/envelope.png";
import { templates } from "@/TemplateData";
import { useSelector } from "react-redux";
import SecureCanvasImage from "../SecureCanvaImage";
import { Button } from "../ui/button";
import { LuImageDown } from "react-icons/lu";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import { Badge } from "../ui/badge";
import { RouteTemplate } from "@/helpers/RouteNames";

const PricingComp = () => {
  const templateId = useSelector((state) => state.stage.templateId);
  const stageImage = useSelector((state) => state.stage.currentStage);
  const stageWidth = useSelector((state) => state.stage.templateWidth);
  const stageHeight = useSelector((state) => state.stage.templateHeight);
  const templateData = templates.filter(
    (val) => val.id == templateId && templateId
  );
  const data = templateData[0];

  // Redirect to templates page if no template is selected
  if (!data) {
    return <Navigate to={RouteTemplate} replace />;
  }

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
    <div className="w-full min-h-screen mt-20 py-16 px-4 bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Preview Section */}
        <div className="w-full lg:w-[65%] flex items-center justify-center">
          <div
            className={`w-full max-w-3xl rounded-2xl ${data.backgroundColor} shadow-2xl flex items-center justify-center p-8 hover:shadow-purple-200 transition-shadow`}
            style={{ minHeight: '600px' }}
          >
            <img src={EnvelopeImage} className="rotate-90 w-full max-w-[500px] h-auto opacity-90" alt="Envelope" />
            <SecureCanvasImage src={stageImage} />
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <h2 className="capitalize text-lg text-gray-600 mb-4">{data.categorie} Invitation</h2>
            
            <div className="flex items-center justify-between mb-6 p-4 bg-violet-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                <p className="font-semibold text-gray-900">
                  {stageWidth} x {stageHeight}px
                </p>
              </div>
              <Badge className="capitalize text-md px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
                {data.term}
              </Badge>
            </div>

            <Button className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all mb-6">
              Make it Yours - Start Editing
            </Button>

            <div className="border-2 border-violet-100 p-6 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">✨ What's Included</h3>
              <div className="space-y-3">
                {includedData.map((val, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="text-violet-600 text-xl">{val.icon}</div>
                    <span>{val.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span><strong>100% Free</strong> - No credit card required</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComp;
