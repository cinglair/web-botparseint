interface GetMessageRequest {
  idUser: number;
  idRestaurant: number;
  limit: number;
  offset: number;
}

interface Message {
  id: number;
  user_id: string;
  message: string;
  created_at: string;
  user: string;
}

type MessageResponse = Message[];

export const getMessages = async ({
  idUser,
  idRestaurant,
  limit,
  offset,
}: GetMessageRequest): Promise<MessageResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/messages?idUser=${idUser}&idRestaurant=${idRestaurant}&limit=${limit}&offset=${offset}`;

  const res = await fetch(url, {
    method: "GET",
  });

  const response: MessageResponse = await res.json();

  return response;
};
