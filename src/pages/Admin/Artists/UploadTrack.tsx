import { useState } from "react";
import { Music2Icon, UploadCloud, FileMusic } from "lucide-react";

export default function UploadTrack() {
  const [trackData, setTrackData] = useState({
    title: "",
    artist: "", // You might want to pre-populate this or have a dropdown
    audioFile: null,
    audioFileName: null,
    genre: "", // Optional
    releaseDate: "", // Optional
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // "success", "error", null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrackData({ ...trackData, [name]: value });
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTrackData({
        ...trackData,
        audioFile: file,
        audioFileName: file.name,
      });
    } else {
      setTrackData({ ...trackData, audioFile: null, audioFileName: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackData.audioFile) {
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate upload progress (replace with actual API call)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate successful upload after a delay
        setTimeout(() => {
          setUploadStatus("success");
          // Optionally reset the form
          setTrackData({
            title: "",
            artist: "",
            audioFile: null,
            audioFileName: null,
            genre: "",
            releaseDate: "",
          });
          setUploadProgress(0);
        }, 1000);
      }
    }, 200);

    // In a real application, you would use the Fetch API or a library like Axios
    // to send the trackData (especially the audioFile) to your backend.
    // Example using FormData for file upload:
    // const formData = new FormData();
    // formData.append('title', trackData.title);
    // formData.append('artist', trackData.artist);
    // formData.append('audioFile', trackData.audioFile);
    // formData.append('genre', trackData.genre);
    // formData.append('releaseDate', trackData.releaseDate);
    //
    // try {
    //   const response = await fetch('/api/upload-track', {
    //     method: 'POST',
    //     body: formData,
    //     // No need for Content-Type header when using FormData
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setUploadStatus("success");
    //     // Handle success
    //   } else {
    //     setUploadStatus("error");
    //     // Handle error
    //   }
    // } catch (error) {
    //   setUploadStatus("error");
    //   console.error("Upload error:", error);
    // }
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-emerald-300 flex items-center mb-4">
          <Music2Icon className="w-7 h-7 mr-3" /> Upload New Track
        </h2>
        <p className="text-gray-500">Share your latest music with your fans!</p>
      </div>

      <div className="bg-indigo-900 rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Track Title */}
          <div>
            <label htmlFor="title" className="block text-emerald-200 text-sm font-bold mb-2">
              Track Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={trackData.title}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="Enter track title"
              required
            />
          </div>

          {/* Artist (Consider a dropdown or pre-filled) */}
          <div>
            <label htmlFor="artist" className="block text-emerald-200 text-sm font-bold mb-2">
              Artist <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={trackData.artist}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="Artist's Name"
              required
            />
            {/* In a real app, you might have a dropdown of artists */}
          </div>

          {/* Audio File Upload */}
          <div>
            <label htmlFor="audioFile" className="block text-emerald-200 text-sm font-bold mb-2">
              Upload Audio File <span className="text-red-500">*</span>
            </label>
            <div className="relative border rounded-md border-dashed border-indigo-700 bg-indigo-800 py-6 px-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <UploadCloud className="w-10 h-10 text-emerald-300 mx-auto" />
                <h3 className="mt-2 text-sm text-gray-400">
                  Drag and drop your MP3 or WAV file here
                </h3>
                <p className="mt-1 text-xs text-gray-500">or</p>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <label
                    htmlFor="audioFile"
                    className="py-2 px-4 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    Browse files
                  </label>
                  <input
                    id="audioFile"
                    name="audioFile"
                    type="file"
                    accept="audio/mpeg, audio/wav"
                    className="sr-only"
                    onChange={handleAudioFileChange}
                    required
                  />
                </div>
                {trackData.audioFileName && (
                  <p className="mt-2 text-green-400 text-sm">Selected: {trackData.audioFileName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Genre (Optional) */}
          <div>
            <label htmlFor="genre" className="block text-emerald-200 text-sm font-bold mb-2">
              Genre (Optional)
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={trackData.genre}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="e.g., Afro-pop, Dancehall"
            />
          </div>

          {/* Release Date (Optional) */}
          <div>
            <label htmlFor="releaseDate" className="block text-emerald-200 text-sm font-bold mb-2">
              Release Date (Optional)
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={trackData.releaseDate}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
            />
          </div>

          {/* Upload Status and Progress */}
          {uploadStatus === "uploading" && (
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-700">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                ></div>
              </div>
              <p className="text-gray-500 text-sm">Uploading {uploadProgress}%</p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="bg-emerald-800 text-emerald-200 border border-emerald-600 rounded-md p-3">
              <FileMusic className="w-6 h-6 inline-block mr-2" /> Track uploaded successfully!
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="bg-red-800 text-red-200 border border-red-600 rounded-md p-3">
              <svg
                className="w-6 h-6 inline-block mr-2 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Error uploading track. Please try again.
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              disabled={uploadStatus === "uploading"}
            >
              <UploadCloud className="w-5 h-5 mr-2" /> Upload Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}