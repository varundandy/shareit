import React, { MouseEventHandler, useContext, useState } from "react";
import { Pin as PinType } from "../types/interface";
import { client, urlFor } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/users";
import UserContext from "../store/UserContext";
import { v4 as uuidv4 } from "uuid";

type PinProps = {
  pin: PinType;
  className: string;
};
let renderCount = 0;
const Pin = (props: PinProps) => {
  renderCount++;
  console.log("Render Count: " + renderCount);
  const {
    pin: { postedBy, image, _id, destination, save },
  } = props;
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user?._id)
    ?.length;

  const onSaveClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    savePin(_id);
  };

  const onDeleteClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    deletePin(_id);
  };

  const savePin = async (_id: string) => {
    if (!alreadySaved) {
      const updatedPin = await client
        .patch(_id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?._id,
            postedBy: {
              _type: "postedBy",
              _ref: user?._id,
            },
          },
        ])
        .commit();
      console.log("Updated Pin: " + updatedPin);
      window.location.reload();
    }
  };

  const deletePin = async (_id: string) => {
    const deletedItem = client.delete(_id);
    window.location.reload();
  };

  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`pin-detail/${_id}`);
        }}
      >
        <img
          src={urlFor(image?.asset?.url).width(250).url()}
          className="rounded-lg w-full"
          alt="User Post"
        />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-7 h-7 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-lg hover:shadow:md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-lg hover:shadow:md outline-none"
                  onClick={onSaveClick}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow:md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.slice(8, 17)}
                </a>
              )}
              {postedBy?._id === user?._id && (
                <button
                  type="button"
                  className="bg-white p-2 w-8 h-8 opacity-75 hover:opacity-100 text-dark font-bold text-base rounded-full hover:shadow:md"
                  onClick={onDeleteClick}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 items-center mt-2"
      >
        <img
          className="w-8 h-8 rounded-full"
          src={postedBy?.image}
          alt="User"
        />
        <p className='font-semibold capitalize'>{user?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
