import { httpBasic, localDev, vercelOidc } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

export default eveChannel({
  auth: [
    vercelOidc(),
    httpBasic({
      username: process.env.ANUIME_EVE_DIRECTOR_USERNAME ?? "anuime-proxy",
      password: process.env.ANUIME_EVE_DIRECTOR_PASSWORD ?? "local-director-password",
    }),
    localDev(),
  ],
});
