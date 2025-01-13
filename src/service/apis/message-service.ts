import request from "../base.service";

const PATH: string = "/message/";

export const createConversation = async (data: {
  id: string;
  type: "GROUP" | "DIRECT";
}) => await request.post(`${PATH}conversation/create`, data);

export const getConversation = async () =>
  await request.get(`${PATH}conversation/`);

export const getConversationMessages = async (conversation_id: string) =>
  await request.get(`${PATH}conversation/${conversation_id}`);

export const sendMessage = async ({
  message,
  convId,
}: {
  message: string;
  convId: string;
}) => await request.post(`${PATH}conversation/message/${convId}`, { message });
