const accessKey = "8j7cdQS9HM1tfIomk_dUwqrIZ7wnymEECz6xk6OPP6k";
const baseURL = "https://api.unsplash.com/";

export const getFeaturedPhotos = async () => {
  try {
    const response = await fetch(`${baseURL}photos/?client_id=${accessKey}`);
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }
    const data = await response.json();
    return data.map(({ id, urls }: { id: string, urls: { regular: string } }) => ({
      id,
      uri: urls.regular
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des photos:", error);
    return [];
  }
};
