import {useParams} from "react-router-dom";

export function useChatEffect() {
  const params = useParams();

  return {
    conversationId: params.conversation_id
  }
}
