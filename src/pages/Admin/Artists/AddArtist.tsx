import { useState } from "react";
import { UserPlus, Music, Calendar, Tag, ImagePlus } from "lucide-react";

export default function AddArtist() {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    registrationDate: "",
    recordLabel: "",
    image: null,
    imageUrl: null, // For image preview
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file), // Create a local URL for preview
      });
    } else {
      setFormData({ ...formData, image: null, imageUrl: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this formData (including the image file)
    // to your backend API (likely using FormData to handle file uploads)
    console.log("Form Data Submitted:", formData);
    // Optionally, reset the form after submission
    setFormData({
      name: "",
      genre: "",
      registrationDate: "",
      recordLabel: "",
      image: null,
      imageUrl: null,
    });
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-indigo-300 flex items-center mb-4">
          <UserPlus className="w-7 h-7 mr-3" /> Register New Artist
        </h2>
        <p className="text-gray-500">Fill out the form below to add a new artist to the platform.</p>
      </div>

      <div className="bg-indigo-900 rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Artist Name */}
          <div>
            <label htmlFor="name" className="block text-indigo-200 text-sm font-bold mb-2">
              Artist Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="Enter artist's full name"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-indigo-200 text-sm font-bold mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="e.g., Hiplife, Afrobeat, Gospel"
            />
          </div>

          {/* Registration Date */}
          <div>
            <label htmlFor="registrationDate" className="block text-indigo-200 text-sm font-bold mb-2">
              Registration Date
            </label>
            <input
              type="date"
              id="registrationDate"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
            />
          </div>

          {/* Record Label */}
          <div>
            <label htmlFor="recordLabel" className="block text-indigo-200 text-sm font-bold mb-2">
              Record Label (Optional)
            </label>
            <input
              type="text"
              id="recordLabel"
              name="recordLabel"
              value={formData.recordLabel}
              onChange={handleChange}
              className="shadow-inner appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-indigo-800"
              placeholder="Enter record label if applicable"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-indigo-200 text-sm font-bold mb-2">
              Artist Image (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-indigo-700 flex items-center justify-center">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Artist Preview" className="object-cover w-full h-full" />
                ) : (
                  <ImagePlus className="w-10 h-10 text-indigo-300" />
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="inline-flex items-center px-4 py-2 border border-indigo-700 rounded-md shadow-sm text-sm font-medium text-indigo-200 bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  <ImagePlus className="w-5 h-5 mr-2" /> Upload Image
                </label>
                {formData.image && (
                  <p className="text-green-400 text-sm mt-1">Selected: {formData.image.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Add Artist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}