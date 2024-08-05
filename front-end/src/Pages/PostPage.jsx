import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BACKEND_BASE_URL } from "../constants/index";

const PostPage = () => {
  // ? states for the applications
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  // ? function to perform api call 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/generate-og-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate OG image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setOgImageUrl(url);
    } catch (error) {
      console.error('Error generating OG image:', error);
      setError('Failed to generate OG image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ? function to downlod the gnerated  image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = ogImageUrl;
    link.download = "og-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* ? Dynamic title based on user input */}
      <Helmet>
        <title>{title || "Create a New Post"}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 200)} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      </Helmet>

      {/* ? User view */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 bg-indigo-600">
          <h1 className="text-3xl font-extrabold text-white">Create a New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div>
            <label htmlFor="title" className="label block text-sm font-bold text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="input bg-gray-200 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="label block text-sm font-bold text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="textarea bg-gray-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
              rows="5"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-bold label text-gray-700">
              Image (optional)
            </label>
            <div className="bg-gray-200 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : null}
            {isLoading ? "Generating..." : "Create Post and Generate OG Image"}
          </button>
        </form>

        {error && <div className="px-8 py-4 bg-red-100 text-red-700 rounded-b-xl">{error}</div>}
      </div>

      {/* ? Preview */}
      {(title || content || image) && (
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 bg-indigo-600">
            <h2 className="text-2xl font-bold text-white">Preview</h2>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="mt-4 text-gray-600">{content}</p>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-6 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      )}

      {/* ? Generated OG Image */}
      {ogImageUrl && (
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 bg-indigo-600">
            <h2 className="text-2xl font-bold text-white">Generated OG Image</h2>
          </div>
          <div className="p-8">
            <img src={ogImageUrl} alt="Generated OG" className="mt-6 max-w-full h-auto rounded-lg shadow-md" />
            <button
              onClick={handleDownload}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
