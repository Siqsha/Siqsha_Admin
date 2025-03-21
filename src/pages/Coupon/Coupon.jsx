// import React, { useEffect } from "react";
// import CommonLayout from "../../components/common/CommonLayout";
// import TextInput from "../../components/common/TextInput";

// import { FieldArray, Form, Formik } from "formik";

// import DatePickerInput from "../../components/common/DatePickerInput";
// import SelectList from "../../components/common/SelectList";
// import { UsePurpose, Role } from "../../constant/dataConstant";

// import { BiPlus } from "react-icons/bi";

// import { RiDeleteBinLine } from "react-icons/ri";
// import { addCoupon } from "../services/apis/coupon";
// import { useMessageModal } from "../../contexts/MessageModalContext";

// const Coupon = () => {
//   const initialValues = {
//     coupons: [
//       {
//         code: "",
//         expirationDate: "",
//         use: "",
//         role: "",
//         discount: "",
//         status: true,
//       },
//     ],
//   };

//   const { showMessageModal } = useMessageModal();

//   const handleAddCoupon = async (values, { resetForm }) => {
//     try {
//       const couponList = values.coupons;

//       for (let coupon of couponList) {
//         const payload = {
//           code: coupon.code,
//           expirationDate: coupon.expirationDate,
//           usageType: coupon.use,
//           applicableTo: coupon.role,
//           discountFee: coupon.discount,
//         };
//         const response = await addCoupon(payload);
//           showMessageModal(response)
//           return;
//         }
//       resetForm();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <CommonLayout title={"Coupon Management"}>
//       <div className="px-4 sm:px-6 lg:px-4">
//         <div className="mt-8 flow-root">
//           <div className="bg-white p-[24px]">
//             <div>
//               <div>
//                 <Formik
//                   initialValues={initialValues}
//                   onSubmit={handleAddCoupon}
//                 >
//                   {({
//                     values,
//                     errors,
//                     touched,
//                     isSubmitting,
//                     resetForm,
//                     setValues,
//                   }) => (
//                     <Form>
//                       <FieldArray name="coupons">
//                         {({ push, remove }) => (
//                           <>
//                             {values.coupons.map((coupon, index) => (
//                               <div
//                                 key={index}
//                                 className="border border-gray-200 p-4 mb-6 rounded-lg relative"
//                               >
//                                 <div className="flex justify-end gap-3">
//                                   {values.coupons.length > 1 && (
//                                     <button
//                                       className="font-medium text-red w-[42px] h-[42px] border-2 border-red rounded-md flex justify-center items-center gap-[10px]"
//                                       onClick={() => remove(index)}
//                                     >
//                                       <RiDeleteBinLine className="text-[24px]" />
//                                     </button>
//                                   )}
//                                   <button
//                                     className="font-medium text-primary w-[42px] h-[42px] border-2 border-[#002060] rounded-md flex justify-center items-center gap-[10px]"
//                                     onClick={() =>
//                                       push({
//                                         code: "",
//                                         expirationDate: "",
//                                         use: "",
//                                         role: "",
//                                         discount: "",
//                                       })
//                                     }
//                                   >
//                                     <BiPlus className="text-[24px]" />
//                                   </button>
//                                 </div>
//                                 <div className="grid 2xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-5">
//                                   <div>
//                                     <TextInput
//                                       label="Coupon Name"
//                                       name={`coupons.${index}.code`}
//                                       placeholder="Enter Coupon Code"
//                                       // Pass formik prop if your component needs it
//                                     />
//                                   </div>
//                                   <div>
//                                     <DatePickerInput
//                                       label="Expiration date"
//                                       name={`coupons.${index}.expirationDate`}
//                                     />
//                                   </div>
//                                   <div>
//                                     <SelectList
//                                       label={"Single use/Multiple use"}
//                                       options={UsePurpose}
//                                       name={`coupons.${index}.use`}
//                                       placeholder="Select For Single use/Multiple use"
//                                       isRequired={true}
//                                     />
//                                   </div>
//                                   <div>
//                                     <SelectList
//                                       label={"For Teacher/Student"}
//                                       options={Role}
//                                       name={`coupons.${index}.role`}
//                                       placeholder="Select Role"
//                                       isRequired={true}
//                                     />
//                                   </div>
//                                   <div>
//                                     <TextInput
//                                       label="% discount on platform fee"
//                                       name={`coupons.${index}.discount`}
//                                       placeholder="Enter Discount"
//                                     />
//                                   </div>
//                                   <div className="flex justify-end items-center mb-4">
//                                     <button
//                                       type="button"
//                                       className={`px-4 py-1 rounded ${
//                                         coupon.isActive
//                                           ? "bg-green-600"
//                                           : "bg-gray-400"
//                                       } text-white text-sm`}
//                                       onClick={() =>
//                                         setValues((prev) => {
//                                           const updated = [...prev.coupons];
//                                           updated[index].isActive =
//                                             !updated[index].isActive;
//                                           return { ...prev, coupons: updated };
//                                         })
//                                       }
//                                     >
//                                       {coupon.isActive ? "Active" : "Inactive"}
//                                     </button>
//                                   </div>
//                                 </div>

//                                 <div className="flex justify-end mt-4">
//                                   <button
//                                     type="submit"
//                                     className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                   >
//                                     Submit Coupons
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </>
//                         )}
//                       </FieldArray>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </CommonLayout>
//   );
// };

