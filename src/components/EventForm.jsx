import { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";

export default function EventForm({ onDone }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Refs for hidden file inputs
  const thumbnailInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!title || !date || !place || !shortDesc || !fullDesc) {
      return setErr("Please fill all required fields.");
    }

    setLoading(true);

    try {
      let thumbnailUrl = "";
      let thumbnailPath = "";

      // Upload Thumbnail
      if (thumbnail) {
        thumbnailPath = `events/thumbnails/${Date.now()}_${thumbnail.name}`;
        const thumbRef = ref(storage, thumbnailPath);
        await uploadBytes(thumbRef, thumbnail, {
          customMetadata: { owner: auth.currentUser?.uid || "" },
        });
        thumbnailUrl = await getDownloadURL(thumbRef);
      }

      // Upload Gallery Images
      const galleryUrls = [];
      const galleryPaths = [];

      for (const file of galleryFiles) {
        const path = `events/gallery/${Date.now()}_${file.name}`;
        const galleryRef = ref(storage, path);
        await uploadBytes(galleryRef, file, {
          customMetadata: { owner: auth.currentUser?.uid || "" },
        });
        const url = await getDownloadURL(galleryRef);
        galleryUrls.push(url);
        galleryPaths.push(path);
      }

      await addDoc(collection(db, "events"), {
        title,
        date: new Date(date),
        shortDesc,
        fullDesc,
        youtubeLink,
        location: place,
        thumbnailUrl,
        thumbnailPath,
        galleryUrls,
        galleryPaths,
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || null,
      });

      // Reset form
      setTitle("");
      setDate("");
      setPlace("");
      setShortDesc("");
      setFullDesc("");
      setYoutubeLink("");
      setThumbnail(null);
      setGalleryFiles([]);

      if (onDone) onDone();
    } catch (error) {
      setErr(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={submit}
        className="w-full max-w-xl bg-white p-6 rounded shadow space-y-4"
      >
        {err && <div className="text-red-600">{err}</div>}

        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Place (city, state)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Short Introduction"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Full Description"
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="YouTube Link (optional)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />

        {/* Hidden file inputs */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={thumbnailInputRef}
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          ref={galleryInputRef}
          onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
        />

        {/* Thumbnail Button */}
        <button
          type="button"
          onClick={() => thumbnailInputRef.current?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Thumbnail
        </button>
        {thumbnail && (
          <p className="text-sm text-gray-600">Selected: {thumbnail.name}</p>
        )}

        {/* Gallery Button */}
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
        >
          Upload Gallery Images
        </button>
        {galleryFiles.length > 0 && (
          <p className="text-sm text-gray-600">
            {galleryFiles.length} image(s) selected
          </p>
        )}

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded w-full font-medium mt-4"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
