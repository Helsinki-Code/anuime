import { httpBasic, localDev, vercelOidc } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

const username = process.env.ANUIME_EVE_DIRECTOR_USERNAME?.trim();
const password = process.env.ANUIME_EVE_DIRECTOR_PASSWORD?.trim();

export default eveChannel({
  auth: [
    vercelOidc(),
    httpBasic({
      username: username ?? "",
      password: password ?? "",
    }),
    localDev(),
  ],
});
