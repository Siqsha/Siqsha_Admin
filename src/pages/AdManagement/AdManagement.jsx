import { useEffect, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import TeacherTableSkeleton from "../../components/skeleton/TeacherTableSkeleton";
import { getAdRequsetUsers, updateAdrequset } from "../services/apis/userApi";
import { getAllAdsAdmin, updateAdStatusAdmin } from "../services/apis/adApis";
import { useMessageModal } from "../../contexts/MessageModalContext";
import { useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import UserImage from "../../assets/Images/UserImage.png";
import { socket } from "../../utils/socketUtils";

const AdManagement = () => {
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const { showMessageModal } = useMessageModal();
  const { showConfirmationModal } = useConfirmationModal();

  const [showAllAds, setShowAllAds] = useState(false);
  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(false);
  const [adsPage, setAdsPage] = useState(1);
  const ADS_PAGE_SIZE = 10;
  const [preview, setPreview] = useState({ open: false, type: null, url: null, list: [], video: null });
  const [expandedDescId, setExpandedDescId] = useState(null);
  const [rejectModal, setRejectModal] = useState({ open: false, teacher: null, reason: "", saving: false, error: "" });
  const [adRejectModal, setAdRejectModal] = useState({ open: false, ad: null, reason: "", saving: false, error: "" });

  const fetchTeacherList = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAdRequsetUsers(page);
      if (Array.isArray(response.data)) {
        setTeachers(response.data);
        setPagination({
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
        });
      } else {
        console.error("Unexpected API response format:", response);
      }
    } catch (error) {}
    setLoading(false);
  };

  const fetchAllAds = async () => {
    setAdsLoading(true);
    try {
      const res = await getAllAdsAdmin();
      const list = res?.ads || [];
      setAds(Array.isArray(list) ? list : []);
      setAdsPage(1);
    } catch (e) {
      console.error("Failed to fetch ads", e);
    } finally {
      setAdsLoading(false);
    }
  };

  useEffect(() => {
    if (showAllAds) {
      fetchAllAds();
    } else {
      fetchTeacherList(1);
    }
  }, [showAllAds]);

  useEffect(() => {
    const handleAdCreated = () => {
      if (showAllAds) {
        fetchAllAds();
      }
    };
    socket?.on('adCreated', handleAdCreated);
    return () => socket?.off('adCreated', handleAdCreated);
  }, [showAllAds]);

  const handlePageChange = (newPage) => {
    fetchTeacherList(newPage);
  };

  const handleAdlUpdate = async (userId, status) => {
    try {
      const response = await updateAdrequset({ userId, status });

      if (response.success) {
        showMessageModal(response);
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher._id === userId ? { ...teacher, status: status } : teacher
          )
        );
      } else {
        showMessageModal(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const openRejectModal = (teacher) => {
    setRejectModal({ open: true, teacher, reason: "", saving: false, error: "" });
  };

  const submitReject = async () => {
    const { teacher, reason } = rejectModal;
    const trimmed = String(reason || "").trim();
    if (!trimmed) {
      setRejectModal((m) => ({ ...m, error: "Reason is required" }));
      return;
    }
    try {
      setRejectModal((m) => ({ ...m, saving: true, error: "" }));
      const res = await updateAdrequset({ userId: teacher._id, status: 'reject', reason: trimmed });
      if (res?.success) {
        showMessageModal(res);
        setTeachers((prev) => prev.map((t) => t._id === teacher._id ? { ...t, status: 'reject' } : t));
        setRejectModal({ open: false, teacher: null, reason: "", saving: false, error: "" });
      } else {
        setRejectModal((m) => ({ ...m, error: res?.message || 'Failed to reject' }));
      }
    } catch (e) {
      console.error(e);
      setRejectModal((m) => ({ ...m, error: 'Failed to reject' }));
    } finally {
      setRejectModal((m) => ({ ...m, saving: false }));
    }
  };

  const handleAdStatus = async (adId, status) => {
    if (status === 'rejected') {
      const ad = ads.find((a) => a._id === adId);
      setPreview({ open: false, type: null, url: null, list: [], video: null });
      setAdRejectModal({ open: true, ad, reason: "", saving: false, error: "" });
      return;
    }
    try {
      const res = await updateAdStatusAdmin(adId, status);
      if (res?.success) {
        showMessageModal(res);
        setAds((prev) => prev.map((a) => (a._id === adId ? { ...a, status, rejectReason: '' } : a)));
      }
    } catch (e) {
      console.error(e);
      showMessageModal({ success: false, message: "Failed to update ad status" });
    }
  };

  const submitAdReject = async () => {
    const { ad, reason } = adRejectModal;
    const trimmed = String(reason || '').trim();
    if (!trimmed) {
      setAdRejectModal((m) => ({ ...m, error: 'Reason is required' }));
      return;
    }
    try {
      setAdRejectModal((m) => ({ ...m, saving: true, error: '' }));
      const res = await updateAdStatusAdmin(ad._id, 'rejected', trimmed);
      if (res?.success) {
        showMessageModal(res);
        setAds((prev) => prev.map((a) => (a._id === ad._id ? { ...a, status: 'rejected', rejectReason: trimmed } : a)));
        setAdRejectModal({ open: false, ad: null, reason: '', saving: false, error: '' });
      } else {
        setAdRejectModal((m) => ({ ...m, error: res?.message || 'Failed to reject ad' }));
      }
    } catch (e) {
      console.error(e);
      setAdRejectModal((m) => ({ ...m, error: 'Failed to reject ad' }));
    } finally {
      setAdRejectModal((m) => ({ ...m, saving: false }));
    }
  };

  return (
    <div>
      <CommonLayout title={"Ad Management"}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end mb-4">
            <button
              type="button"
              onClick={() => setShowAllAds((s) => !s)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              {showAllAds ? "View Requests" : "View All Ads"}
            </button>
          </div>
          {showAllAds && (
            <div className="bg-white p-4 rounded-md">
              {adsLoading ? (
                <TeacherTableSkeleton />
              ) : ads.length === 0 ? (
                <div className="text-gray-600">No ads found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Media</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Title</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Teacher</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Email</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap w-72">Description</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Type</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Created</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ads
                        .slice((adsPage - 1) * ADS_PAGE_SIZE, adsPage * ADS_PAGE_SIZE)
                        .map((ad) => {
                        const thumb = ad.mediaType === 'single' ? ad.singleImageUrl : ad.mediaType === 'carousel' ? (ad.carouselImages?.[0] || null) : null;
                        const isVideo = ad.mediaType === 'video';
                        const status = (ad.status || 'pending').toLowerCase();
                        const statusClass =
                          status === 'approved'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : status === 'rejected'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200';
                        const creator = ad.createdBy || {};
                        const name = [creator?.firstName, creator?.lastName].filter(Boolean).join(' ') || '-';
                        const email = creator?.email || '-';
                        const avatar = creator?.profileImageUrl || UserImage;
                        return (
                          <tr key={ad._id}>
                            <td className="py-3 px-4">
                              <button
                                className="flex items-center"
                                onClick={() => setPreview({ open: true, type: ad.mediaType, url: thumb, list: ad.carouselImages || [], video: ad.videoUrl })}
                              >
                                {isVideo ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium bg-blue-50 text-blue-700 border-blue-200">Video</span>
                                ) : thumb ? (
                                  <img src={thumb} alt="thumb" className="h-10 w-10 object-cover rounded" />
                                ) : (
                                  <span className="text-gray-500 text-sm">No media</span>
                                )}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">{ad.title}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img src={avatar} onError={(e) => (e.currentTarget.src = UserImage)} alt="avatar" className="h-8 w-8 rounded-full object-cover mr-2" />
                                <span className="text-sm text-gray-900">{name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">{email}</td>
                            <td className="py-3 px-4 text-sm text-gray-700 align-top">
                              <div className="w-64">
                                {(() => {
                                  const desc = ad.description || '-';
                                  const isLong = typeof desc === 'string' && desc.length > 30;
                                  const expanded = expandedDescId === ad._id;
                                  if (!expanded) {
                                    return (
                                      <div className="flex flex-col gap-1">
                                        <div className="truncate break-words text-gray-700">{desc}</div>
                                        {isLong && (
                                          <button
                                            type="button"
                                            onClick={() => setExpandedDescId(ad._id)}
                                            className="self-start text-xs text-blue-600 hover:underline"
                                          >
                                            See more
                                          </button>
                                        )}
                                      </div>
                                    );
                                  }
                                  return (
                                    <div className="flex flex-col gap-1">
                                      <div className="max-h-32 overflow-auto whitespace-pre-wrap break-words bg-gray-50 border border-gray-200 rounded p-2 text-gray-700">
                                        {desc}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => setExpandedDescId(null)}
                                        className="self-start text-xs text-blue-600 hover:underline"
                                      >
                                        See less
                                      </button>
                                    </div>
                                  );
                                })()}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">{ad.tags?.join(', ') || '-'}</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${statusClass}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{new Date(ad.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-sm">
                              <div className="flex gap-2">
                                <button
                                  className="px-3 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                                  onClick={() => window.location.assign(`/admin/edit-ad/${ad._id}`)}
                                >
                                  View
                                </button>
                                <button
                                  className="px-3 py-1.5 text-white bg-green-600 hover:bg-green-700 rounded-md text-sm"
                                  onClick={() => handleAdStatus(ad._id, 'approved')}
                                  disabled={status === 'approved'}
                                >
                                  Approve
                                </button>
                                <button
                                  className="px-3 py-1.5 text-white bg-red hover:bg-red-700 rounded-md text-sm"
                                  onClick={() => handleAdStatus(ad._id, 'rejected')}
                                  disabled={status === 'rejected'}
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-end gap-6 mt-6 pb-3">
                    <button
                      disabled={adsPage === 1}
                      onClick={() => setAdsPage((p) => Math.max(1, p - 1))}
                      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                        adsPage === 1 && 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium">
                      Page {adsPage} of {Math.max(1, Math.ceil(ads.length / ADS_PAGE_SIZE))}
                    </span>
                    <button
                      disabled={adsPage >= Math.ceil(ads.length / ADS_PAGE_SIZE)}
                      onClick={() => setAdsPage((p) => Math.min(Math.ceil(ads.length / ADS_PAGE_SIZE), p + 1))}
                      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                        adsPage >= Math.ceil(ads.length / ADS_PAGE_SIZE) && 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {!showAllAds && loading && <TeacherTableSkeleton />}
          {!showAllAds && !loading && (
            <div className="bg-white">
              <div className="mt-8 flow-root">
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th className="py-5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap">
                            Name
                          </th>
                          <th className="py-5 pl-4 pr-3  text-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                            Email
                          </th>
                          <th className="py-5 pl-4 pr-3  text-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 text-center">
                        {teachers?.map((teacher) => (
                          <tr key={teacher.email}>
                            <td className="whitespace-nowrap  py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center justify-center">
                                <div className="size-11 shrink-0">
                                  <img
                                    alt="profile"
                                    src={teacher.profileImageUrl || UserImage}
                                    className="size-11 rounded-full"
                                    onError={(e) => (e.target.src = UserImage)}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900 capitalize">
                                    {teacher.firstName + " " + teacher.lastName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <div className="text-gray-900">
                                {teacher.email}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 capitalize">
                              {teacher.status === "approve" ? (
                                <span className="px-3 py-1.5 text-white bg-green-500 rounded-md text-sm">
                                  Approved
                                </span>
                              ) : teacher.status === "reject" ? (
                                <span className="px-3 py-1.5 text-white bg-red rounded-md text-sm">
                                  Rejected
                                </span>
                              ) : (
                                <>
                                  <button
                                    className="px-3 py-1.5 text-white bg-green-600 hover:bg-green-700 rounded-md text-sm mx-1"
                                    disabled={updatingStatus[teacher._id]}
                                    onClick={() =>
                                      showConfirmationModal(
                                        `Are you sure you want to approve the Ad for ${teacher.firstName} ${teacher.lastName}?`,
                                        () =>
                                          handleAdlUpdate(
                                            teacher._id,
                                            "approve"
                                          )
                                      )
                                    }
                                  >
                                    Approve
                                  </button>

                                  <button
                                    className="px-3 py-1.5 text-white bg-red hover:bg-red-700 rounded-md text-sm mx-1"
                                    disabled={updatingStatus[teacher._id]}
                                    onClick={() => openRejectModal(teacher)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                        {teachers?.length === 0 && (
                          <tr>
                            <td
                              colSpan="3"
                              className="py-5 text-center text-gray-500 text-lg"
                            >
                              No pending Ad requested Teachers Found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-end gap-6 mt-6 pb-3">
                    <button
                      disabled={pagination.currentPage === 1}
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                        pagination.currentPage === 1 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      disabled={
                        pagination.currentPage === pagination.totalPages
                      }
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded ${
                        pagination.currentPage === pagination.totalPages &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

{/* Preview Modal */}
{preview.open && (
  <div
    className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4"
    onClick={() => setPreview({ open: false, type: null, url: null, list: [], video: null })}
  >
    <div
      className="bg-white rounded shadow-lg max-w-3xl w-full p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Media Preview</h3>
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setPreview({ open: false, type: null, url: null, list: [], video: null })}
        >
          ✕
        </button>
      </div>
      {preview.type === 'video' ? (
        <video src={preview.video} className="w-full max-h-[70vh]" controls />
      ) : preview.type === 'carousel' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(preview.list || []).map((img, i) => (
            <img key={i} src={img} alt={`slide-${i}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      ) : preview.url ? (
        <img src={preview.url} alt="preview" className="w-full max-h-[70vh] object-contain" />
      ) : (
        <div className="text-gray-600">No media to display</div>
      )}
    </div>
  </div>
)}

{rejectModal.open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4" onClick={() => setRejectModal({ open: false, teacher: null, reason: "", saving: false, error: "" })}>
    <div className="bg-white rounded shadow-lg w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Reject Ad Request</h3>
        <button className="text-gray-500 hover:text-gray-800" onClick={() => setRejectModal({ open: false, teacher: null, reason: "", saving: false, error: "" })}>✕</button>
      </div>
      <p className="text-sm text-gray-600 mb-2">Please provide a reason for rejection. This will be shown to the teacher.</p>
      <textarea
        value={rejectModal.reason}
        onChange={(e) => setRejectModal((m) => ({ ...m, reason: e.target.value }))}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
        rows={4}
        placeholder="Enter reason"
      />
      {rejectModal.error && <div className="text-red-600 text-sm mt-1">{rejectModal.error}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => setRejectModal({ open: false, teacher: null, reason: "", saving: false, error: "" })}>Cancel</button>
        <button disabled={rejectModal.saving} className="px-4 py-2 rounded bg-red text-white disabled:opacity-50" onClick={submitReject}>{rejectModal.saving ? 'Submitting...' : 'Reject'}</button>
      </div>
    </div>
  </div>
)}

{adRejectModal.open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4" onClick={() => setAdRejectModal({ open: false, ad: null, reason: '', saving: false, error: '' })}>
    <div className="bg-white rounded shadow-lg w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Reject Ad</h3>
        <button className="text-gray-500 hover:text-gray-800" onClick={() => setAdRejectModal({ open: false, ad: null, reason: '', saving: false, error: '' })}>✕</button>
      </div>
      <p className="text-sm text-gray-600 mb-2">Please provide a reason for rejecting this ad. The teacher will see this reason.</p>
      <textarea
        value={adRejectModal.reason}
        onChange={(e) => setAdRejectModal((m) => ({ ...m, reason: e.target.value }))}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
        rows={4}
        placeholder="Enter reason"
      />
      {adRejectModal.error && <div className="text-red-600 text-sm mt-1">{adRejectModal.error}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => setAdRejectModal({ open: false, ad: null, reason: '', saving: false, error: '' })}>Cancel</button>
        <button disabled={adRejectModal.saving} className="px-4 py-2 rounded bg-red text-white disabled:opacity-50" onClick={submitAdReject}>{adRejectModal.saving ? 'Submitting...' : 'Reject'}</button>
      </div>
    </div>
  </div>
)}

        </div>
      </CommonLayout>
    </div>
  );
};

export default AdManagement;
