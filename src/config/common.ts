import {httpClient} from "./http.client";
import {getApiGateWay} from "./env";

function Common() {
  return {
    initialize: async () => {
      httpClient.initialize(getApiGateWay());
    }
  }
}

export default Common();
