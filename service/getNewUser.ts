interface GetNewUserResponse {
  address: string;
  id: number;
  name: string;
  phone: string;
}

export const getNewUser = async (): Promise<GetNewUserResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/newUser`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar novo usuário: ${res.statusText}`);
  }

  const response: GetNewUserResponse = await res.json();
  return response;
};
