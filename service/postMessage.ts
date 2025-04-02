export const postMessage = async ({
  message,
  idUser,
}: {
  message: string;
  idUser: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/bot/new?idUser=${idUser}&idRestaurant=1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });

  const response = await res.json();

  return await response.response;
};
