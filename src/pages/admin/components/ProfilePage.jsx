import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PROFILE from "../../../assets/Images/profile.png";
import { getUserProfile } from "../../services/apis/userApi";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(id);
        if (response) {
          setProfile(response.user);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const {
    profileImageUrl,
    firstName,
    lastName,
    role,
    contactNumber,
    source,
    availability,
    startTime,
    endTime,
    duration,
    offeredCouponCode,
    skillMatrix,
  } = profile;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={profileImageUrl || PROFILE}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-xl font-semibold">
              {firstName} {lastName}
            </h1>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white mt-6 rounded-lg shadow-md">
        <div className="flex border-b">
          <button className="text-blue-500 px-6 py-2 font-semibold border-b-2 border-blue-500">
            Profile
          </button>
        </div>
      </div>

      {/* Personal Settings Section */}
      <div className="bg-white mt-6 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">First Name</p>
            <p>{firstName || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Last Name</p>
            <p>{lastName || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Username</p>
            <p>{profile.username || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Contact Number</p>
            <p>{contactNumber || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Source</p>
            <p>{source || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Availability</p>
            <p>{availability || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Start Time</p>
            <p>{startTime || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">End Time</p>
            <p>{endTime || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p>{duration || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Coupon Code Offered</p>
            <p>{offeredCouponCode ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Coupon Code</p>
            <p>{offeredCouponCode || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-6 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Skill Matrix</h2>
        {skillMatrix.length > 0 ? (
          skillMatrix.map((skill) => (
            <div key={skill._id} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium">Category</p>
                <p>{skill.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Subcategory</p>
                <p>{skill.subcategory}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Skill</p>
                <p>{skill.skill}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Skill Level</p>
                <p>{skill.skillLevel}</p>
              </div>
              <hr />
              <hr />
            </div>
          ))
        ) : (
          <p>No skills available.</p>
        )}
      </div>

      <div className="bg-white mt-6 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Fee Structure</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Art Form</p>
            <p>Revanth</p>
          </div>
          <div>
            <p className="text-sm font-medium">Skill Level</p>
            <p>Thiyagarajan</p>
          </div>
          <div>
            <p className="text-sm font-medium">Fee/hr</p>
            <p>Revanth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
