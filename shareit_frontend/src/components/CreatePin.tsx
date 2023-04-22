import React, { useContext, useState } from "react";
import { User } from "../types/interface";
import UserContext from "../store/UserContext";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const CreatePin = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategorys] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-200 ease-in">
          Please fill in all the fields...
        </p>
      )}
      <div className="flex flex-col lg:flex-row justify-center items-center bg-white lg:p-5 w-full lg:w-4/5">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex flex-col justify-center items-center border-dotted border-gray-300 border-2 w-full h-420">
            {loading && <Spinner message='We are getting the data for you' />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label htmlFor="">
                <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    
                  </p>
                </div>
                </div>
              </label>
            ):(<p>Something else</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