// export default Coupon;

import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import TextInput from "../../components/common/TextInput";
import { Form, Formik } from "formik";
import DatePickerInput from "../../components/common/DatePickerInput";
import SelectList from "../../components/common/SelectList";
import { UsePurpose, Role } from "../../constant/dataConstant";
import { addCoupon, getCoupons, updateStatus } from "../services/apis/coupon";
import { useMessageModal } from "../../contexts/MessageModalContext";
import { CouponValidationSchema } from "../../utils/validationSchemas";
import TabGroupButton from "../../components/common/TabGroupButton";
import dayjs from "dayjs";
import CouponTableSkeleton from "../../components/skeleton/CouponSkeleton";

const CouponTabs = ["Create Coupon", "Coupon List"];

const Coupon = () => {
  const [activeTab, setActiveTab] = useState(CouponTabs[0]);
  const [couponList, setCouponList] = useState([]);
  const { showMessageModal } = useMessageModal();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    code: "",
    expirationDate: "",
    use: "",
    role: "",
    discount: "",
  };

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await getCoupons();

      const mappedCoupons = res.data.map((coupon) => ({
        ...coupon,
        status: coupon.status,
      }));

      setCouponList(mappedCoupons);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoupon = async (values, { resetForm }) => {
    try {
      const payload = {
        code: values.code,
        expirationDate: values.expirationDate,
        usageType: values.use,
        applicableTo: values.role,
        discountFee: values.discount,
      };
      const response = await addCoupon(payload);
      showMessageModal(response);
      // return;
      resetForm();
      setActiveTab("Coupon List");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (index) => {
    try {
      const selectedCoupon = couponList[index];
      const newStatus =
        selectedCoupon.status === "active" ? "deactive" : "active";

      const formData = {
        couponId: selectedCoupon._id,
        status: newStatus,
      };

      const response = await updateStatus(formData);
      showMessageModal(response);

      // Update the state with the new status
      setCouponList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index].status = newStatus;
        return updatedList;
      });
    } catch (error) {
      console.error("Error updating coupon status:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "Coupon List") {
      fetchCoupons();
    }
  }, [activeTab]);

  return (
    <CommonLayout title={"Coupon Management"}>
      <div className="px-4 sm:px-6 lg:px-4">
        <TabGroupButton
          tabTypes={CouponTabs}
          active={activeTab}
          setActive={setActiveTab}
        />

        {activeTab === "Create Coupon" && (
          <div className="bg-white p-[24px]">
            <Formik
              initialValues={initialValues}
              validationSchema={CouponValidationSchema}
              onSubmit={handleAddCoupon}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form>
                  <div className="grid 2xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-5">
                    <TextInput
                      label="Coupon Name"
                      name="code"
                      placeholder="Enter Coupon Code"
                      error={touched.code && errors.code}
                      isRequired
                    />
                    <DatePickerInput
                      label="Expiration date"
                      name="expirationDate"
                      onChange={(newValue) => {
                        setFieldValue("expirationDate", dayjs(newValue));
                      }}
                      error={touched.expirationDate && errors.expirationDate}
                      isRequired
                    />
                    <SelectList
                      label={"Single use/Multiple use"}
                      options={UsePurpose}
                      name="use"
                      placeholder="Select Use Type"
                      value={values.use}
                      onChange={(e) => {
                        setFieldValue("use", e);
                      }}
                      error={touched.use && errors.use}
                      isRequired
                    />
                    <SelectList
                      label={"For Teacher/Student"}
                      options={Role}
                      name="role"
                      placeholder="Select Role"
                      value={values.role}
                      onChange={(e) => {
                        setFieldValue("role", e);
                      }}
                      error={touched.role && errors.role}
                      isRequired
                    />
                    <TextInput
                      label="% Discount on platform fee"
                      name="discount"
                      placeholder="Enter Discount"
                      error={touched.discount && errors.discount}
                      isRequired
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded "
                    >
                      Submit Coupons
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {activeTab === "Coupon List" && (
          <div className="bg-white p-6 rounded-lg">
            {isLoading ? (
              <CouponTableSkeleton />
            ) : couponList.length === 0 ? (
              <p className="text-center block w-full py-[40px] text-[14px] md:text-[20px] capitalize text-gray-600">
                No coupons available.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      Expiration
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      Usage Type
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      % Discount
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-center">
                  {couponList.map((coupon, index) => (
                    <tr key={index} className="text-center">
                      <td className="font-medium text-gray-900 capitalize">
                        {coupon.code}
                      </td>
                      <td className="py-2 px-3 ">
                        {dayjs(coupon.expirationDate).format("DD MMM YYYY")}
                      </td>
                      <td className="font-medium text-gray-900 capitalize">
                        {coupon.usageType}
                      </td>
                      <td className="font-medium text-gray-900 capitalize">
                        {coupon.applicableTo}
                      </td>
                      <td className="font-medium text-gray-900 capitalize">
                        {coupon.discountFee}%
                      </td>
                      <td className="py-2 px-3 ">
                        <button
                          className={`px-3 py-1 rounded text-white ${
                            coupon.status === "active"
                              ? "bg-green-600"
                              : "bg-red"
                          }`}
                          onClick={() => handleToggleStatus(index)}
                        >
                          {coupon.status === "active" ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default Coupon;
