import React, { useEffect, useMemo, useState } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAdByIdAdmin, updateAdAdmin } from "../services/apis/adApis";

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    title: "",
    description: "",
    dailySpend: "",
    mediaType: "single",
    tags: [],
    tag: "",
    startDate: null,
    endDate: null,
  });

  const [carouselFiles, setCarouselFiles] = useState([null, null, null]);
  const [videoFile, setVideoFile] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [existingMedia, setExistingMedia] = useState({ single: null, video: null, carousel: [] });

  const Interest = [
    { id: 1, name: "Music", value: "music" },
    { id: 2, name: "Dancing", value: "dancing" },
    { id: 3, name: "Singing", value: "singing" },
    { id: 4, name: "Painting", value: "painting" },
    { id: 5, name: "Drawing", value: "drawing" },
    { id: 6, name: "Photography", value: "photography" },
    { id: 7, name: "Sports", value: "sports" },
    { id: 8, name: "Cooking", value: "cooking" },
    { id: 10, name: "Reading", value: "reading" },
    { id: 11, name: "Writing", value: "writing" },
    { id: 12, name: "Technology", value: "technology" },
    { id: 13, name: "Gardening", value: "gardening" },
    { id: 14, name: "Crafting", value: "crafting" },
    { id: 15, name: "Fitness", value: "fitness" },
    { id: 16, name: "Volunteering", value: "volunteering" },
    { id: 17, name: "Other", value: "other" },
  ];

  const toDateOnly = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getAdByIdAdmin(id);
        const ad = res?.ad || res?.data?.ad || res;
        setValues({
          title: ad?.title || "",
          description: ad?.description || "",
          dailySpend: String(ad?.dailySpend ?? ""),
          mediaType: ad?.mediaType || "single",
          tags: Array.isArray(ad?.tags) ? ad.tags : [],
          tag: "",
          startDate: toDateOnly(ad?.startDate),
          endDate: toDateOnly(ad?.endDate),
        });
        setExistingMedia({
          single: ad?.singleImageUrl || null,
          video: ad?.videoUrl || null,
          carousel: Array.isArray(ad?.carouselImages) ? ad.carouselImages.slice(0, 3) : [],
        });
      } catch (e) {
        setError("Failed to load ad");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const weeklySpend = useMemo(() => {
    const n = Number(values.dailySpend);
    return Number.isFinite(n) && n > 0 ? n * 7 : 0;
  }, [values.dailySpend]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("dailySpend", values.dailySpend);
      formData.append("mediaType", values.mediaType);
      (values.tags || []).forEach((t) => formData.append("tags[]", t));
      if (values.startDate) {
        formData.append("startDate", dayjs(values.startDate).format("DD-MM-YYYY"));
      }
      if (values.endDate) {
        formData.append("endDate", dayjs(values.endDate).format("DD-MM-YYYY"));
      }

      if (values.mediaType === "carousel") {
        (carouselFiles || []).slice(0, 3).forEach((f) => f && formData.append("carousel", f));
      } else if (values.mediaType === "video") {
        if (videoFile) formData.append("video", videoFile);
      } else if (values.mediaType === "single") {
        if (singleFile) formData.append("single", singleFile);
      }

      const res = await updateAdAdmin(id, formData);
      // naive success check
      if (res?.success !== false) {
        navigate(-1);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    const t = (values.tag || "").trim();
    if (!t) return;
    if (!values.tags.includes(t)) {
      setValues((v) => ({ ...v, tags: [...v.tags, t], tag: "" }));
    } else {
      setValues((v) => ({ ...v, tag: "" }));
    }
  };

  const removeTag = (t) => {
    setValues((v) => ({ ...v, tags: v.tags.filter((x) => x !== t) }));
  };

  const UploadBox = ({ accept, file, placeholder = "Click to upload", onChange, existingUrl }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isVideo, setIsVideo] = useState(false);
    useEffect(() => {
      let revokeUrl = null;
      if (file) {
        const isVid = (file.type && file.type.startsWith("video")) || (accept || "").includes("video");
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setIsVideo(isVid);
        revokeUrl = url;
      } else if (existingUrl) {
        setPreviewUrl(existingUrl);
        setIsVideo((accept || "").includes("video"));
      } else {
        setPreviewUrl(null);
        setIsVideo(false);
      }
      return () => {
        if (revokeUrl) URL.revokeObjectURL(revokeUrl);
      };
    }, [file, accept, existingUrl]);
    return (
      <label className="w-40 h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 overflow-hidden">
        {previewUrl ? (
          isVideo ? (
            <video src={previewUrl} controls className="w-full h-full object-cover rounded" />
          ) : (
            <img src={previewUrl} alt="preview" className="w-full h-full object-cover rounded" />
          )
        ) : (
          <>
            <div className="text-sm">Ad</div>
            <div className="text-xs">{placeholder}</div>
          </>
        )}
        <input type="file" accept={accept} className="hidden" onChange={(e) => onChange?.(e.currentTarget.files?.[0] || null)} />
      </label>
    );
  };

  return (
    <CommonLayout title={"Edit Ad"}>
      <div className="max-w-5xl mx-auto bg-white p-6 mt-4 rounded-md border border-gray-200 shadow-sm">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {error && <div className="text-red-600">{error}</div>}
            {/* Media type segmented */}
            <div className="border border-gray-100 bg-gray-50 rounded-md p-3">
              <div className="text-sm font-semibold text-gray-700 mb-2">Media Type</div>
              <div className="inline-flex bg-white rounded-md p-1 gap-1">
                {[
                  { key: "single", label: "Single Image" },
                  { key: "carousel", label: "Carousel (max 3)" },
                  { key: "video", label: "Video" },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setValues((v) => ({ ...v, mediaType: t.key }))}
                    className={`px-3 py-1.5 rounded text-sm ${values.mediaType === t.key ? "bg-primary text-white shadow-sm" : "text-gray-700"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload */}
            <div className="border border-gray-100 rounded-md p-3">
              <div className="text-sm font-semibold text-gray-700 mb-2">Upload {values.mediaType === 'video' ? 'Video' : 'Image'}</div>
              {values.mediaType === "carousel" ? (
                <div className="flex gap-3">
                  <UploadBox accept="image/*" existingUrl={existingMedia.carousel?.[0]} file={carouselFiles?.[0]} onChange={(f) => setCarouselFiles((prev) => { const next = [...(prev || [null,null,null])]; next[0] = f; return next; })} />
                  <UploadBox accept="image/*" existingUrl={existingMedia.carousel?.[1]} file={carouselFiles?.[1]} onChange={(f) => setCarouselFiles((prev) => { const next = [...(prev || [null,null,null])]; next[1] = f; return next; })} />
                  <UploadBox accept="image/*" existingUrl={existingMedia.carousel?.[2]} file={carouselFiles?.[2]} onChange={(f) => setCarouselFiles((prev) => { const next = [...(prev || [null,null,null])]; next[2] = f; return next; })} />
                </div>
              ) : values.mediaType === "video" ? (
                <UploadBox accept="video/*,.mp4,.mov,.webm,.mkv,.avi" existingUrl={existingMedia.video} file={videoFile} onChange={setVideoFile} />
              ) : (
                <UploadBox accept="image/*" existingUrl={existingMedia.single} file={singleFile} onChange={setSingleFile} />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={values.title}
                  onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Spend</label>
                <input
                  type="number"
                  min={400}
                  value={values.dailySpend}
                  onChange={(e) => setValues((v) => ({ ...v, dailySpend: e.target.value }))}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. 400"
                  required
                />
                <div className="text-xs text-blue-600 mt-1">Weekly spend {weeklySpend}</div>
              </div>
            </div>

              <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={values.description}
                  onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
                  className="block w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  placeholder="Describe your ad"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tag</label>
                  <div className="flex gap-2 mt-1">
                    <div className="relative flex-1">
                      <select
                        value={values.tag}
                        onChange={(e) => setValues((v) => ({ ...v, tag: e.target.value }))}
                        className="block w-full border-[1px] border-[#abaaaa] text-black bg-white rounded-[4px] px-[16px] py-[10px] appearance-none focus:outline-none"
                      >
                        <option value="">Select Tag</option>
                        {Interest.map((i) => (
                          <option key={i.value} value={i.value}>{i.name}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
                    </div>
                    <button type="button" onClick={addTag} className="px-3 py-2 bg-primary text-white rounded">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(values.tags || []).map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-1">{t}
                        <button type="button" onClick={() => removeTag(t)} className="text-gray-500 hover:text-gray-800">×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <DatePicker
                      selected={values.startDate}
                      onChange={(date) => setValues((v) => ({ ...v, startDate: date }))}
                      className="block !w-full border-[1px] border-[#abaaaa] text-black bg-white rounded-[4px] px-[16px] py-[10px] appearance-none mt-[5px] focus:outline-none"
                      placeholderText="Select Date"
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => setValues((v) => ({ ...v, endDate: date }))}
                      className="block !w-full border-[1px] border-[#abaaaa] text-black bg-white rounded-[4px] px-[16px] py-[10px] appearance-none mt-[5px] focus:outline-none"
                      placeholderText="Select Date"
                      dateFormat="dd-MM-yyyy"
                      minDate={values.startDate || new Date()}
                    />
                  </div>
                </div>              
              </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  </CommonLayout>
  );
};

export default EditAd;
