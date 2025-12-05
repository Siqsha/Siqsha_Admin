import React, { useEffect, useMemo, useState } from "react";
import CommonLayout from "../../../../components/common/CommonLayout";
import { getTerms, updateTerms } from "../../../services/apis/legal";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const LegalTerms = () => {
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState("<p>Start editing Terms & Conditions...</p>");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const t = await getTerms();
        if (mounted && t) {
          setHtml(t.content || "");
          if (t.effectiveDate) {
            const d = new Date(t.effectiveDate);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const dd = String(d.getDate()).padStart(2, "0");
            setEffectiveDate(`${yyyy}-${mm}-${dd}`);
          }
          setUpdatedAt(t.updatedAt || t.createdAt || null);
        }
      } catch (e) {
        console.log("Error fetching terms:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const handleSave = async () => {
    try {
      const payload = { content: html };
      if (effectiveDate) payload.effectiveDate = effectiveDate;
      const saved = await updateTerms(payload);
      setUpdatedAt(saved?.updatedAt || new Date().toISOString());
      toast.success("Terms & Conditions saved successfully!")
    } catch (e) {
      toast.error("Failed to save Terms");
    }
  };

  const lastUpdatedText = useMemo(() => {
    if (!updatedAt) return "—";
    const d = new Date(updatedAt);
    return d.toLocaleString();
  }, [updatedAt]);

  return (
    <CommonLayout title={"Settings → Legal → Terms & Conditions"}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Effective Date</label>
          <input
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <div className="text-sm text-gray-600">Last updated: {lastUpdatedText}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Editor</h3>
            <div className="bg-white border rounded">
              <ReactQuill theme="snow" value={html} onChange={setHtml} modules={modules} />
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="px-3 py-1 bg-primary text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Preview</h3>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={preview} onChange={(e)=>setPreview(e.target.checked)} />
                Show
              </label>
            </div>
            {preview && (
              <div
                className="min-h-[320px] border rounded p-3 bg-gray-50 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default LegalTerms;
