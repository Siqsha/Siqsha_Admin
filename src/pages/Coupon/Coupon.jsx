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
      <div className="bg-white">
        {" "}
        <div className="mt-8 flow-root">
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
                          error={
                            touched.expirationDate && errors.expirationDate
                          }
                          isRequired
                        />
                        <SelectList
                          label={"Single use/Multiple use"}
                          options={UsePurpose}
                          name="use"
                          className="whitespace-nowrap"
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
              <div className="bg-white p-6 rounded-lg overflow-auto my-scroll">
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
                          <td className="font-medium text-gray-900 capitalize whitespace-nowrap">
                            {coupon.code}
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            {dayjs(coupon.expirationDate).format("DD MMM YYYY")}
                          </td>
                          <td className="font-medium text-gray-900 capitalize whitespace-nowrap">
                            {coupon.usageType}
                          </td>
                          <td className="font-medium text-gray-900 capitalize whitespace-nowrap">
                            {coupon.applicableTo}
                          </td>
                          <td className="font-medium text-gray-900 capitalize whitespace-nowrap">
                            {coupon.discountFee}%
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            <button
                              className={`px-3 py-1 rounded text-white ${
                                coupon.status === "active"
                                  ? "bg-green-600"
                                  : "bg-red"
                              }`}
                              onClick={() => handleToggleStatus(index)}
                            >
                              {coupon.status === "active"
                                ? "Active"
                                : "Inactive"}
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
        </div>
      </div>
    </CommonLayout>
  );
};

export default Coupon;
