## **Assignment: Dynamic Post Page with OG Image Generation**

### Overview
This system allows users to create a new post, generate an Open Graph (OG) image based on the post content, and download the generated image. The process involves user input for post title and content, optional image upload, and backend interaction to generate the OG image.

### Components

**1.Frontend React Component (PostPage):**

- Allows users to input post details and upload an optional image.
- Submits the post details and image to the backend.
- Displays the generated OG image and provides a download option.

**2.Backend Service:**

- Receives the post details and image from the frontend.
- Generates an OG image based on the provided data.
- Returns the OG image as a binary stream.

### Frontend Workflow
**1.User Input:**

- Users enter the title and content of the post
- Users can optionally upload an image for the post.

**2.Form Submission:**

- When the user submits the form, a POST request is sent to the backend with the form data.
- The form data includes the post title, content, and optional image.

**3.Image Generation**:

- The backend processes the request and generates an OG image.
- The backend returns the OG image as a binary stream.

**4.Image Handling:**

- The frontend receives the binary image data and creates a temporary URL using `URL.createObjectURL()`.

- The OG image is displayed on the page.
- A download button allows users to download the generated OG image.

## Backend Workflow

**1.Receive Request:**

- The backend receives a POST request with the post details and optional image.

**2.Generate OG Image:**
- Based on the input data, the backend generates an OG image (e.g., a PNG file) using appropriate libraries or tools.

**3. Return Image:**

The backend returns the generated image as a binary stream with the correct content type (e.g., image/png).


### Frontend Implementation Details

**Form Handling:**

- The form data is collected using `FormData` and sent to the backend.
- The response is processed as a binary blob to handle image data.

**Image Download:**

- An object URL is created from the binary data.
The image can be downloaded using a dynamically created anchor (`<a>`) element.

### Error Handling

**Frontend:**

- Displays error messages if the image generation fails or if there are issues with form submission.

### Example Usage
**1.Create a Post:**

- Enter the post title and content.
- Optionally upload an image.

**2.Generate OG Image:**

- Submit the form to generate the OG image.

**3.Download OG Image**
- View the generated OG image and click the download button to save it.