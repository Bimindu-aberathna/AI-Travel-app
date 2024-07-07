export default async function detectLandmarks(url) {
  try {
    const apiKey = 'Google cloud API key'; // Replace 'YOUR_API_KEY' with your actual Google Cloud API key
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
      requests: [
        {
          features: [
            {
              maxResults: 10,
              type: "LANDMARK_DETECTION"
            }
          ],
          image: {
            source: {
              imageUri: url
            }
          }
        }
      ]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to detect landmarks');
    }

    const data = await response.json();
    console.log("Response Data", data.responses[0].landmarkAnnotations.map(annotation => annotation.description));
    return data.responses[0].landmarkAnnotations.map(annotation => annotation.description);
  } catch (error) {
    console.error('Error detecting landmarks:', error);
    throw error;
  }
}

// Usage
detectLandmarks()
  .then((responseData) => {
    // Handle response data here
  })
  .catch((error) => {
    // Handle error here
  });
