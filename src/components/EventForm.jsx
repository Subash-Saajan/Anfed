import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";

export default function EventForm({ onDone }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!title || !date || !description || !place) return setErr("Please fill all fields including place");
    setLoading(true);
    try {
      let imageUrl = "";
      let storagePath = "";
      if (file) {
        storagePath = `events/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        const metadata = { customMetadata: { owner: auth.currentUser?.uid || "" } };
        await uploadBytes(storageRef, file, metadata); // attach owner
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "events"), {
        title,
        date: new Date(date),
        description,
        location: place,
        imageUrl,      // store the download URL
        storagePath,   // store path to allow deletion
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || null,
      });

      // reset
      setTitle("");
      setDate("");
      setPlace("");
      setDescription("");
      setFile(null);
      if (onDone) onDone();
    } catch (error) {
      setErr(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl bg-white p-4 rounded shadow space-y-3">
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
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button
        type="submit"
        className="bg-[#448800] text-white px-4 py-2 rounded font-medium"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Create Event"}
      </button>
    </form>
  );
}