interface GetOrdersListResponse {
  response: string[];
}

export const getOrdersList = async ({
  userId,
}: {
  userId: string;
}): Promise<GetOrdersListResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/latestOrders?idUser=${userId}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar pedidos: ${res.statusText}`);
  }

  const response: GetOrdersListResponse = await res.json();
  return response;
};
